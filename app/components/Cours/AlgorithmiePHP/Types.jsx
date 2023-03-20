import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Types = () => {
  return (
    <div>
      <h1 className="text-center">Types de données</h1>
      <article>
        <h2>Un type ?</h2>
        <p>
          JavaScript est un langage dont le typage est{" "}
          <strong>faible et dynamique</strong>. Cela signifie qu'il n'est pas
          nécessaire de déclarer le type d'une variable avant de l'utiliser. Le
          type de la variable sera automatiquement déterminé lorsque le
          programme sera exécuté. Cela signifie également que la même variable
          pourra avoir différents types au cours de son existence :
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let toto = 42;     // toto est un nombre\ntoto = 'truc'; // toto est désormais une chaîne de caractères\ntoto = true;   // toto est désormais un booléen`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Le type Booléen</h2>
        <p>
          Un booléen représente le résultat d'une{" "}
          <strong>assertion logique</strong> et peut avoir deux valeurs : {""}
          <strong>true</strong> (pour le vrai logique) et <strong>false</strong>{" "}
          (pour le faux logique).
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let bool = true //Vrai\nbool = false //Faux\nconsole.log(!bool) //Affiche vrai`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Le type Number</h2>
        <p>
          Le type Number sert à représenter les valeurs numériques. Il est
          possible d'utiliser des nombres entiers, comme des nombres flottants
          (nombre à virgule). Cependant le nombre pouvant être représenté se
          place entre <span>2^-1074</span> et <span>2^1074</span>, mais le
          programme convertira votre donnée en <span>+Infinity</span> ou{" "}
          <span>-Infinity</span> si il n'est pas entre <span>-(2^53 − 1)</span>{" "}
          et <span>2^53 − 1</span>.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let nb = 8 //Entier\nnb = 8.943 //Flottant`}
        </SyntaxHighlighter>
        <p>
          Vous pouvez tout de même utiliser des valeurs qui vont au delà des
          limites mentionnées ci-dessus, grâce au type <strong>BigInt</strong>.
        </p>
        <p>
          Attention, un élément du type <strong>BigInt</strong> ne sera pas
          strictement égal <span>===</span> à un nombre classique, seul
          l'égalité simple <span>==</span> fonctionnera.
        </p>
      </article>
      <article>
        <h2>Le type chaîne de caractères</h2>
        <p>
          Ce type JavaScript est utilisé afin de représenter des données de
          texte. Chaque élément occupe une position au sein de cette chaîne de
          caractères. Le premier élément est situé à l'indice 0, le deuxième à
          l'indice 1 et ainsi de suite. La longueur d'une chaîne de caractères
          correspond au nombre d'éléments qu'elle contient.
        </p>
        <p>
          À la différence d'autres langages (comme le C), les chaînes de
          caractères JavaScript sont immuables. Cela signifie qu'une fois une
          chaîne créée, il est impossible de la modifier.
        </p>
        <p>
          En revanche, il est toujours possible de créer une autre chaîne basée
          sur la première grâce à des opérations. Par exemple :
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`const str = 'Hello world!'\nconsole.log(str.substr(1, 4)); //Affichera "ello"\nconsole.log(str + " toto")// Affichera "Hello world! toto`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Les tableaux</h2>
        <p>
          Le type Array permet de gérer des données mixtes, en les stockant de
          manière ordonnée dans un tableau, où chaque élément possède un indice
          (sa position) permettant de récupérer ce dernier.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let tab = [8, 9, 3, 56]\nconsole.log(tab[0]) //Affichera 8\nconsole.log(tab[1] + tab[3]) //Affichera 65`}
        </SyntaxHighlighter>
        <p>
          Il est possible de récupérer la longueur d'un tableau grâce à sa
          propriété <span>length</span>:
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let tab = [8, 9, 3, 56]\nconsole.log(tab.length) //Affichera 4`}
        </SyntaxHighlighter>
        <p>
          Attention cependant, un tableau est considéré comme un objet par le
          language. ce qui signifie que l'opérateur <span>typeof</span> renverra{" "}
          <span>"object"</span> et non pas <span>"array"</span>. Si vous voulez
          tester le type d'une variable tableau, il faudra utiliser la fonction{" "}
          <span>isArray</span> de la classe <span>Array</span>.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let tab = [8, 9, 3, 56]\nlet nb = 5\nconsole.log(Array.isArray(tab)) //Affichera true\nconsole.log(Array.isArray(nb)) //Affichera false`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Les Objets</h2>
        <p>
          En informatique, un objet est une valeur conservée en mémoire à
          laquelle on fait référence grâce à un identifiant.
        </p>
        <p>
          Un objet JavaScript est un ensemble de correspondances entre des clés
          et des valeurs. Les clés sont représentées par des chaînes de
          caractères. Les valeurs peuvent être de n'importe quel type.
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let voiture = {\n  couleur: 'rouge',\n  modele: 'model S',\n  marque: 'TESLA',\n  kilometrage: 10000\n}\n\nconsole.log(voiture.marque + voiture.modele) //Affichera 'TESLA model S'`}
        </SyntaxHighlighter>
        <p>
          Même si cela parait contre-intuitif, la valeur passée à une clé dans
          un objet peut etre de tous types, exactement comme pour une variable
          (cela incluant les tableaux, fonctions, objets... etc.)
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {`let monObj = {\n  maFonction: () => console.log('Hello world!'),\n  monTab: [4, 9, 10],\n  maStr: 'Hello world!',\n  monNbr: 10000,\n  monBool: true,\n  monObj2: {toto: 'tata}\n}\nmonObj.maFonction() //Affichera Hello world! dans la console.\nconsole.log(monObj.monTab[2]) //Affichera 10 dans la console`}
        </SyntaxHighlighter>
      </article>
    </div>
  );
};

export default Types;
