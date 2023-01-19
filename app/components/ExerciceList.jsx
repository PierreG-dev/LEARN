import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LockIcon from '@mui/icons-material/Lock';
import styled from 'styled-components';

const ExerciceList = ({ subChapter, selectedTab, changeTab }) => {
  const trollTemplate = `
    let trololo = 'issou';

    for (let issou = 666; issou < 25cm; issou--) {
      console.log("Bien essayé petit malin")
      console.info("Si tu mettais autant d'énergie à travailler qu'à ruser tu serais deja full-stack")
    }

    setInterval(() => {
      let body = document.querySelector('body')
      let article = document.createElement('small')
      article.innerHTML = "finito"
      body.appendChild(article)
    }, 100)
  `;

  return (
    <MainContainer
      style={{
        background: '#F4F1DE',

        height: 'calc(100vh - 75px)',
        color: '#fafafa',
      }}
      className="exercice-container"
    >
      <Tabs
        value={selectedTab}
        onChange={changeTab}
        aria-label="disabled tabs example"
      >
        {subChapter.exerciceList.map((exercice, key) => {
          return (
            <Tab
              key={key}
              label={`Ex ${key + 1}`}
              disabled={!exercice.access}
              className="exercice-tab"
              sx={selectedTab === key ? { opacity: 1 } : {}}
            />
          );
        })}
      </Tabs>
      {selectedTab >= 0 && (
        <section
          id="exercice_container"
          style={{
            padding: '4%',
            paddingTop: '1%',
            overflowY: 'scroll',
            maxHeight: '83.5vh',
            paddingBottom: '1%',
          }}
        >
          <h2 style={{ marginLeft: '-3%' }}>
            <strong
              style={{
                textAlign: 'center',
                width: '100%',
                display: 'block',
                marginBottom: 25,
              }}
            >
              {subChapter.exerciceList[selectedTab].instructions}
            </strong>
          </h2>
          <h3>Tips</h3>

          <div className="syntaxed">
            <SyntaxHighlighter language={'javascript'} style={vscDarkPlus}>
              {subChapter.exerciceList[selectedTab].data}
            </SyntaxHighlighter>
          </div>
          <h3>Solution</h3>
          {/* HTML */}
          {subChapter.exerciceList[selectedTab].solutionHTML && (
            <div>
              <h4>HTML</h4>
              <div style={{ position: 'relative' }}>
                {!subChapter.exerciceList[selectedTab].solutionAccess && (
                  <div title="La solution de cet exercice est verrouillée; faites l'exercice vous-même ;)">
                    <LockIcon className="lock" />
                  </div>
                )}
                <div
                  className="syntaxed"
                  style={{
                    filter:
                      !subChapter.exerciceList[selectedTab].solutionAccess &&
                      'blur(3px) grayscale(0.6) ',
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <SyntaxHighlighter language={'html'} style={vscDarkPlus}>
                    {subChapter.exerciceList[selectedTab].solutionAccess
                      ? subChapter.exerciceList[selectedTab].solutionHTML
                      : trollTemplate}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          )}
          {/* CSS */}
          {subChapter.exerciceList[selectedTab].solutionCSS && (
            <div>
              <h4>CSS</h4>
              <div style={{ position: 'relative' }}>
                {!subChapter.exerciceList[selectedTab].solutionAccess && (
                  <div title="La solution de cet exercice est verrouillée; faites l'exercice vous-même ;)">
                    <LockIcon className="lock" />
                  </div>
                )}
                <div
                  className="syntaxed"
                  style={{
                    filter:
                      !subChapter.exerciceList[selectedTab].solutionAccess &&
                      'blur(3px) grayscale(0.6) ',
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <SyntaxHighlighter language={'css'} style={vscDarkPlus}>
                    {subChapter.exerciceList[selectedTab].solutionAccess
                      ? subChapter.exerciceList[selectedTab].solutionCSS
                      : trollTemplate}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          )}
          {/* JS */}
          {subChapter.exerciceList[selectedTab].solutionJS && (
            <div>
              <h4>JS</h4>
              <div style={{ position: 'relative' }}>
                {!subChapter.exerciceList[selectedTab].solutionAccess && (
                  <div title="La solution de cet exercice est verrouillée; faites l'exercice vous-même ;)">
                    <LockIcon className="lock" />
                  </div>
                )}
                <div
                  className="syntaxed"
                  style={{
                    filter:
                      !subChapter.exerciceList[selectedTab].solutionAccess &&
                      'blur(3px) grayscale(0.6) ',
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <SyntaxHighlighter
                    language={'javascript'}
                    style={vscDarkPlus}
                  >
                    {subChapter.exerciceList[selectedTab].solutionAccess
                      ? subChapter.exerciceList[selectedTab].solutionJS
                      : trollTemplate}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          )}
          {subChapter.exerciceList[selectedTab].solutionFile && (
            <div>
              <h4>Fichiers</h4>
              <div style={{ position: 'relative' }}>
                <div
                  className="syntaxed"
                  style={{
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}
                >
                  {subChapter.exerciceList[selectedTab].solutionAccess ? (
                    <a
                      href={`${process.env.NEXT_PUBLIC_SOLUTION_FETCHING_URL}:${subChapter.exerciceList[selectedTab]._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="download-button">
                        Télécharger la solution
                      </button>
                    </a>
                  ) : (
                    <button className="download-button disabled">
                      Télécharger la solution
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.section`
  animation: fade-in 1 0.5s ease;

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Lato', sans-serif !important;
    color: #e07a5f;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
  }

  pre {
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  .download-button {
    padding: 10px 20px;
    font-family: 'Lato', sans-serif !important;
    border-radius: 5px;
    font-size: 1.3rem;
    font-weight: bold;
    color: #fafafa;
    border: none;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    margin-bottom: 10px;
    cursor: pointer;
    background: #e07a5f;
    transition: 0.2s;

    &.disabled {
      filter: grayscale(0.8);
      cursor: not-allowed;

      &:hover {
        color: #fafafa;
        background: #e07a5f;
      }
    }

    &:hover {
      color: #e07a5f;
      background: #fafafa;
    }
  }
`;
export default ExerciceList;
