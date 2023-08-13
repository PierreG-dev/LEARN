import { toast } from "react-toastify";
import actions from "../store/actions";
import { Socket, io } from "socket.io-client";
import { useCallback } from "react";
import {
  APIResponse,
  ConnectionPayload,
  GlobalDataUpdatePayload,
} from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import { useState, useEffect } from "react";

const useConnect = () => {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();

  const connectionToken = useSelector((state: RootState) => {
    return state.connection.token;
  });

  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  // --- Fonction qui vérifie si un JWT est enregistré dans le localStorage, et se connecte en conséquence
  const tryConnect = useCallback(() => {
    console.log("essai de connection");
    if (isConnected) return;
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      dispatch(actions.connectionActions.stopPending());
      return;
    }

    const newSocket = io("http://localhost:8000", {
      auth: { token: storedToken },
    });
    newSocket.on("connect", () => {
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
      dispatch(actions.connectionActions.connect({ token: storedToken }));
      dispatch(actions.connectionActions.stopPending());

      newSocket.off("dataProvider");
      newSocket.on("dataProvider", (data) => {
        dispatch(actions.globalDataActions.update({ data }));
      });

      newSocket.off("disconnect");
      newSocket.on("disconnect", () => {
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
  }, [isConnected, dispatch]);

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
        Authorization: `${connectionToken}`, // Inclure le JWT dans les en-têtes de la requête
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          dispatch(actions.connectionActions.disconnect());
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
  }, [connectionToken, dispatch]);

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
