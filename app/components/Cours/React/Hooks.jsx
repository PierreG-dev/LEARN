import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Hooks = () => {
  return (
    <div>
      <h1>Hooks</h1>
      <p>
        Les hooks sont des fonctionnalités de React importables depuis la
        librairie <strong>react</strong> directement. <br />
      </p>

      <article>
        <h2>useState</h2>
        <p>
          Un state, ou <strong>variable d'état</strong>, est une variable dont
          le contenu est considérée essentiel pour le rendu du composant dans
          lequel elle est déclarée.
        </p>
        <p>
          En effet, lorsque la valeur d'une variable d'état change, le composant
          dans lequel elle se trouve est entièrement re-rendu (affichage
          compris). <br />
          <em>
            A noter que les enfants de ce dernier seront aussi rendus à nouveau.
          </em>
        </p>
        <p>Un state se déclare comme ceci:</p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`const [monState, setMonState] = useState('[VALEUR_PAR_DEFAUT]');`}</SyntaxHighlighter>
        <ul>
          On déclare un tableau contenant deux éléments:{' '}
          <li>
            La variable de lecture du state (ici{' '}
            <strong>
              <em>monState</em>
            </strong>
            )
          </li>
          <li>
            La variable d'écriture du state (ici{' '}
            <strong>
              <em>setMonState</em>
            </strong>
            )
          </li>
        </ul>

        <p>Voici un exemple d'utilisation:</p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import { useState } from 'react';

const MonComposant = () => {
  const [monState, setMonState] = useState(Math.floor(Math.random() * 10));

  const stateUpdate = () => {
    setMonState(Math.floor(Math.random() * 100));
  };

  return <h1 onMouseEnter={stateUpdate}>{monState}</h1>;
};

export default MonComposant;
`}</SyntaxHighlighter>

        <p>
          Ci dessus se trouve un composant contenant une balise h1, qui, lorsque
          survolée va générer un nombre aléatoire compris entre 1 et 10. <br />
          Ce nombre est ensuite stocké dans la variable d'état nommée{' '}
          <strong>monState</strong>. <br />
          Le changement de valeur de cette dernière, entrainera donc le rendu du
          composant <strong>MonComposant</strong>, ainsi, la nouvelle valeur
          générée sera mise à jour automatiquement.
        </p>

        <p></p>

        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
        >{`import { useState } from 'react';

const MonComposant = () => {
  const [monState, setMonState] = useState(Math.floor(Math.random() * 10));

  const stateUpdate = () => {
    setMonState((previousState) => previousState + 5);
  };

  return <h1 onMouseEnter={stateUpdate}>{monState}</h1>;
};

export default MonComposant;
`}</SyntaxHighlighter>
        <p>
          Ici, on cherche à rajouter à l'ancienne valeur du state{' '}
          <strong>monState</strong> 5, plutôt que de l'écraser. <br />
          On va donc utiliser une fonction retournant la nouvelle valeur à
          l'intérieur de la fonction d'écriture, ce qui nous donne accès à
          l'ancien état au travers d'un paramètre.
          <br />
          On retourne donc l'ancien état auquel on rajoute 5.
        </p>
      </article>
    </div>
  );
};

export default Hooks;
