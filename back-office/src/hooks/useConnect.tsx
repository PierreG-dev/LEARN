import { toast } from "react-toastify";
import actions from "../store/actions";
import { Socket, io } from "socket.io-client";
import { useCallback } from "react";
import { APIResponse } from "../types";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import { useState, useEffect } from "react";
import testConnection from "../utilities/testConnection.ts";
import { updatePresence } from "../store/actions/dataActions.ts";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();

  useEffect(() => {
    testConnection().catch(() =>
      dispatch(actions.globalsActions.serverOffline())
    );
  });

  const connectionToken = useSelector((state: RootState) => {
    return state.auth.token;
  });

  const isServerOnline = useSelector(
    (state: RootState) => state.globals.isServerOnline
  );

  const isPending = useSelector((state: RootState) => state.auth.isPending);

  // --- Fonction qui vérifie si un JWT est enregistré dans le localStorage, et se connecte en conséquence
  const tryConnect = useCallback(() => {
    // --- Récupération du JWT
    const storedToken = localStorage.getItem("token");

    // --- Si aucun JWT n'est présent dans le local storage, on arrête tout et on laisse l'utilisateur se connecter
    if (!storedToken) {
      dispatch(actions.authActions.stopPending());
      return;
    }

    // --- Connexion au serveur socket.io
    const newSocket = io("http://localhost:8000", {
      auth: { token: storedToken },
    });

    // --- Si le JWT est invalide ou périmé, il est supprimé pour éviter de futures connexions inutiles
    newSocket.on("connect_error", (error) => {
      if (error.message === "Invalid or expired token") {
        console.info(
          "Erreur d'authentification, le JWT est probablement périmé"
        );
        localStorage.removeItem("token");
      }
      if (error.message === "xhr poll error") {
        console.info("Le serveur est injoignable");
        isServerOnline && dispatch(actions.globalsActions.serverOffline());
        newSocket.off("connect_error");
      }

      isPending && dispatch(actions.authActions.stopPending());
    });

    // --- Reconnexion du socket
    newSocket.on("reconnect_attempt", () => {
      console.info("Tentative de reconnexion...");
    });

    // --- Echec de la reconnexion
    newSocket.on("reconnect_failed", () => {
      console.info("La reconnexion a échouée");
    });

    newSocket.on("connect", () => {
      dispatch(actions.globalsActions.serverOnline());
      toast.success("Connexion établie", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setSocket(newSocket);
      dispatch(actions.authActions.connect({ token: storedToken }));
      dispatch(actions.authActions.stopPending());

      // --- Utilisateurs actifs (mise a jour auto)
      newSocket.off("activeUsers");
      newSocket.on("activeUsers", (data) => {
        dispatch(actions.dataActions.updatePresence({ data }));
      });

      // --- Données de l'application (classe, user, cours...)
      newSocket.off("dataProvider");
      newSocket.on("dataProvider", (data) => {
        dispatch(actions.dataActions.update({ data }));
      });

      newSocket.off("disconnect");
      newSocket.on("disconnect", () => {
        isServerOnline && dispatch(actions.globalsActions.serverOffline());
        toast.error("Connexion perdue", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    });
  }, [dispatch, isPending, isServerOnline]);

  // --- Fonction qui tente de créer un compte avec les paramètres fournis
  /**
   * signupCode: code d'inscription
   * firstName: prénom de l'utilisateur
   * lastName: nom de l'utilisateur
   * login: login de l'utilisateur
   * username: pseudo de l'utilisateur
   * password: mot de passe de l'utilisateur
   */
  const handleSignup = useCallback(
    async (
      signupCode: string,
      firstName: string,
      lastName: string,
      login: string,
      username: string,
      password: string
    ): Promise<APIResponse> => {
      return await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          signupCode,
          firstName,
          lastName,
          login,
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.error(err));
    },
    []
  );

  // --- Fonction qui tente une connection avec les identifiants fournis en paramètre
  /**
   * login: login de l'utilisateur
   * password: mot de passe de l'utilisateur
   */
  const handleLogin = useCallback(
    async (login: string, password: string): Promise<APIResponse> => {
      return await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            localStorage.setItem("token", data.token);
            tryConnect();
          } else if (data.code === 401) {
            toast.error("Identifiants invalides", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          return data;
        })
        .catch((error) => {
          console.error("Erreur lors de la connexion", error);
          return {
            code: 500,
            msg: "Problème de réseau",
          };
        });
    },
    [tryConnect]
  );

  // --- Fonction qui déconnecte l'utilisateur et détruit son JWT
  const handleLogout = useCallback(() => {
    // Supprime le JWT du stockage local
    localStorage.removeItem("token");

    // Exemple d'appel d'API pour se déconnecter en utilisant le JWT
    fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${connectionToken}`, // JWT
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          // --- Fermeture du socket
          if (socket) socket.close();

          // --- (La fermeture du socket déclenche la mise hors ligne du serveur => on remet)
          dispatch(actions.globalsActions.serverOnline());

          // --- Nettoyage du store
          dispatch(actions.authActions.disconnect());

          // --- Suppression du token de connexion des cookies
          localStorage.removeItem("token");

          toast.warn("Déconnexion réussie", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Erreur lors de la déconnexion", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion", error);
      });
  }, [connectionToken, socket, dispatch]);

  // --- Fonction qui vérifie le signupCode (lors de l'inscription)
  const signupCodeCheck = useCallback(async (signupCode: string) => {
    return await fetch(`${import.meta.env.VITE_APP_API_URL}/signupCodeCheck`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signupCode: signupCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.error(err));
  }, []);

  // --- Tentative de connexion avec l'éventuel JWT stocké
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(tryConnect, []);

  return {
    socket,
    tryConnect,
    handleLogin,
    handleSignup,
    handleLogout,
    signupCodeCheck,
  };
};

export default useConnect;
