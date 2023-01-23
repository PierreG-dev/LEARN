import styled from 'styled-components';
import { DataContext } from '../../context/context';
import { useCallback, useContext, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link';
const Index = () => {
  const data = useContext(DataContext);

  useEffect(() => {
    document.title = 'LEARN | Cours';
  }, []);

  const calculateProgress = useCallback((chapter) => {
    let exercicesAmount = 0;
    let finishedExercicesAMount = 0;

    chapter.subChapterList.forEach((subChapter) => {
      exercicesAmount += subChapter.exerciceList.length;
      subChapter.exerciceList.forEach((exercice) => {
        if (exercice.solutionAccess) finishedExercicesAMount++;
      });
    });

    return (
      (finishedExercicesAMount / exercicesAmount).toFixed(2) * 100
    ).toFixed(2);
  });

  return (
    <MainContainer style={{ background: '#f4f1de' }}>
      <h1 style={{ color: '#e07a5f' }}>Chapitres</h1>
      <div id="chapter_wrapper">
        {data.map((chapter, key) => {
          return (
            <Link
              href={
                chapter.access
                  ? `/Cours/${chapter.chapterName
                      .split(' ')
                      .map((mot) => mot[0].toUpperCase() + mot.substring(1))
                      .join('')}`
                  : ''
              }
              key={key}
            >
              <div
                className={`chapter-card ${chapter.access || 'disabled'}`}
                style={{ background: '#f2cc8f' }}
                title={chapter.access || 'Cours innaccessible pour le moment'}
              >
                <h2 style={{ color: '#e07a5f' }}>{chapter.chapterName}</h2>
                <p style={{ color: '#e07a5f' }}>{chapter.description}</p>
                {chapter.access && (
                  <div className="progressBar-container">
                    <LinearProgress
                      variant="determinate"
                      value={calculateProgress(chapter)}
                      sx={{
                        background: '#F4F1DE',
                        borderRadius: 2,
                        width: '95%',
                      }}
                    />
                    <span style={{ color: '#e07a5f' }}>
                      {calculateProgress(chapter) == 100 ? (
                        <DoneIcon style={{ color: '#81B29A' }} />
                      ) : (
                        `${calculateProgress(chapter)}%`
                      )}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </MainContainer>
  );
};

export default Index;

const MainContainer = styled.section`
  height: calc(100vh - 75px);
  width: 100vw;
  position: relative;

  overflow-y: scroll;
  padding: 15px;

  h1 {
    font-size: 3rem;
    margin: 20px 0;
  }

  #chapter_wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .progressBar-container {
      display: flex;
      align-items: center;

      span {
        margin-right: 10px;
        font-size: 0.8rem;
      }

      .MuiLinearProgress-root span {
        background-color: #81b29a;
      }
    }
  }

  .chapter-card {
    cursor: pointer;
    border-radius: 5px;

    padding: 15px;
    transition: 0.2s;
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translate3d(0, -5px, 0);
      box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
    }

    &.disabled {
      box-shadow: none;
      filter: grayscale(0.4);
      cursor: help;
    }

    &.disabled:hover {
      transform: none;
      box-shadow: none;
    }

    h2 {
      margin: 0;
    }
  }
`;
