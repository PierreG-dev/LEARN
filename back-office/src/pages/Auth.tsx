import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

interface Props {
  isConnected: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const Auth = ({ isConnected, handleLogin, handleLogout }: Props) => {
  return (
    <>
      <div>
        <h1>{isConnected ? 'connecté' : 'déconnecté'}</h1>
        <button onClick={handleLogin}>Se connecter</button>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </>
  );
};

export default Auth;
