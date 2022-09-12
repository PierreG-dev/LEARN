import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Variables = () => {
  return (
    <article>
      <h1 className="text-center">Variables</h1>
      <p>
        <strong>
          En JavaScript, une variable est un conteneur qui va nous permettre de
          stocker des informations.
        </strong>
      </p>
      <p>
        {' '}
        Elles ne servent qu'à stocker temporairement des informations. En effet,
        elles n'existent que durant l'exécution du code JS ; elles ne persistent
        pas dans le temps. Si l'on souhaite sauvegarder durablement des
        informations, il faut se tourner vers une autre méthode : base de
        données, fichiers, cookies par exemple.{' '}
      </p>
      <p>
        Cependant, la valeur d'une variable peut évoluer au fil de l'exécution
        d'un code JS. Il faut bien distinguer les deux termes : la variable et
        la valeur. Si on souhaite faire une métaphore, on peut prendre un
        conteneur de marchandises. Le conteneur correspond à la variable et la
        valeur correspond au contenu du conteneur.
      </p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`let maVariable = "Hello world"\n//     Variable             Valeur`}
      </SyntaxHighlighter>
      <h2>Pourquoi faire ?</h2>
      <p>
        Comme dans tous les langages de programmation, les variables font partie
        des fondements. Il est essentiel de pouvoir stocker et manipuler des
        variables pour développer les scripts JavaScript. Les futures
        instructions que nous écrirons en JS feront évoluer des variables pour
        répondre au besoin initial. Vous comprendrez mieux l'intérêt des
        variables quand nous commencerons réellement à écrire des scripts.
      </p>
      <h2>Créer une variable en JavaScript</h2>
      <p>
        Comme énoncé précédemment, une variable nous permet de stocker
        temporairement des informations. Chaque variable est identifiée au sein
        du code JS par un nom unique. Cela permet de les distinguer les unes des
        autres et de les utiliser sans problèmes.
      </p>
      <span>On déclare une variable comme suivant:</span>
      <SyntaxHighlighter language={'javascript'} style={vscDarkPlus}>
        {'let maVariable = "Hello world!'}
      </SyntaxHighlighter>
      <p>
        Dans cet exemple, je déclare une variable nommée 'a' qui contient la
        valeur 0. Evidemment une variable ne peut pas avoir n'importe quel nom.
      </p>
      <ul>
        <li>Utiliser le mot-clé let avant chaque nom de variable</li>
        <li>
          Le nom d’une variable doit obligatoirement commencer par une lettre ou
          un underscore (_){' '}
        </li>
        <li>
          {' '}
          Le nom ne doit pas contenir d'espace, ni de caractère spécial (-, !,
          %, etc.) hormis le _ (underscore){' '}
        </li>
      </ul>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`let boite; // ✔\nlet 2eBoite; //❌\nlet ma boite; //❌\nlet ma_boite; // ✔\nlet maBoite; // ✔`}
      </SyntaxHighlighter>
      <h2>Modifier la valeur d'une variable</h2>
      <p>
        La valeur d'une variable peut être destinée à changer afin de servir le
        but de l'algorithme. Pas de panique, il est totalement possible de
        réassigner une nouvelle valeur à vos variables déclarées via le mot-clef{' '}
        <span>let</span> (Nous reviendrons plus tard sur l'importance de bien
        choisir le mot-clef de la déclaration).
      </p>
      <p>
        Que ce soit pour la première affectation de valeur ou pour une
        réaffectation plus tardive, il faut toujours utiliser{' '}
        <strong>
          l'opérateur d'affectation <span>=</span>
        </strong>
        . On rappelle que le mot-clef de déclaration (par exemple{' '}
        <span>let</span>) ne doit être utilisé que lors de la première
        utilisation de la variable.
      </p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`maVariable = "World hello!" //On affecte une nouvelle valeur à la variable maVariable`}
      </SyntaxHighlighter>
      <p>
        Gardez bien en tête que lorsque on utilise l'opérateur <span>=</span>{' '}
        pour réaffecter une variable avec une nouvelle valeur, l'ancienne valeur
        est écrasée par la nouvelle, et est donc{' '}
        <strong>
          <u>définitivement perdue</u>
        </strong>
        .
      </p>
      <h2>Lecture de la valeur d'une variable</h2>
      <strong>
        Nous avons appris à stocker des données dans nos variables, il est
        maintenant temps de s'en servir !
      </strong>
      <p>
        Pour utiliser la valeur d'une variable, il nous faut évidemment un
        contexte. Imaginons que nous voulions afficher dans la console du
        navigateur la valeur de notre variable en y rajoutant 2:
      </p>
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers
      >
        {`let maVariable = 10 //On affecte la valeur 10 à la variable fraichement créée "maVariable"\nconsole.log(maVariable) //On affiche le contenu de la variable "maVariable"\nconsole.log(maVariable + 2) //On affiche le résultat de l'addition entre la valeur 2 et le contenu de la variable "maVariable"        `}
      </SyntaxHighlighter>
      <p>
        Nous voyons donc que l'utilisation de notre variable se fait d'une
        manière très simple: il suffit de placer notre variable comme si l'on
        plaçait une valeur (ici dans une addition), et la valeur se trouvant à
        l'intérieur viendra prendre sa place afin d'accomplir l'opération.
      </p>
      <h2>Portée des variables</h2>
      <p>
        La portée d'une variable est décidée par l'endroit dans lequel elle est{' '}
        <strong>déclarée</strong> et avec quel <strong>mot-clef</strong>.
      </p>
      <h3>let</h3>
      <p>
        L'instruction <span>let</span> permet de déclarer une variable dont la
        portée est celle du bloc courant, éventuellement en initialisant sa
        valeur.
      </p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {'let x \nlet x = 2'}
      </SyntaxHighlighter>
      <p>Il est possible de déclarer plusieures variables en même temps</p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {'let x, y, z'}
      </SyntaxHighlighter>
      <h3>const</h3>
      <p>
        La déclaration const permet de créer une constante nommée accessible
        uniquement en lecture. Cela ne signifie pas que la valeur contenue est
        immuable, uniquement que l'identifiant ne peut pas être réaffecté.
        Autrement dit la valeur d'une constante ne peut pas être modifiée par
        des réaffectations ultérieures. Une constante ne peut pas être déclarée
        à nouveau.
      </p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`// Généralement, par convention, les\n// constantes sont en majuscules\nconst MA_FAV = 7;\n// Cette réaffectation lèvera une exception TypeError\nMA_FAV = 20;\n// affichera 7\nconsole.log("mon nombre favori est : " + MA_FAV)`}
      </SyntaxHighlighter>
      <p>
        Au delà de simplement empêcher la réaffectation de valeurs, la mot-clef{' '}
        <span>const</span> lancera une erreur dans la console si une tentative
        de modification de valeur a lieu.
      </p>
    </article>
  );
};

export default Variables;
