import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { APIResponse, IAuthContext, CodeCheckResponse } from "../types/types";
import { AuthContext } from "../contexts/Auth";
import { useContext } from "react";
import "../components/Signup/Signup.scss";
import useError from "../hooks/useError";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";

// A FAIRE: Gérer la modification du bouton d'inscription pour confirmer l'application de cette derniere

const Signup = () => {
  const { handleSignup, handleLogin, signupCodeCheck } = useContext(
    AuthContext
  ) as IAuthContext;
  const { error, changeErrorMsg, enableError, disableError } = useError();
  const [login, setLogin] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [signupCode, setSignupCode] = useState<string>("");
  const [isFetchingCodeConfirm, setIsFetchingCodeConfirm] =
    useState<boolean>(false);
  const [codeConfirmResponse, setCodeConfirmResponse] =
    useState<CodeCheckResponse | null>();
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const handleResetError = useCallback(() => {
    disableError();
  }, [disableError]);

  const loginChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setLogin(e.target.value);
    },
    []
  );

  const usernameChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setUsername(e.target.value);
    },
    []
  );

  const firstNameChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setFirstName(e.target.value);
    },
    []
  );

  const lastNameChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setLastName(e.target.value);
    },
    []
  );

  const passwordChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setPassword(e.target.value);
    },
    []
  );

  const passwordConfirmChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setPasswordConfirm(e.target.value);
    },
    []
  );

  const signupCodeChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ClipboardEvent<HTMLInputElement>
    ) => {
      if ("value" in e.target) setSignupCode(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (codeConfirmResponse && codeConfirmResponse.code === 200) {
        const signupResponse: APIResponse = await handleSignup(
          signupCode,
          firstName,
          lastName,
          login,
          username,
          password
        );
        if (signupResponse.code !== 200) {
          changeErrorMsg(signupResponse.msg);
          enableError();
          return;
        } else {
          await handleLogin(login, password);
        }
      }

      if (!login) {
        changeErrorMsg("Entrez un identifiant");
        enableError();
        return;
      }
      if (!username) {
        changeErrorMsg("Entrez un nom d'utilisateur");
        enableError();
        return;
      }
      if (!firstName) {
        changeErrorMsg("Entrez un prénom");
        enableError();
        return;
      }
      if (!lastName) {
        changeErrorMsg("Entrez un nom");
        enableError();
        return;
      }
      if (!password) {
        changeErrorMsg("Entrez un mot de passe");
        enableError();
        return;
      }
      if (!passwordConfirm) {
        changeErrorMsg("Confirmez votre mot de passe");
        enableError();
        return;
      }
      if (password !== passwordConfirm) {
        changeErrorMsg("Les mots de passe ne correspondent pas");
        enableError();
        setPasswordConfirm("");
        return;
      }
      if (!signupCode) {
        changeErrorMsg("Entrez votre code d'inscription");
        enableError();
        return;
      }

      setIsFetchingCodeConfirm(true);
      const response = await signupCodeCheck(signupCode);
      setTimeout(() => {
        setIsFetchingCodeConfirm(false);
        if (response) {
          setCodeConfirmResponse(response);
          if (response.code !== 200) {
            changeErrorMsg(response.msg);
            enableError();
          }
        }
      }, 1500);
    },
    [
      codeConfirmResponse,
      login,
      username,
      firstName,
      lastName,
      password,
      passwordConfirm,
      signupCode,
      signupCodeCheck,
      handleSignup,
      changeErrorMsg,
      enableError,
      handleLogin,
    ]
  );
  console.log(codeConfirmResponse);
  return (
    <MainContainer onClick={handleResetError} id="signup_page">
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
        <legend>
          <em className={`learn-error ${error.status ? "error" : ""}`}>
            {error.msg}
          </em>
        </legend>
        <div>
          <label htmlFor="login_input">
            Identifiant <em>Sert à se connecter</em>
          </label>
          <input
            className={`learn-input ${error.status && !login ? "error" : ""}`}
            type="text"
            name="login"
            placeholder="Identifiant"
            id="login_input"
            value={login}
            onChange={loginChange}
            onCut={loginChange}
            onPaste={loginChange}
            onCopy={loginChange}
            disabled={
              codeConfirmResponse && codeConfirmResponse.code === 200
                ? true
                : false
            }
          />
        </div>
        <div>
          <label htmlFor="username_input">
            Nom d'utilisateur{" "}
            <em>Sert à vous identifier auprès des autres utilisateurs</em>
          </label>
          <input
            className={`learn-input ${
              error.status && !username ? "error" : ""
            }`}
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            id="username_input"
            value={username}
            onChange={usernameChange}
            onCut={usernameChange}
            onPaste={usernameChange}
            onCopy={usernameChange}
            disabled={
              codeConfirmResponse && codeConfirmResponse.code === 200
                ? true
                : false
            }
          />
        </div>
        <fieldset>
          <legend>Données personnelles</legend>

          <div>
            <div>
              <label htmlFor="first_name_input">Prénom</label>
              <input
                className={`learn-input ${
                  error.status && !firstName ? "error" : ""
                }`}
                type="text"
                name="firstName"
                placeholder="Prénom"
                id="first_name_input"
                value={firstName}
                onChange={firstNameChange}
                onCut={firstNameChange}
                onPaste={firstNameChange}
                onCopy={firstNameChange}
                disabled={
                  codeConfirmResponse && codeConfirmResponse.code === 200
                    ? true
                    : false
                }
              />
            </div>
            <div>
              <label htmlFor="last_name_input">Nom</label>
              <input
                className={`learn-input ${
                  error.status && !lastName ? "error" : ""
                }`}
                type="text"
                name="lastName"
                placeholder="Nom"
                id="last_name_input"
                value={lastName}
                onChange={lastNameChange}
                onCut={lastNameChange}
                onPaste={lastNameChange}
                onCopy={lastNameChange}
                disabled={
                  codeConfirmResponse && codeConfirmResponse.code === 200
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Sécurité</legend>
          <div>
            <div>
              <label htmlFor="password_input">Mot de passe</label>
              <input
                className={`learn-input ${
                  error.status && !password ? "error" : ""
                }`}
                type="password"
                name="password"
                placeholder="Mot de passe"
                id="password_input"
                value={password}
                onChange={passwordChange}
                onCut={passwordChange}
                onPaste={passwordChange}
                onCopy={passwordChange}
                disabled={
                  codeConfirmResponse && codeConfirmResponse.code === 200
                    ? true
                    : false
                }
              />
            </div>
            <div>
              <label htmlFor="password_confirm_input">Confirmation</label>
              <input
                className={`learn-input ${
                  (error.status && !passwordConfirm) ||
                  passwordConfirm !== password
                    ? "error"
                    : ""
                }`}
                type="password"
                name="password_confirm"
                placeholder="Confirmation"
                id="password_confirm_input"
                value={passwordConfirm}
                onChange={passwordConfirmChange}
                onCut={passwordConfirmChange}
                onPaste={passwordConfirmChange}
                onCopy={passwordConfirmChange}
                disabled={
                  codeConfirmResponse && codeConfirmResponse.code === 200
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </fieldset>
        <div
          id="code-button-container"
          className={`${codeConfirmResponse?.code === 200 ? "confirmed" : ""}`}
        >
          <input
            className={`learn-input ${
              error.status &&
              (!signupCode ||
                (codeConfirmResponse && codeConfirmResponse.code === 400))
                ? "error"
                : ""
            }`}
            type="text"
            name="signupCode"
            placeholder="Code d'inscription"
            id=""
            value={signupCode}
            onChange={signupCodeChange}
            onCut={signupCodeChange}
            onPaste={signupCodeChange}
            onCopy={signupCodeChange}
            disabled={
              (codeConfirmResponse && codeConfirmResponse.code === 200) ||
              !login ||
              !username ||
              !firstName ||
              !lastName ||
              !password ||
              passwordConfirm !== password
                ? true
                : false
            }
          />
          <button
            type="submit"
            className="learn-button"
            disabled={
              codeConfirmResponse?.code !== 200 && signupCode ? false : true
            }
          >
            <div id="slider">
              <span>
                {isFetchingCodeConfirm ? (
                  <div className="lds-dual-ring"></div>
                ) : (
                  "Tester le code"
                )}
              </span>
              <span>
                <strong>{codeConfirmResponse?.msg}</strong> <AiOutlineCheck />
              </span>
            </div>
          </button>
        </div>

        <div id="legal_checkbox_container">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsChecked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTermsChecked(e.target.checked)
            }
            disabled={codeConfirmResponse?.code !== 200}
          />
          <label
            htmlFor="terms"
            className={codeConfirmResponse?.code === 200 ? "confirmed" : ""}
          >
            J'accepte les{" "}
            <a target="_blank" href="/legal/usage">
              Conditions d'utilisation
            </a>{" "}
            et la{" "}
            <a target="_blank" href="/legal/privacy">
              Politique de confidentialité
            </a>
          </label>
        </div>

        <button
          className={`learn-button ${
            codeConfirmResponse?.code === 200 || !termsChecked
              ? "confirmed"
              : ""
          }`}
          disabled={
            codeConfirmResponse?.code !== 200 || !termsChecked ? true : false
          }
        >
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
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

export default Signup;
