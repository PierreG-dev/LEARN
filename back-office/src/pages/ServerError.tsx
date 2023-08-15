import "../components/ServerError/index.scss";
import { TbPlugConnectedX } from "react-icons/tb";
import { FaCheck, FaTimes } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "../store/actions";
import testConnection from "../utilities/testConnection";

const ServerError = () => {
  const [onlineServer, setOnlineServer] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);

  // --- Fonction pour tester le serveur
  const pingServer = useCallback(() => {
    setPendingRequest(true);
    testConnection()
      .then((data) => {
        setTimeout(() => {
          console.log(data);
          setOnlineServer(true);
          setPendingRequest(false);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.info("Serveur Injoignable");
          setOnlineServer(false);
          setPendingRequest(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    if (onlineServer) window.location.reload();
  }, [onlineServer]);

  return (
    <main id="server_error_page">
      <h1>LEARN</h1>
      <TbPlugConnectedX />
      <h2>Erreur 500</h2>

      <h3>Le serveur est innaccessible pour le moment</h3>

      <button type="button" className="learn-button" onClick={pingServer}>
        Tester la connexion{" "}
        <span>
          {pendingRequest ? (
            <AiOutlineReload id="request_pending" />
          ) : onlineServer ? (
            <FaCheck style={{ color: "green" }} />
          ) : (
            <FaTimes style={{ color: "orangered" }} />
          )}
        </span>
      </button>
    </main>
  );
};

export default ServerError;
