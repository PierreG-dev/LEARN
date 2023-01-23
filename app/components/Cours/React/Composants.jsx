import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Composants = () => {
  return (
    <div>
      <h1>Les composants</h1>

      <article>
        <h2>Qu'est-ce qu'un composant ?</h2>
        <p>Voici un composant:</p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`const MonComposant = () => {
  return <p>Hello world!</p>;
};`}</SyntaxHighlighter>
        <p>
          Il s'agit d'une fonction retournant un objet sous forme de{' '}
          <strong>JSX</strong> (HTML javascriptifié)
        </p>
        <p>
          Un composant peut être récupéré dans un autre code JSX en étant
          exporté de son fichier:
        </p>
        <SyntaxHighlighter
          language="jsx"
          style={vscDarkPlus}
        >{`const MonComposant = () => {
  return <p>Hello world!</p>;
};

export default MonComposant;
`}</SyntaxHighlighter>
        et en étant importé à l'endroit où on souhaite l'afficher:
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import MonComposant from './MonComposant';

const Index = () => {
  return (
    <div>
      <MonComposant />
    </div>
  );
};

export default Index;
`}</SyntaxHighlighter>
        <p>
          Ainsi, le composant nommé <strong>MonComposant</strong>, se situant
          dans le fichier <strong>MonComposant.jsx</strong> sera affiché à
          l'intérieur d'un élément <span>{'<div>'}</span>.
        </p>
        <p>
          A noter qu'un composant peut s'appeler en tant que balise orpheline{' '}
          <span>{`<MonComposant/>`}</span>, ou en balise classique <br />
          <span>{`<MonComposant></MonComposant>`}</span>
        </p>
      </article>

      <article>
        <h2>Hierarchie</h2>
        <p>
          <strong>Un composant ne s'affiche pas automatiquement</strong>, en
          fait, chaque composant est supposé être{' '}
          <strong>un bout de page autonome</strong> pouvant être affiché ou non,
          une ou plusieurs fois, à l'endroit où on veut.
        </p>
        <p>
          En fait, si on veut afficher un composant, il doit{' '}
          <strong>obligatoirement</strong> être un enfant direct ou indirect du{' '}
          <strong>seul</strong> élément affiché par défaut:{' '}
          <strong>Index.js</strong> (situé à la racine du dossier{' '}
          <strong>src</strong>).
        </p>
        <p>
          Une hiérarchie en arboréscence devrait se créer en partant de ce
          dernier. <br />
          Par exemple:
        </p>
        <img src="/res/react/course_1.png" alt="" />
        <p>App étant la racine (Index.js)</p>
      </article>
      <article>
        <h2>Style</h2>
        <p>Pour rajouter du style à un composant, vous avez deux solutions: </p>
        <h3>
          Importer un fichier <strong>CSS</strong>
        </h3>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import './monComposant.css';`}</SyntaxHighlighter>
        <p></p>
        <h3>
          Ecrire le <strong>CSS</strong> directement sur votre composant
        </h3>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import styled from 'styled-components';

        const MonComposant = () => {
          return <MainContainer>Hello world!</MainContainer>;
        };
        
        const MainContainer = styled.p${'`'} 
          color: #fafafa;
          background: #373737;
        ${'`'};
        
        export default MonComposant;
        `}</SyntaxHighlighter>
        <p>
          Dans les <strong>deux cas</strong> le css en question sera effectif
          sur le composant, ainsi que sur les enfants directs ou indirects de ce
          dernier. <br />
          Dans le cas de style via le module <strong>styled-components</strong>,
          le css doit être écrit en{' '}
          <strong>
            <a
              href="https://sass-lang.com/documentation/"
              style={{ textDecoration: 'underline' }}
            >
              SCSS
            </a>
          </strong>
          .
        </p>
      </article>
    </div>
  );
};

export default Composants;
