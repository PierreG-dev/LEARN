import Layout from "./components/Layout";
import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/index.ts";
import { ToastContainer } from "react-toastify";
import useConnect from "./hooks/useConnect";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Layout/Loader";
import Router from "./routes/Router";
import ServerError from "./pages/ServerError";
import { AuthContext } from "./contexts/Auth";
import { IAuthContext } from "./types";

const App: React.FC = () => {
  // --- Contexte possédant toutes les fonctions de gestion de la connexion
  const authContextValue: IAuthContext = useConnect();

  // --- Témoin de la connexion avec le serveur
  const isServerOnline = useSelector(
    (state: RootState) => state.globals.isServerOnline
  );

  // --- Témoin de l'authentification
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);

  if (!isServerOnline && !isConnected) return <ServerError />;

  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Loader />
        <ToastContainer />
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
