import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LockIcon from '@mui/icons-material/Lock';
import styled from 'styled-components';

const ExerciceList = ({ subChapter }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const changeTab = (event, newTab) => {
    setSelectedTab(newTab);
  };

  useEffect(() => {
    setSelectedTab(0);
  }, []);

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
        overflowY: 'scroll',
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
            />
          );
        })}
      </Tabs>
      {selectedTab >= 0 && (
        <div style={{ padding: '1%' }}>
          <h2>
            <strong>{subChapter.exerciceList[selectedTab].instructions}</strong>
          </h2>
          <h3>Données</h3>

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
        </div>
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
    color: #e07a5f;
  }
`;
export default ExerciceList;
