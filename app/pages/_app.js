import "../styles/globals.css";
import "../style/imported.css";
import { useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import "../style/globals.css";
import "../style/gears_animation.css";
import "../style/loader_animation.css";
import "../style/loader.css";
import { DataContext } from "../context/context";
import Loader from "../components/Loader";

const fetchData = (setter) => {
  fetch("https://api.learn.pierre-godino.com/api/getData")
    .then((response) => response.json())
    .then((data) => {
      setter(data);
      console.log(data);
    });
};

const socket = io("https://api.learn.pierre-godino.com", {
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [database, setDatabase] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //Récupération de la base de données
    fetchData(setDatabase);

    //--- SOCKET IO ---//
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connexion avec le serveur établie.");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Déconnecté du serveur, tentative de reconnexion...");
    });

    socket.on("updates", () => {
      fetchData(setDatabase);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      if (database)
        setTimeout(() => {
          setLoaded(true);
        }, 3000);
    }
  }, [database]);

  return (
    <DataContext.Provider value={database}>
      <Loader loaded={loaded} />
      {loaded && (
        <Navbar isConnected={isConnected}>
          <Component {...pageProps} />
        </Navbar>
      )}
    </DataContext.Provider>
  );
}

export default MyApp;
