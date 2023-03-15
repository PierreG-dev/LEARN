import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CyclesDeVie = () => {
  return (
    <div>
      <h1>Le cycle de vie d'un composant</h1>
      <article>
        <h2>Mount</h2>
        <p>
          L'étape <strong>MOUNT</strong> d'un composant, est l'étape de création
          de ce dernier. <br />
          L'évènement à lieu précisément lorsque le composant a fini de charger
          toutes ses ressources et est sur le point de s'afficher.
        </p>
        <p>
          Il est possible de donner à React des instruction qui devront se
          lancer lors du <strong>MOUNT</strong>, pour se faire:{' '}
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`const fonctionMount = () => {
    console.log("Je viens d'être créé");
  };

  useEffect(fonctionMount, []);`}
        </SyntaxHighlighter>
        <p>
          Ci dessus, je dis à React de lancer la fonction{' '}
          <span>fonctionMount</span> lorsque le composant de créé.
        </p>
      </article>
      <article>
        <h2>Update</h2>
        <p>
          L'étape <strong>UPDATE</strong> d'un composant, est l'étape la plus
          fréquente d'un composant. <br />
          Elle est l'étape concernant les re-render, lorsque par exemple un
          <strong>state</strong> change de valeur et le composant se remet à
          jour entièrement (affichage compris) avec les nouvelles valeurs.
        </p>
        <p>
          Par défaut, cette étape n'existe pas. Elle est toujours la conséquence
          d'un <strong>state</strong> du composant, ou d'un{' '}
          <strong>state</strong> d'un parent (direct ou indirect). Les{' '}
          <strong>contexts</strong> peuvent aussi engendrer un{' '}
          <strong>UPDATE</strong> si ils sont utilisés dans le composant ou dans
          un parent de ce dernier.
        </p>
        <p>
          On peut donner des instruction à React qui devront se lancer à chaque{' '}
          <strong>UPDATE</strong>:
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`const fonctionUpdate = () => {
    console.log('Un update à eu lieu');

    return () => {
      console.log('Un update va avoir lieu');
    };
  };

  useEffect(fonctionUpdate);`}
        </SyntaxHighlighter>
        <p>
          Dans l'exemple ci-dessus, on observe deux choses: <br /> - Le contenu
          du useEffect qui se lance après l'évènement <br /> - Le contenu du
          return qui se lance juste avant l'évènement
        </p>
        <p>
          On peut également donner des instruction en fonction d'UPDATES bien
          spécifiques:
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`const fonctionUpdate = () => {
    console.log('Un update à eu lieu à cause de monState ou un props');

    return () => {
      console.log('Un update va avoir lieu à cause de monState ou un props');
    };
  };

  useEffect(fonctionUpdate, [monState, props]);`}
        </SyntaxHighlighter>
        <p>
          Dans l'exemple ci-dessus, on observe deux choses: <br /> - Le contenu
          du useEffect qui se lance après le changement de monState ou des props{' '}
          <br /> - Le contenu du return qui se lance juste avant le changement
          de monState ou des props
        </p>
        <p>
          Le tableau de dépendances (2e paramètre) décidera des variables qui
          seront surveillées par le useEffect.
        </p>
      </article>
      <article>
        <h2>Unmount</h2>
        <p>
          L'étape <strong>UNMOUNT</strong> d'un composant, est l'étape de
          destruction de ce dernier. <br />
          L'évènement à lieu précisément lorsque le composant est sur le point
          d'être détruit, c'est à dire lorsqu'il était affiché, et que les
          conditions qui faisaient qu'il était affiché ne sont plus remplies.
        </p>
        <p>
          Il est possible de donner à React des instruction qui devront se
          lancer lors de l'<strong>UNMOUT</strong>, pour se faire:{' '}
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`const fonctionUnmount = () => {
    return () => {
      console.log("Le composant s'apprète à être détruit");
    };
  };

  useEffect(fonctionUnmount, []);`}
        </SyntaxHighlighter>
        <p>
          Ci dessus, je dis à React de lancer la fonction{' '}
          <span>fonctionUnmount</span>, qui s'exécutera juste avant la
          destruction du composant. <br /> Vous l'aurez compris, il est possible
          d'indiquer la procédure à suivre en cas de destruction grâce au return
          d'un useEffect avec un tableau de dépendances vide.
        </p>
        <p>
          Il est important de fonctionnalitées asynchrones qui tournent en
          arrière plan telles que setInterval, setTimout ou encore
          addEventListener pour éviter qu'ils restent inutilement après la
          destruction du composant.
        </p>
      </article>
    </div>
  );
};

export default CyclesDeVie;
