import React, { useCallback } from "react";
import { School, Class } from "../../types/types";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import ClassView from "./ClassView";
import ClassEdit from "./ClassEdit";
import ClassList from "./ClassList";
import "./index.scss";

type Props = {
  schools?: School[];
};

const Index: React.FC<Props> = ({ schools }) => {
  const { classId, schoolId } = useParams();

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
