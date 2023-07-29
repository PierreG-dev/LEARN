import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { APIResponse, IAuthContext, CodeCheckResponse } from '../types/types';
import { AuthContext } from '../contexts/Auth';
import { useContext } from 'react';
import '../components/Signup/Signup.scss';
import useError from '../hooks/useError';
import { Link } from 'react-router-dom';

// A FAIRE: Gérer les events paste cut copy en plus de change sur les inputs

const Signup = () => {
  const { handleSignup, handleLogin, signupCodeCheck } = useContext(
    AuthContext
  ) as IAuthContext;
  const { error, changeErrorMsg, enableError, disableError } = useError();
  const [login, setLogin] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [signupCode, setSignupCode] = useState<string>('');

  const [codeConfirmResponse, setCodeConfirmResponse] =
    useState<CodeCheckResponse | null>();

  const handleResetError = useCallback(() => {
    disableError();
  }, [disableError]);

  const loginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  }, []);

  const usernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const firstNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
    },
    []
  );

  const lastNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
    },
    []
  );

  const passwordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const passwordConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
    },
    []
  );

  const signupCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupCode(e.target.value);
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
        changeErrorMsg('Entrez un identifiant');
        enableError();
        return;
      }
      if (!username) {
        changeErrorMsg("Entrez un nom d'utilisateur");
        enableError();
        return;
      }
      if (!firstName) {
        changeErrorMsg('Entrez un prénom');
        enableError();
        return;
      }
      if (!lastName) {
        changeErrorMsg('Entrez un nom');
        enableError();
        return;
      }
      if (!password) {
        changeErrorMsg('Entrez un mot de passe');
        enableError();
        return;
      }
      if (!passwordConfirm) {
        changeErrorMsg('Confirmez votre mot de passe');
        enableError();
        return;
      }
      if (password !== passwordConfirm) {
        changeErrorMsg('Les mots de passe ne correspondent pas');
        enableError();
        setPasswordConfirm('');
        return;
      }
      if (!signupCode) {
        changeErrorMsg("Entrez votre code d'inscription");
        enableError();
        return;
      }

      const response = await signupCodeCheck(signupCode);
      if (response) {
        setCodeConfirmResponse(response);
        if (response.code !== 200) {
          changeErrorMsg(response.msg);
          enableError();
        }
      }
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
          Déjà un compte ?{' '}
          <Link to="/login">
            <button className="learn-button sm">Se connecter</button>
          </Link>
        </span>
      </h1>

      <form onSubmit={handleSubmit}>
        <legend>
          <em className={`learn-error ${error.status ? 'error' : ''}`}>
            {error.msg}
          </em>
        </legend>
        <div>
          <label htmlFor="">
            Identifiant <em>Sert à se connecter</em>
          </label>
          <input
            className={`learn-input ${error.status && !login ? 'error' : ''}`}
            type="text"
            name="login"
            placeholder="Identifiant"
            id=""
            value={login}
            onChange={loginChange}
          />
        </div>
        <div>
          <label htmlFor="">
            Nom d'utilisateur{' '}
            <em>Sert à vous identifier auprès des autres utilisateurs</em>
          </label>
          <input
            className={`learn-input ${
              error.status && !username ? 'error' : ''
            }`}
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            id=""
            value={username}
            onChange={usernameChange}
          />
        </div>
        <fieldset>
          <legend>Données personnelles</legend>

          <div>
            <div>
              <label htmlFor="">Prénom</label>
              <input
                className={`learn-input ${
                  error.status && !firstName ? 'error' : ''
                }`}
                type="text"
                name="firstName"
                placeholder="Prénom"
                id=""
                value={firstName}
                onChange={firstNameChange}
              />
            </div>
            <div>
              <label htmlFor="">Nom</label>
              <input
                className={`learn-input ${
                  error.status && !lastName ? 'error' : ''
                }`}
                type="text"
                name="lastName"
                placeholder="Nom"
                id=""
                value={lastName}
                onChange={lastNameChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Sécurité</legend>
          <div>
            <div>
              <label htmlFor="">Mot de passe</label>
              <input
                className={`learn-input ${
                  error.status && !password ? 'error' : ''
                }`}
                type="password"
                name="password"
                placeholder="Mot de passe"
                id=""
                value={password}
                onChange={passwordChange}
              />
            </div>
            <div>
              <label htmlFor="">Confirmation</label>
              <input
                className={`learn-input ${
                  error.status && !passwordConfirm ? 'error' : ''
                }`}
                type="password"
                name="password_confirm"
                placeholder="Confirmation"
                id=""
                value={passwordConfirm}
                onChange={passwordConfirmChange}
              />
            </div>
          </div>
        </fieldset>

        <div>
          <input
            className={`learn-input ${
              error.status &&
              (!signupCode ||
                (codeConfirmResponse && codeConfirmResponse.code === 400))
                ? 'error'
                : ''
            }`}
            type="text"
            name="signupCode"
            placeholder="Code d'inscription"
            id=""
            value={signupCode}
            onChange={signupCodeChange}
          />
          <button className="learn-button" type="submit">
            S'inscrire
          </button>
        </div>
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
