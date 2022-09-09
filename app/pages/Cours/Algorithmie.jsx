import contenu from '../../components/Cours/AlgorithmieJS';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

const Algorithmie = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <MainContainer>
      <section>{contenu[selectedSection].jsx}</section>
      <List className="content-list">
        {contenu.map((elem, key) => {
          return (
            <ListItem
              class="content-list-item"
              key={key}
              onClick={() => setSelectedSection(key)}
              style={{
                background: selectedSection == key ? '#162f48FF' : '#122b44aa',
                color:
                  selectedSection == key
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {elem.nom}
            </ListItem>
          );
        })}
      </List>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  width: 100vw;
  height: calc(100vh - 75px);
  display: flex;
  background: #122b44;
  overflow-y: scroll;
  color: #fafafa;

  .content-list {
    width: 15%;
    height: 100%;
    background: #051e34;
    padding: 0;
    margin: 0;
    position: fixed;
    right: 0;

    .content-list-item {
      cursor: pointer;
      padding: 8px 10px;
      background: #122b44;
      transition: 0.1s;
      color: rgba(255, 255, 255, 0.4);
    }
    .content-list-item:hover {
      background: #162f48 !important;
      color: rgba(255, 255, 255, 0.6) !important;
    }
  }

  section {
    width: calc(85%);
    height: 100%;

    article {
      padding: 0 1vw;

      h1,
      h2,
      h3,
      h4,
      h5,
      p,
      span,
      small,
      sup,
      strong,
      u,
      li,
      ul {
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 2px 2px 7px rgba(255, 255, 255, 0.05);
        letter-spacing: 1px;
      }

      h1 {
        color: rgba(255, 255, 255, 0.9);
        font-size: 2.8rem;
        margin: 0;
        margin-top: 15px;
        letter-spacing: 2px;
      }

      h2 {
        color: rgba(255, 255, 255, 0.9);
        font-size: 2rem;
        letter-spacing: 2px;
      }

      ul {
        list-style: '- ';
      }

      p span {
        color: #569cd6;
        background: #1e1e1e;
        padding: 0.5px 8px;
      }
    }
  }
`;

export default Algorithmie;
