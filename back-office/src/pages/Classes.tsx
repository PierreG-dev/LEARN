import React from "react";
import ClassesPage from "../components/Classes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {
  edit?: boolean;
};

const Classes: React.FC<Props> = ({ edit = false }) => {
  const dataPack = useSelector((state: RootState) => state.globalData.data);
  return <ClassesPage edit={edit} schools={dataPack.schools} />;
};

export default Classes;
