import React, { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import { APIResponse } from '../types/types';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface Props {
  handleLogin: (login: string, password: string) => Promise<APIResponse>;
  tryConnect: () => void;
}

const Auth = ({ handleLogin, tryConnect }: Props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  useEffect(() => {
    isConnected && tryConnect();
  }, [tryConnect, isConnected]);

  const handleResetError = useCallback(() => {
    setFormError('');
  }, []);

  //tente une connection avec un ancien potentiel JWT
  useEffect(tryConnect, [tryConnect]);

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
      setPassword('');
      if (!login || !password) return;
      const response: APIResponse = await handleLogin(login, password);
      if (response.code !== 200) setFormError(response.msg);
    },
    [handleLogin, login, password]
  );

  return (
    <MainContainer onClick={handleResetError}>
      <h1 className="logo-typo">BIENVENUE</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Login</label>
          <input
            className={formError ? 'error' : ''}
            type="text"
            name="login"
            id=""
            value={login}
            onChange={loginChange}
          />
        </div>
        <div>
          <label htmlFor="">Mot de passe</label>
          <input
            className={formError ? 'error' : ''}
            type="password"
            name="password"
            id=""
            value={password}
            onChange={passwordChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 60px;

  h1 {
    margin-top: -30vh;
    font-size: 4rem;
  }

  & > form {
    display: flex;
    flex-direction: column;
    width: 450px;
    gap: 20px;

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        width: 100%;
        border: none;
        background: #e07a5f33;
        transition: 0.1s;
        outline: 0px solid rgba(204, 36, 36, 0.6);
        padding: 10px 15px;
        border-radius: 5px;
        color: #fafafa;
        font-weight: bold;
        transition: 0.1s;

        &:focus {
          background: #e07a5f99;
        }

        &.error {
          outline: 2px solid rgba(204, 36, 36, 0.6) !important;
        }
      }
    }

    button {
      background: #e07a5f99;
      align-self: center;
      padding: 10px 15px;
      transition: 0.1s;
      border-radius: 5px;
      border: none;
      color: #fafafa;

      &:hover {
        cursor: pointer;
        background: #e07a5f;
      }
    }
  }
`;

export default Auth;
