import "./index.scss";
import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts";
import useRequests from "../../hooks/useRequests.tsx";

const Settings: React.FC = () => {
  // --- Pour accéder aux informations de l'utilisateur
  const connectedUser = useSelector((state: RootState) => state.data.user);
  // --- Pour gérer les requêtes
  const request = useRequests();

  const [pseudo, setPseudo] = useState(connectedUser?.username);
  const [theme, setTheme] = useState(connectedUser?.theme);

  console.log(connectedUser);

  const hasModificationsBeenDone = () => {
    if (pseudo !== connectedUser?.username) return true;

    return false;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(connectedUser);
    console.log(theme, pseudo);
    request.fetchToAPI("/api/updateUser", "PUT", {
      type: "application/json",
      content: JSON.stringify({
        username: pseudo,
        theme: theme,
      }),
    });
  };

  return (
    <div id="settings_container">
      <h1>Paramètres</h1>
      <img
        src={connectedUser?.avatarUrl}
        alt={"Avatar de " + connectedUser?.username}
      />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Identification</legend>
          <div>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              className="learn-input"
              value={connectedUser?.login}
              disabled
            />
          </div>

          <div>
            <label>Pseudo</label>
            <input
              type="text"
              className="learn-input"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Accès</legend>
          <div className="inline">
            <input type="checkbox" name="group_chat" checked={true} disabled />
            <label htmlFor="group_chat">Canal de discussion de classe</label>
          </div>

          <div className="inline">
            <input type="checkbox" name="global_chat" checked={true} disabled />
            <label htmlFor="global_chat">Canal de discussion global</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Personnalisation</legend>
          <label htmlFor="theme_select"></label>
          <select name="theme_select" className="learn-select" disabled>
            <option value="light" selected={connectedUser?.theme === "light"}>
              Thème clair
            </option>
            <option value="dark" selected={connectedUser?.theme === "dark"}>
              Thème sombre
            </option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Sécurité</legend>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              name="password"
              type="password"
              className="learn-input"
              value="mot de passe"
              disabled
            />
          </div>
          <button className="learn-button" id="account_delete" type="button">
            Supprimer mon compte
          </button>
        </fieldset>

        <button
          className="learn-button"
          type="submit"
          disabled={!hasModificationsBeenDone()}
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default Settings;
