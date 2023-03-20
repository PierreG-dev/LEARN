import "../styles/globals.css";
import "../style/imported.css";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { encrypt, decrypt } from "@devoxa/aes-encryption";
import { io } from "socket.io-client";
import Layout from "../components/Layout";
import "../style/globals.css";
import "../style/gears_animation.css";
import "../style/loader_animation.css";
import "../style/loader.css";
import { DataContext } from "../context/context";
import Loader from "../components/Layout/Loader";

//connexion aux sockets
const socket = io("https://api.learn.pierre-godino.com", {
  autoConnect: true,
});

//Tri des Chapitres en fonction de leur disponibilité
const dataSorter = (chapter1, chapter2) => {
  if (chapter1.access && chapter2.access) return 0;
  if (chapter1.access && !chapter2.access) return -1;
  if (!chapter1.access && chapter2.access) return 1;
};

function MyApp({ Component, pageProps }) {
  const [rawData, setRawData] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [loaded, setLoaded] = useState(false);

  const dataHash = useRef();

  //Gère le décryptage des données
  const database = useMemo(() => {
    if (!rawData) return;
    try {
      const key = "" + process.env.NEXT_PUBLIC_ENCRYPT_KEY; //Clé de cryptage
      console.info("Decrypting...");
      let decryptedData = decrypt(key, rawData);
      console.info("Parsing...");
      let parsedData = JSON.parse(decryptedData);
      console.info("Data parsed !");
      return parsedData.sort(dataSorter);
    } catch (err) {
      console.error("DECRYPTING ERROR" + err);
    }
  }, [rawData]);

  //Gère les protocoles de démarrage
  useEffect(() => {
    update();
    document.title = "LEARN";
    //Récupération de la base de données
    let databaseUpdater = setInterval(() => {
      update();
    }, 10000);

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
      socket.off("updates");
      clearInterval(databaseUpdater);
    };
  }, []);

  //Gère la communication avec l'API
  const update = useCallback(() => {
    fetch(process.env.NEXT_PUBLIC_DATA_FETCHING_URL + "Hashed")
      .then((response) => response.text())
      .then((newHash) => {
        if (newHash != dataHash.current) {
          dataHash.current = newHash;
          console.info("Update running...");
          fetch(process.env.NEXT_PUBLIC_DATA_FETCHING_URL)
            .then((response) => response.text())
            .then((data) => {
              setRawData(data); //Update si les données ont changées
            })
            .catch((err) => console.error("UPDATE ERROR" + err));
        }
      });
  }, []);

  //Gère le chargement de la page
  useEffect(() => {
    if (!loaded) {
      if (database)
        setTimeout(() => {
          setLoaded(true);
        }, 1500);
    }
  }, [database]);

  return (
    <DataContext.Provider value={database}>
      <Loader loaded={loaded} />
      {loaded && (
        <Layout isConnected={isConnected}>
          <Component {...pageProps} />
        </Layout>
      )}
    </DataContext.Provider>
  );
}

export default MyApp;
