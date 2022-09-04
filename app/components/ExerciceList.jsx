import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ExerciceList = ({ subChapter }) => {
  const [selectedTab, setSelectedTab] = useState(-1);
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
      article.innerHTML = "En pétant"
      body.appendChild(article)
    }, 100)
  `;

  return (
    <section>
      <Tabs
        value={selectedTab}
        onChange={changeTab}
        aria-label="disabled tabs example"
      >
        {subChapter.exerciceList.map((exercice, key) => {
          return <Tab label={`Ex ${key}`} disabled={!exercice.access} />;
        })}
      </Tabs>
      {selectedTab >= 0 && (
        <div>
          <h2>Exercice</h2>
          <p>{subChapter.exerciceList[selectedTab].instructions}</p>
          <h3>Données</h3>
          <p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
              {subChapter.exerciceList[selectedTab].data}
            </SyntaxHighlighter>
          </p>
          <h3>Solution</h3>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {subChapter.exerciceList[selectedTab].solutionAccess
              ? subChapter.exerciceList[selectedTab].solution
              : trollTemplate}
          </SyntaxHighlighter>
          <p
            style={{
              filter:
                !subChapter.exerciceList[selectedTab].solutionAccess &&
                'blur(3px)',
            }}
          ></p>
        </div>
      )}
    </section>
  );
};

export default ExerciceList;

// <Tab label="Active" />
// <Tab label="Disabled" disabled />
// <Tab label="Active" />
