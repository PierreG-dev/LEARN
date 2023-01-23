import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Props = () => {
  return (
    <div>
      <h1>Les props</h1>
      <article>
        <h2>Modularité</h2>
        <p>
          Un composant React est réutilisable autant de fois que nécessaire,
          mais voilà:{' '}
          <strong>
            Quel intérêt d'utiliser plusieurs fois un composant qui renvoie
            exactement la même chose ?
          </strong>
          En effet, toute cette complexité n'aurait pas grand intérêt sans la
          possibiliter d'altérer le contenu des composants sans les réécrire.
        </p>
        <p>
          Vous l'aurez compris, comme une fonction, un composant React va avoir
          ses propres paramètres, qui devront jouer un rôle dans le rendu final
          de ce dernier.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import styled from 'styled-components';

const MonComposant = (props) => {
  return (
    <MainContainer style={{ color: props.color, background: props.background }}>
      {props.content}
    </MainContainer>
  );
};

const MainContainer = styled.p${'`'}
  color: #fafafa;
  background: #373737;
${'`'};

export default MonComposant;
`}</SyntaxHighlighter>
        <p>
          Le composant ci dessus, par exemple, décidera de sa couleur de police,
          couleur de background, et texte affiché en fonctiondes valeurs qui lui
          sont passées en props. <br />
          les valeurs attendues portent respectivement les noms color,
          background et content.
        </p>
        <p>Je peux maintenant afficher mon composant comme ceci:</p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import styled from 'styled-components';
import MonComposant from './MonComposant';

const Index = () => {
  return (
    <MainContainer>
      <MonComposant
        color="white"
        background="#373737"
        content="lorem ipsum dolor sit amet."
      />
    </MainContainer>
  );
};

const MainContainer = styled.p${'``'};

export default Index;
`}</SyntaxHighlighter>
      </article>
      <article>
        <h2>Children</h2>
        <p>
          Il existe un props que tous les composants reçoivent par défaut, il
          s'agit du props <strong>children</strong>. <br />
          Il symbolise le potentiel contenu "enfant" qui sera passé entre la
          balise ouvrante et la balise fermante du composant.
        </p>
        Lors de l'appel:
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import styled from 'styled-components';
import MonComposant from './MonComposant';

const Index = () => {
  return (
    <MainContainer>
      <MonComposant>
        <div>
          <h2>LOREM</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero,
            maxime.
          </p>
        </div>
      </MonComposant>
    </MainContainer>
  );
};

const MainContainer = styled.p${'``'};

export default Index;
`}</SyntaxHighlighter>
        <p>
          Pour que les balises enfants figurent dans le rendu de ce dernier,
          elles devront être précisées dans son retour.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import styled from 'styled-components';

        const Index = (props) => {
          return <MainContainer>{props.children}</MainContainer>;
        };
        
        const MainContainer = styled.p${'`'}
          color: #fafafa;
          background: #373737;
        ${'`'};
        
        export default Index;
        `}</SyntaxHighlighter>
      </article>
    </div>
  );
};

export default Props;
