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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExerciceList from './ExerciceList';
import { DataContext } from '../context/context';
import { useContext } from 'react';

// const FireNav = styled(List)({
//   '& .MuiListItemButton-root': {
//     paddingLeft: 24,
//     paddingRight: 24,
//   },
//   '& .MuiListItemIcon-root': {
//     minWidth: 0,
//     marginRight: 16,
//   },
//   '& .MuiSvgIcon-root': {
//     fontSize: 20,
//   },
// });

export default function CustomizedList() {
  const [selectedChapter, setSelectedChapter] = useState(-1);
  const [selectedSubChapter, setSelectedSubChapter] = useState(-1);
  const data = useContext(DataContext);

  return (
    <div style={{ width: '100vw', height: '100%', display: 'flex' }}>
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
              <ListItemButton component="a" href="#customized-list">
                <ListItemIcon sx={{ fontSize: 20 }}>📚</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="Chapitres"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
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
                          setSelectedChapter(
                            Ckey === selectedChapter ? -1 : Ckey
                          );
                        }}
                        disabled={!chapter.access}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={chapter.chapterName}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                          }}
                        />
                        <ListItemIcon>
                          {selectedChapter === Ckey ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </ListItemIcon>
                      </ListItemButton>
                      {selectedChapter === Ckey && chapter.access && (
                        <List style={{ marginLeft: 10 }}>
                          {chapter.subChapterList.map((subChapter, SCkey) => {
                            return (
                              <ListItemButton
                                onClick={() =>
                                  setSelectedSubChapter(
                                    SCkey === selectedSubChapter ? -1 : SCkey
                                  )
                                }
                                key={subChapter._id}
                                sx={{
                                  py: 0,
                                  minHeight: 32,
                                  color: 'rgba(255,255,255,.8)',
                                }}
                              >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                  <MenuBookIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={subChapter.subChapterName}
                                  primaryTypographyProps={{
                                    fontSize: 14,
                                    fontWeight: 'medium',
                                  }}
                                />
                              </ListItemButton>
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
              subChapter={
                data[selectedChapter].subChapterList[selectedSubChapter]
              }
            />
          )}
      </div>
    </div>
  );
}

const ChapterMenu = styled.aside``;
