import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const StructuresDeContrôle = () => {
  return (
    <div>
      <h1>Structures de contrôle</h1>

      <p>
        Une <strong>structure de contrôle</strong> est une instruction
        particulière ayant pour but de{' '}
        <strong>dévier le flot de contrôle</strong> du programme la contenant
        lorsqu'elle est exécutée.
      </p>
      <p>
        Pour faire simple, une <strong>structure de contrôle</strong> permettra
        d'exécuter des lignes de codes en{' '}
        <strong>sortant du déroulé logique</strong> du script.
      </p>
      <p>
        Les outils qui vont suivre utilisent tous des{' '}
        <strong>conditions</strong> pour fonctionner. Une{' '}
        <strong>condition</strong> est une expression retournant toujours true
        ou false; pour se faire, elles utilisent des opérateurs de comparaison &
        conditions. Ce qui donne quelque chose comme ceci:
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`0 < 5 //Retourne true\n0 < 5 && 0 > 1 //Retourne false\n(1 === 1 || 1 + 2 === 1) && 0 != 1 //Retourne true`}
        </SyntaxHighlighter>
      </p>

      <article>
        <h2>IF ELSE</h2>
        <p>
          La structure <strong>IF</strong> a pour rôle d'exécuter son code
          uniquement si la <strong>condition</strong> qui lui est associée
          retourne <strong>VRAI</strong> (true).
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`//if (CONDITION) {INSTRUCTION}\nif (1 == 1) {\n  console.log('hello')\n  console.log('world!')\n}`}
        </SyntaxHighlighter>

        <p>
          Comme illustré ci-dessus, si il y a plusieurs instructions dans la
          structure de contrôle, alors il faudra délimiter{' '}
          <strong>le début et la fin</strong> de ces dernières à l'aide{' '}
          <strong>d'accolades</strong>. <br />
          Si la structure ne contient qu'
          <strong>une seule et unique instruction</strong>, il est possible de
          s'en passer:{' '}
          <strong>la structure n'exécutera que la ligne suivante</strong>.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`//Deux méthodes:\n//Méthode 1\nif (1 === 1) console.log('hello world!')\n//Méthode 2\nif (1 === 1) \n console.log('hello world!')`}
        </SyntaxHighlighter>
        <p>
          Il est évidemment possible de mettre les accolades dans le cas ou il
          n'y qu'une seule instruction. <br />
          Il est d'ailleurs recommandé de mettre dans accolades dans tous les
          cas pour les débutants, cela éliminant une source d'erreur
          potentielle.
        </p>
      </article>
      <article>
        <h2>Switch</h2>
        <p>
          Une structure Switch s'utilise pour tester une valeur, et adapter le
          code à exécuter en fonction de cette dernière. un switch n'a aucun
          intérêt si la valeur ne peut pas avoir plus de 2 valeurs différentes.{' '}
          <br />
          Le switch joue le même rôle qu'un if mais est visuellement différent,
          il permet surtout une meilleure lecture du coup dans le cas ou la
          variable engendre de nombreux comportements dans le code.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`switch(ma_var) {\n  case 1:\n     console.log("Ma variable vaut 1")\n     break\n  case 2:\n     console.log("Ma variable vaut 2")\n     break\n  case "hello world!":\n     console.log("Ma variable vaut Hello world!")\n     break\n  case false:\n     console.log("Ma variable vaut false")\n     break\n  default:\n     throw "error"\n}`}
        </SyntaxHighlighter>
        <p>Un switch peut tester n'importe quel type de valeur.</p>
      </article>
      <article>
        <h2>While</h2>
        <p>
          Une structure while est une boucle. <br />
          Il existe plusieurs types de boucles, celle-ci est la plus simple dans
          son fonctionnement:{' '}
          <strong>
            tant que sa condition est vraie alors elle répète le code en boucle
          </strong>
          . <br />
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let nombre = 0\nwhile (nombre !== 100) {\n  nombre = nombre + 1\n}\n//Le programme s'arrête après avoir incrémenté de 1 la variable nombre 100 fois.`}
        </SyntaxHighlighter>
        <p>
          <strong>Attention cependant</strong>, si rien n'est prévu pour rendre
          la condition fausse, la boucle sera infinie et le code bloqué.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let nombre = 0\nwhile (nombre !== 100) {\n  nombre + 1 //Cette fois-ci, nombre n'est pas incrément à chaque tour, on calcule simplement la somme de la valeur contenue dans la variable "nombre" et la valeur numérique "1".\n}\n//Comme on ne change pas la valeur de la variable "nombre", la condition de la boucle sera toujours vraie, et la boucle devient infinie.`}
        </SyntaxHighlighter>
        <p>
          Il est donc crucial de <strong>bien formuler la condition</strong> de
          votre boucle, afin qu'elle répète le code le nombre de fois voulu.
        </p>
      </article>
      {/* <article>
        <h2>for</h2>
      </article>
      <article>
        <h2>Do while</h2>
      </article>
      <article>
        <h2>Ternaire</h2>
      </article> */}
    </div>
  );
};

export default StructuresDeContrôle;
