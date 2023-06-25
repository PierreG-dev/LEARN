import { useEffect, useState, useCallback } from 'react';
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
import Chapter from './pages/Chapters';
import Classes from './pages/Classes';
import { connect, disconnect } from './store/auth/actions';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store, { RootState } from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIResponse } from './types/types';
import Loader from './components/Layout/Loader';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();

  const dispatch = useDispatch();
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );
  const connectionToken = useSelector(
    (state: RootState) => state.connection.token
  );

  //Vérifie si un JWT est enregistré dans le localStorage, et se connect en conséquence
  const tryConnect = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    const newSocket = io('http://localhost:8000', {
      auth: { token: storedToken },
    });
    newSocket.on('connect', () => {
      toast.success('Connexion établie', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setSocket(newSocket);
      dispatch(connect({ token: storedToken }));
    });
  }, [dispatch]);

  //Connexion
  const handleLogin = useCallback(
    async (login: string, password: string): Promise<APIResponse> => {
      return await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            localStorage.setItem('token', data.token);
            tryConnect();
          } else if (data.code === 401) {
            toast.error('Identifiants invalides', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }
          return data;
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion', error);
          return {
            code: 500,
            msg: 'Problème de réseau',
          };
        });
    },
    [tryConnect]
  );

  //Deconnexion
  const handleLogout = useCallback(() => {
    // Supprimer le JWT du stockage local

    // Exemple d'appel d'API pour se déconnecter en utilisant le JWT
    fetch('http://localhost:8000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${connectionToken}`, // Inclure le JWT dans les en-têtes de la requête
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          dispatch(disconnect());
          localStorage.removeItem('token');
          toast.warn('Déconnexion réussie', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          toast.error('Erreur lors de la déconnexion', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
      });
  }, [connectionToken, dispatch]);

  const routerGenerator = useCallback(() => {
    if (!isConnected)
      return (
        <>
          <Route
            path="/auth"
            element={<Auth handleLogin={handleLogin} tryConnect={tryConnect} />}
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
          <Route path="/chapters/:chapterId?" element={<Chapter />} />
          <Route path="/classes/:classId?" element={<Classes />} />
          <Route path="*" element={<Error404 />} />
        </>
      );
  }, [handleLogin, isConnected, tryConnect]);

  return (
    <>
      <Loader />
      <ToastContainer />
      <Router>
        <Layout handleLogout={handleLogout} isConnected={isConnected}>
          <Routes>{routerGenerator()}</Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
