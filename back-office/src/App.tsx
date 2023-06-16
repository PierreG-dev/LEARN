import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import Error404 from './pages/Error404';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from './pages';

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Ajout du state pour stocker le token

  //Gestion de la connexion
  useEffect(() => {
    // Établir la connexion Socket.IO lorsque le token est défini
    if (token) {
      const newSocket = io('http://localhost:8000', {
        auth: { token },
      });

      newSocket.on('connect', () => {
        console.log('Connecté au serveur Socket.IO');
        setSocket(newSocket);
        setIsConnected(true);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  //Gestion du JWT
  useEffect(() => {
    // Récupérer le JWT depuis le stockage local lors du montage initial
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  //Connexion
  const handleLogin = () => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'root',
        password: 'godgod82100',
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Échec de la connexion');
        }
      })
      .then((data) => {
        const token = data.token;
        setToken(token);
        localStorage.setItem('token', token);
        console.log('Connecté avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion', error);
      });
  };

  //Deconnexion
  const handleLogout = () => {
    // Supprimer le JWT du stockage local
    localStorage.removeItem('token');

    // Exemple d'appel d'API pour se déconnecter en utilisant le JWT
    fetch('http://localhost:8000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Inclure le JWT dans les en-têtes de la requête
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsConnected(false);
          setToken(null);
          console.log('Déconnecté avec succès');
        } else {
          console.log('Échec de la déconnexion');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
      });
  };
  console.log(isConnected);
  const routerGenerator = () => {
    if (!isConnected)
      return (
        <>
          <Route
            path="/auth"
            element={
              <Auth
                isConnected={isConnected}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          />
          {!isConnected && (
            <Route path="*" element={<Navigate to="/auth" replace />} />
          )}
        </>
      );
    else
      return (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Error404 />} />
        </>
      );
  };

  return (
    <Router>
      <Layout handleLogout={handleLogout} isConnected={isConnected}>
        <h1>Coucou</h1>
        <Routes>{routerGenerator()}</Routes>
      </Layout>
    </Router>
  );
}

{
  /* <Route path="/" element={<Home />} />
          {!isConnected && (
            <Route path="*" element={<Navigate to="/auth" replace />} />
          )}

          <Route
            path="/auth"
            element={
              <Auth
                isConnected={isConnected}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          /> */
}
export default App;
