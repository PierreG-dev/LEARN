import styled from "styled-components";
import { ReactNode } from "react";
import Navbar from "./navbar";
import "./index.scss";

interface Props {
  children: ReactNode;
  handleLogout: () => void;
  isConnected: boolean;
}

const Layout = ({ children, handleLogout, isConnected }: Props) => {
  return (
    <MainContainer>
      {isConnected && (
        <Navbar handleLogout={handleLogout} isConnected={isConnected} />
      )}
      <main className={isConnected ? "connected" : ""}>{children}</main>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  padding: 0;

  main {
    width: 100%;
    height: 100%;

    &.connected {
      height: calc(100% - 60px) !important;
    }
  }
`;

export default Layout;
