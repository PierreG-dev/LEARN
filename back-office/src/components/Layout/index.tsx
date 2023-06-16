import styled from 'styled-components';
import { ReactNode } from 'react';
import Navbar from './navbar';

interface Props {
  children: ReactNode;
  handleLogout: () => void;
  isConnected: boolean;
}

const Layout = ({ children, handleLogout, isConnected }: Props) => {
  return (
    <MainContainer>
      <Navbar handleLogout={handleLogout} isConnected={isConnected} />
      {children}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
`;

export default Layout;
