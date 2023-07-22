import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { APIResponse, IAuthContext } from "../types/types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/Auth";
import { useContext } from "react";
import "../components/Login/Login.scss";
import useError from "../hooks/useError";
import { Link } from "react-router-dom";

const Signup = () => {
  const { handleLogin } = useContext(AuthContext) as IAuthContext;
  const { error, changeErrorMsg, enableError, disableError } = useError();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleResetError = useCallback(() => {
    disableError();
  }, [disableError]);

  const loginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  }, []);

  const passwordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPassword("");
      if (!login && !password) {
        changeErrorMsg("Entrez un identifiant et un mot de passe");
        enableError();
        return;
      }
      if (!login) {
        changeErrorMsg("Entrez un identifiant");
        enableError();
        return;
      }
      if (!password) {
        changeErrorMsg("Entrez un mot de passe");
        enableError();
        return;
      }
      const response: APIResponse = await handleLogin(login, password);
      if (response.code !== 200) {
        changeErrorMsg(response.msg);
        enableError();
        return;
      }
    },
    [handleLogin, login, password, changeErrorMsg, enableError]
  );

  return (
    <MainContainer onClick={handleResetError} id="login_page">
      <h1 className="logo-typo">
        INSCRIPTION <br />
        <span>
          Déjà un compte ?{" "}
          <Link to="/login">
            <button className="learn-button sm">Se connecter</button>
          </Link>
        </span>
      </h1>

      <form onSubmit={handleSubmit}>
        <em className={`learn-error ${error.status ? "error" : ""}`}>
          {error.msg}
        </em>
        <div>
          <label htmlFor="">Identifiant</label>
          <input
            className={`learn-input ${error.status ? "error" : ""}`}
            type="text"
            name="login"
            placeholder="Entrez un identifiant"
            id=""
            value={login}
            onChange={loginChange}
          />
        </div>
        <div>
          <label htmlFor="">Nom d'utilisateur</label>
          <input
            className={`learn-input ${error.status ? "error" : ""}`}
            type="text"
            name="username"
            placeholder="Entrez un pseudonyme"
            id=""
            value={login}
            onChange={loginChange}
          />
        </div>
        <fieldset>
          <legend></legend>
          <div>
            <label htmlFor="">Prénom</label>
            <input
              className={`learn-input ${error.status ? "error" : ""}`}
              type="text"
              name="firstName"
              placeholder="Entrez votre prénom"
              id=""
              value={login}
              onChange={loginChange}
            />
          </div>
          <div>
            <label htmlFor="">Nom</label>
            <input
              className={`learn-input ${error.status ? "error" : ""}`}
              type="text"
              name="lastName"
              placeholder="Entrez votre Nom"
              id=""
              value={login}
              onChange={loginChange}
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="">Mot de passe</label>
          <input
            className={`learn-input ${error.status ? "error" : ""}`}
            type="password"
            name="password"
            placeholder="Entrez un mot de passe"
            id=""
            value={password}
            onChange={passwordChange}
          />
        </div>
        <div>
          <label htmlFor="">Confirmation</label>
          <input
            className={`learn-input ${error.status ? "error" : ""}`}
            type="password"
            name="password_confirm"
            placeholder="Confirmez votre mot de passe"
            id=""
            value={password}
            onChange={passwordChange}
          />
        </div>
        <button className="learn-button" type="submit">
          S'inscrire
        </button>
      </form>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 25vh;
  height: 100vh;
  gap: 60px;
`;

export default Signup;
