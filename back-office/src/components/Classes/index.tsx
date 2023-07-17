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
  edit: boolean;
};

const Index: React.FC<Props> = ({ schools, edit }) => {
  const { classId } = useParams();

  const displaypicker = useCallback(() => {
    if (classId && !edit) return <ClassView classId={classId} />;
    else if (classId && edit) return <ClassEdit classId={classId} />;
    else if (schools) return <ClassList schools={schools} />;
    else "no data";
  }, [classId, edit]);

  return <MainContainer>{displaypicker()}</MainContainer>;
};

const MainContainer = styled.main`
  min-height: 100%;
  margin: 0;
  padding: 20px 30px;
`;

export default Index;
