import React from "react";
import ClassesPage from "../components/Classes";
import { useSelector } from "react-redux";
import { RootState } from "../store/index.ts";

type Props = {
  edit?: boolean;
};

const Classes: React.FC<Props> = () => {
  const data = useSelector((state: RootState) => state.data);
  return <ClassesPage schools={data.schools} />;
};

export default Classes;
