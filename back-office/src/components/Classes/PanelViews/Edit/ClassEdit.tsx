import React from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

const ClassEdit: React.FC = () => {
  const { classId } = useParams();

  return <h5>ClassEdit n° {classId}</h5>;
};

export default ClassEdit;
