import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { DataContext } from '../context/context';
import { useContext } from 'react';
import { ListItem, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import ChapterList from '../components/ChapterList';

export default function Home() {
  const data = useContext(DataContext);
  return (
    <div style={{ height: 'calc(100vh - 75px)', position: 'relative' }}>
      <ChapterList data={data} />
    </div>
  );
}
