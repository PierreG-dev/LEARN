import styled from "styled-components";
import { ReactNode, FC, useContext } from "react";
import Navbar from "./navbar";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AuthContext } from "../../contexts/Auth";
import { IAuthContext } from "../../types/types";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const isConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  const { handleLogout } = useContext(AuthContext) as IAuthContext;
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
