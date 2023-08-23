import React from 'react';
import ClassesPage from '../components/Classes';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index.ts';

const Classes: React.FC = () => {
  return <ClassesPage />;
};

export default Classes;
