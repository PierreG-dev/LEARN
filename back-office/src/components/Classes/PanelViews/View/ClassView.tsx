import React from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

const ClassView: React.FC = () => {
  const { classId } = useParams();

  return <h5>ClassView n° {classId}</h5>;
};

export default ClassView;
