import Navbar from "./Navbar";
import styled from "styled-components";

export default ({ children, isConnected }) => {
  return (
    <MainContainer>
      <Navbar isConnected={isConnected} />
      {children}
    </MainContainer>
  );
};

const MainContainer = styled.main``;
