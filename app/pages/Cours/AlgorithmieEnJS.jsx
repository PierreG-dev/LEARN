import contenu from '../../components/Cours/AlgorithmieJS';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

const AlgorithmieEnJs = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <MainContainer style={{ background: '#F4F1DE' }}>
      <section style={{ color: '#E07A5F' }}>
        {contenu[selectedSection].jsx}
      </section>
      <List className="content-list">
        {contenu.map((elem, key) => {
          if (elem.access)
            return (
              <ListItem
                class="content-list-item"
                key={key}
                onClick={() => setSelectedSection(key)}
                style={{
                  background:
                    selectedSection == key ? '#F2CC8F' : 'transparent',
                  color:
                    selectedSection == key
                      ? 'rgba(224,122,95, 0.9)'
                      : 'rgba(224,122,95, 0.7)',
                  opacity: selectedSection == key ? 1 : 0.7,
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
  overflow-y: scroll;
  color: #fafafa;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
    margin-top: 15px;
    margin-bottom: 15px;
    letter-spacing: 4px;
  }

  .content-list {
    width: 15%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: fixed;
    right: 20px;
    margin-top: 5px;

    .content-list-item {
      cursor: pointer;
      padding: 8px 10px;
      transition: 0.5s;
      opacity: 0.5;
      border-radius: 5px;
    }
    .content-list-item:hover {
      opacity: 1 !important;
    }
  }

  section {
    width: calc(85%);
    height: 100%;

    div {
      padding: 0 1vw;

      article {
        border-radius: 15px;
        background: #f2cc8f;
        box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
        padding: 15px;
        margin-bottom: 30px;

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
          text-shadow: 2px 2px 7px rgba(255, 255, 255, 0.05);
          letter-spacing: 1px;
        }

        h2 {
          font-size: 2.25rem;
          letter-spacing: 2px;
          margin: 0;
        }

        h3 {
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
  }
`;

export default AlgorithmieEnJs;
