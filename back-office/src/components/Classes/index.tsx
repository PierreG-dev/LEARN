import React from "react";
import { School } from "../../types";
import styled from "styled-components";
import ClassList from "./ClassList";
import "./index.scss";

type Props = {
  schools?: School[];
};

const Index: React.FC<Props> = ({ schools }) => {
  return (
    <MainContainer>{schools && <ClassList schools={schools} />}</MainContainer>
  );
};

const MainContainer = styled.main`
  min-height: 100%;
  margin: 0;
  display: flex;
`;

export default Index;
