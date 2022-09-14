import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LockIcon from '@mui/icons-material/Lock';

const ExerciceList = ({ subChapter }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(subChapter);

  const changeTab = (event, newTab) => {
    setSelectedTab(newTab);
  };

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
    <section
      style={{
        background: '#142d46',
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
              <SyntaxHighlighter language={'javascript'} style={vscDarkPlus}>
                {subChapter.exerciceList[selectedTab].solutionAccess
                  ? subChapter.exerciceList[selectedTab].solution
                  : trollTemplate}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExerciceList;
