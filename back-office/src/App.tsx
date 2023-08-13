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
import { AuthContext } from "./contexts/Auth";
import { IAuthContext } from "./types";

const App: React.FC = () => {
  const authContextValue: IAuthContext = useConnect();

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
