import { useState } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExerciceList from './ExercicesPanel';
import { DataContext } from '../../context/context';
import { useContext } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useCallback } from 'react';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExtensionIcon from '@mui/icons-material/Extension';
import CodeIcon from '@mui/icons-material/Code';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import LanguageIcon from '@mui/icons-material/Language';

const chapterIconPicker = (chapterName) => {
  switch (chapterName) {
    case 'Algorithmie en JS':
      return <PsychologyIcon />;
    case 'React':
      return <ExtensionIcon />;
    case 'DOM':
      return <AutoFixHighIcon />;
    case 'JQuery':
      return <RequestPageIcon />;
    case 'Algorithmie en PHP':
      return <PsychologyIcon />;
    case 'React Native':
      return <DevicesOtherIcon />;
    case 'Node JS':
      return <StorageIcon />;
    case 'HTML':
      return <CodeIcon />;
    case 'CSS':
      return <IntegrationInstructionsIcon />;
    case 'APIs':
      return <LanguageIcon />;
    default:
      return <MenuBookIcon />;
  }
};

const ExercicesLibrary = () => {
  const [selectedChapter, setSelectedChapter] = useState(-1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubChapter, setSelectedSubChapter] = useState(-1);
  const data = useContext(DataContext);

  const changeTab = useCallback((event, newTab) => {
    setSelectedTab(newTab);
  }, []);

  return (
    <MainContainer>
      <div
        style={{
          display: 'flex',
          height: '100%',
          maxWidth: '150px !important',
          boxShadow: 'none',
        }}
      >
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 246)' },
              background: { paper: '#E07A5F' },
            },
          })}
        >
          <Paper
            elevation={0}
            sx={{ maxWidth: 256, borderRadius: 0, height: '100%' }}
          >
            <ChapterMenu style={{ background: '#E07A5F' }}>
              <h2 id="library_title">Chapitres</h2>
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                  pb: open ? 2 : 0,
                  height: '100%',
                }}
              >
                {data.map((chapter, Ckey) => {
                  return (
                    <div key={Ckey}>
                      <ListItemButton
                        key={chapter._id}
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: 'rgba(255,255,255,.8)',
                        }}
                        onClick={() => {
                          if (Ckey !== selectedChapter) setSelectedTab(0);
                          setSelectedChapter(
                            Ckey === selectedChapter ? -1 : Ckey
                          );
                          setSelectedSubChapter(-1);
                        }}
                        disabled={!chapter.access}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {chapterIconPicker(chapter.chapterName)}
                        </ListItemIcon>
                        <ListItemText
                          primary={chapter.chapterName}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                          }}
                        />
                        <ListItemIcon>
                          <ExpandMoreIcon
                            style={{
                              transition: '0.2s',
                              transform:
                                selectedChapter === Ckey
                                  ? 'rotate(180deg)'
                                  : 'rotate(360deg)',
                            }}
                          />
                        </ListItemIcon>
                      </ListItemButton>
                      {selectedChapter === Ckey && chapter.access && (
                        <List style={{ marginLeft: 10 }}>
                          {chapter.subChapterList.map((subChapter, SCkey) => {
                            return (
                              <div
                                className={
                                  'menu-item-custom' +
                                  (subChapter.access ? ' accessible' : ' ')
                                }
                                onMouseOver={() => {
                                  console.log(SCkey, selectedSubChapter);
                                }}
                              >
                                <ListItemButton
                                  onClick={() => {
                                    if (!subChapter.access) return;
                                    if (SCkey !== selectedChapter)
                                      setSelectedTab(0);
                                    setSelectedSubChapter(
                                      SCkey === selectedSubChapter ? -1 : SCkey
                                    );
                                  }}
                                  key={subChapter._id}
                                  sx={{
                                    py: 0,
                                    minHeight: 32,
                                  }}
                                >
                                  {selectedSubChapter === SCkey ? (
                                    <BookmarkIcon
                                      sx={{
                                        color: subChapter.access
                                          ? 'inherit'
                                          : 'rgba(255,255,255,0.3)',
                                      }}
                                    ></BookmarkIcon>
                                  ) : (
                                    <BookmarkBorderIcon
                                      sx={{
                                        color: subChapter.access
                                          ? 'inherit'
                                          : 'rgba(255,255,255,0.3)',
                                      }}
                                    ></BookmarkBorderIcon>
                                  )}
                                  <ListItemText
                                    primary={subChapter.subChapterName}
                                    primaryTypographyProps={{
                                      fontSize: 14,
                                      fontWeight: 'medium',
                                    }}
                                    sx={{
                                      transition: '0.2s',
                                      color: subChapter.access
                                        ? SCkey == selectedSubChapter
                                          ? '#f2cc8f !important'
                                          : 'rgba(255,255,255,0.8) !important'
                                        : 'rgba(255,255,255,0.3)',
                                    }}
                                  />
                                </ListItemButton>
                              </div>
                            );
                          })}
                        </List>
                      )}
                    </div>
                  );
                })}
              </Box>
            </ChapterMenu>
          </Paper>
        </ThemeProvider>
      </div>
      <div
        style={{
          width: 'calc(100vw - 150px)',
          height: 'calc(100vh - 75px)',
        }}
      >
        {selectedChapter !== -1 &&
          selectedSubChapter !== -1 &&
          selectedChapter.exerciceList !== [] && (
            <ExerciceList
              changeTab={changeTab}
              selectedTab={selectedTab}
              subChapter={
                data[selectedChapter].subChapterList[selectedSubChapter]
              }
            />
          )}
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;

  h2#library_title {
    font-family: 'Silkscreen', cursive !important;
    letter-spacing: 2px;
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: auto;
  }
`;

const ChapterMenu = styled.aside``;

export default ExercicesLibrary;
