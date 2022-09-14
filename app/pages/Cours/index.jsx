import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { DataContext } from '../../context/context';
import { useContext, useEffect } from 'react';
import { ListItem, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import ChapterList from '../../components/ChapterList';
import { router } from 'next/router';
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link';

export default function Index() {
  const data = useContext(DataContext);

  const calculateProgress = (chapter) => {
    let exercicesAmount = 0;
    let finishedExercicesAMount = 0;

    chapter.subChapterList.forEach((subChapter) => {
      exercicesAmount += subChapter.exerciceList.length;
      subChapter.exerciceList.forEach((exercice) => {
        if (exercice.solutionAccess) finishedExercicesAMount++;
      });
    });

    return (finishedExercicesAMount / exercicesAmount).toFixed(2) * 100;
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 75px)',
        position: 'relative',
        background: 'rgb(20, 45, 70) none repeat scroll 0% 0%',
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 15,
          flexWrap: 'wrap',
          width: 'calc(100vw - 30px)',
          alignItems: 'center',
          gap: 50,
        }}
      >
        {data.map((chapter, key) => {
          return (
            <Link href={`/Cours/${chapter.chapterName}`} key={key}>
              <Paper
                elevation={3}
                className="chapter-card"
                sx={{
                  padding: 2,
                  width: 300,
                  color: '#fafafa',
                  margin: 0,
                  background:
                    'rgba(40, 66, 92, 0) linear-gradient(to right bottom, rgb(40, 66, 92), rgb(33, 56, 79) 120%) repeat scroll 0% 0%',
                }}
              >
                <h2 style={{ margin: 0, color: '#fafafa' }}>
                  {chapter.chapterName}
                </h2>
                <p>{chapter.description}</p>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(chapter)}
                  sx={{ background: 'rgb(28, 49, 70)' }}
                />
              </Paper>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
