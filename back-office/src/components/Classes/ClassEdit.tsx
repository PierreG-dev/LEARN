import React from "react";
import { useParams } from "react-router-dom";

type Props = {
  classId: string;
};

const ClassEdit: React.FC<Props> = ({ classId }) => {
  return <h1>ClassEdit n° {classId}</h1>;
};

export default ClassEdit;
