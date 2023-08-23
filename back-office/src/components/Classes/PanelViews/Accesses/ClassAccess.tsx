import React from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

const ClassAccess: React.FC = () => {
  const { classId } = useParams();

  return <h5>ClassAccess n°{classId}</h5>;
};

export default ClassAccess;
