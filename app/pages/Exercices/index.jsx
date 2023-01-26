import Head from 'next/head';

import { DataContext } from '../../context/context';
import { useContext } from 'react';
import { ListItem, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import ChapterList from '../../components/Exercices/ExercicesLibrary';
import { useEffect } from 'react';

const Index = () => {
  const data = useContext(DataContext);
  useEffect(() => {
    document.title = 'LEARN | Exercices';
  }, []);
  return (
    <div style={{ height: 'calc(100vh - 75px)', position: 'relative' }}>
      <ChapterList data={data} />
    </div>
  );
};

export default Index;
