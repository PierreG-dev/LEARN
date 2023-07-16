import React from "react";
import { useParams } from "react-router-dom";

type Props = {
  classId: string;
};

const ClassView: React.FC<Props> = ({ classId }) => {
  return <h1>ClassView n° {classId}</h1>;
};

export default ClassView;
