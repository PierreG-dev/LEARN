import '../styles/globals.css';
import '../style/imported.css';
import { useState, useEffect, createContext, useContext } from 'react';
import Cryptr from 'cryptr';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import '../style/globals.css';
import '../style/gears_animation.css';
import '../style/loader_animation.css';
import '../style/loader.css';
import { DataContext } from '../context/context';
import Loader from '../components/Loader';

const fetchData = (setter) => {
  const encrypter = new Cryptr(process.env.NEXT_PUBLIC_ENCRYPT_KEY);

  fetch(process.env.NEXT_PUBLIC_DATA_FETCHING_URL)
    .then((response) => response.text())
    .then((data) => {
      let decryptedData = JSON.parse(encrypter.decrypt(data));
      setter(decryptedData);
    });
};

const socket = io('https://api.learn.pierre-godino.com', {
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  const [database, setDatabase] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'LEARN';
    //Récupération de la base de données
    let databaseUpdater = setInterval(() => {
      fetchData(setDatabase);
    }, 10000);

    //--- SOCKET IO ---//
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connexion avec le serveur établie.');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Déconnecté du serveur, tentative de reconnexion...');
    });

    socket.on('updates', () => {
      fetchData(setDatabase);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      clearInterval(databaseUpdater);
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      if (database)
        setTimeout(() => {
          setLoaded(true);
        }, 500);
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
