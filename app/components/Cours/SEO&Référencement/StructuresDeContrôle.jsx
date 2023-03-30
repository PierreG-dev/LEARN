import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const StructuresDeContrôle = () => {
  return (
    <div>
      <h1>Structures de contrôle</h1>
      <p>
        Une <strong>structure de contrôle</strong> est une instruction
        particulière ayant pour but de{" "}
        <strong>dévier le flot de contrôle</strong>
        du programme la contenant lorsqu'elle est exécutée.
      </p>
      <p>
        Pour faire simple, une <strong>structure de contrôle</strong> permettra
        d'exécuter des lignes de code en{" "}
        <strong>sortant du déroulé logique</strong>
        du script.
      </p>
      <p>
        Les outils qui vont suivre utilisent tous des{" "}
        <strong>conditions</strong>
        pour fonctionner. Une <strong>condition</strong> est une expression
        retournant toujours true ou false; pour se faire, elles utilisent des
        opérateurs de comparaison & conditions. Ce qui donne quelque chose comme
        ceci:
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`0 < 5 //Retourne true\n0 < 5 && 0 > 1 //Retourne false\n(1 === 1 || 1 + 2 === 1) && 0 != 1 //Retourne true`}
        </SyntaxHighlighter>
      </p>

      <article>
        <h2>IF ELSE et ELSEIF</h2>
        <p>
          La structure <strong>IF</strong> a pour rôle d'exécuter son code
          uniquement si la <strong>condition</strong> qui lui est associée
          retourne <strong>VRAI</strong> (true). Si cette condition retourne
          faux, alors le programme passe à la condition suivante ou exécute le
          bloc de code prévu pour l'instruction <strong>ELSE</strong> s'il y en
          a une.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`//IF\nif (1 == 1) {\n  echo 'hello';\n  echo 'world!';\n} else {\n  echo 'false';\n}`}
        </SyntaxHighlighter>
        <p>
          Dans l'exemple ci-dessus, si la condition du <strong>if</strong> est
          vérifiée (1 est égal à 1), alors les instructions contenues dans le
          bloc de code du <strong>if</strong> seront exécutées (afficher "hello"
          et "world!"). Si la condition n'est pas vérifiée, alors le bloc de
          code de l'instruction <strong>else</strong> sera exécuté (afficher
          "false").
        </p>
        <p>
          Il est également possible d'avoir plusieurs conditions à vérifier à
          l'aide de l'instruction <strong>elseif</strong>.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`//IF ELSEIF\nif (1 == 1) {\n  echo 'hello';\n  echo 'world!';\n} elseif (2 == 2) {\n  echo 'two';\n} else {\n  echo 'false';\n}`}
        </SyntaxHighlighter>
        <p>
          Dans cet exemple, si la première condition du <strong>if</strong> est
          vérifiée (1 est égal à 1), alors les instructions contenues dans le
          bloc de code du <strong>if</strong> seront exécutées (afficher "hello"
          et "world!"). Si la première condition n'est pas vérifiée, alors la
          condition suivante de l'instruction <strong>elseif</strong> est
          vérifiée (2 est égal à 2), et les instructions contenues dans le bloc
          de code de l'instruction <strong>elseif</strong> seront exécutées
          (afficher "two"). Si aucune des conditions n'est vérifiée, alors le
          bloc de code de l'instruction <strong>else</strong> sera exécuté
          (afficher "false").
        </p>
        <p>
          Comme pour l'instruction <strong>if</strong>, si une instruction{" "}
          <strong>else</strong> ou <strong>elseif</strong> contient plusieurs
          instructions, il faudra délimiter le début et la fin de ces dernières
          à l'aide d'accolades. Si elle ne contient qu'une seule et unique
          instruction, il est possible de s'en passer.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`//IF ELSEIF avec instruction unique\nif (1 == 1) echo 'hello world!';\nelseif (2 == 2) echo 'two';\nelse echo 'false';`}
        </SyntaxHighlighter>
      </article>

      <article>
        <h2>Switch</h2>
        <p>
          La structure switch s'utilise pour tester une valeur et adapter le
          code à exécuter en fonction de cette dernière. Un switch n'a aucun
          intérêt si la valeur ne peut pas avoir plus de 2 valeurs différentes.{" "}
          <br />
          Le switch joue le même rôle qu'un if mais est visuellement différent,
          il permet surtout une meilleure lecture du code dans le cas où la
          variable engendre de nombreux comportements dans le code.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`switch(ma_var) {\n  case 1:\n     echo "Ma variable vaut 1";\n     break;\n  case 2:\n     echo "Ma variable vaut 2";\n     break;\n  case "hello world!":\n     echo "Ma variable vaut Hello world!";\n     break;\n  case false:\n     echo "Ma variable vaut false";\n     break;\n  default:\n     throw new Exception("error");\n}`}
        </SyntaxHighlighter>
        <p>
          Un switch peut tester n'importe quel type de valeur. Le mot-clé{" "}
          <strong>break</strong> est utilisé pour sortir de la structure switch
          une fois le cas correspondant trouvé. Si aucun cas ne correspond, le
          code situé dans le bloc
          <strong>default</strong> est exécuté.
        </p>
      </article>

      <article>
        <h2>While</h2>
        <p>
          La structure while est une boucle. Il existe plusieurs types de
          boucles, celle-ci est la plus simple dans son fonctionnement :{" "}
          <strong>
            tant que sa condition est vraie alors elle répète le code en boucle
          </strong>
          . <br />
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$nombre = 0;\nwhile ($nombre !== 100) {\n  $nombre++;\n}\n//Le programme s'arrête après avoir incrémenté de 1 la variable nombre 100 fois.`}
        </SyntaxHighlighter>
        <p>
          <strong>Attention cependant</strong>, si rien n'est prévu pour rendre
          la condition fausse, la boucle sera infinie et le code bloqué.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$nombre = 0;\nwhile ($nombre !== 100) {\n  $nombre + 1; //Cette fois-ci, nombre n'est pas incrémenté à chaque tour, on calcule simplement la somme de la valeur contenue dans la variable "nombre" et la valeur numérique "1".\n}\n//Comme on ne change pas la valeur de la variable "nombre", la condition de la boucle sera toujours vraie, et la boucle devient infinie.`}
        </SyntaxHighlighter>
        <p>
          Il est donc crucial de <strong>bien formuler la condition</strong> de
          votre boucle, afin qu'elle répète le code le nombre de fois voulu.
        </p>
      </article>

      <article>
        <h2>For</h2>
        <p>
          La structure <strong>for</strong> permet de réaliser une boucle en
          précisant la valeur de départ, la condition d'arrêt et l'incrément à
          chaque tour de boucle.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`for ($i = 0; $i < 10; $i++) {\n  echo $i;\n}`}
        </SyntaxHighlighter>
        <p>
          Dans l'exemple ci-dessus, la boucle commencera à zéro et s'arrêtera
          tant que la variable $i ne sera pas supérieure ou égale à 10. À chaque
          tour de boucle, la variable $i sera incrémentée de 1.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`for ($i = 0; $i < 10; $i = $i + 2) {\n  echo $i;\n}`}
        </SyntaxHighlighter>
        <p>
          Dans cet exemple, la boucle commencera à zéro et s'arrêtera tant que
          la variable $i ne sera pas supérieure ou égale à 10. À chaque tour de
          boucle, la variable $i sera incrémentée de 2.
        </p>
        <p>
          La structure <strong>for</strong> est très utile lorsque vous avez
          besoin de répéter une action un nombre précis de fois.
        </p>
      </article>

      <article>
        <h2>Do While</h2>
        <p>
          La structure <strong>do while</strong> est une boucle similaire à la
          boucle <strong>while</strong>, à la différence près qu'elle exécute le
          bloc de code <strong>au moins une fois</strong>, avant de vérifier la
          condition. <br />
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$nombre = 0;\ndo {\n  $nombre++;\n} while ($nombre < 10);\n//Le programme s'arrête après avoir incrémenté de 1 la variable nombre 10 fois.`}
        </SyntaxHighlighter>
        <p>
          La boucle <strong>do while</strong> est utile dans les cas où l'on
          souhaite exécuter un bloc de code au moins une fois, même si la
          condition est initialement fausse.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$nombre = 10;\ndo {\n  $nombre++;\n} while ($nombre < 10);\n//Le programme exécute le bloc de code une première fois, avant de s'arrêter car la condition n'est pas vérifiée.`}
        </SyntaxHighlighter>
        <p>
          Il est important de noter que dans la boucle <strong>do while</strong>
          , le bloc de code est exécuté avant la vérification de la condition.
          Cette structure est donc particulièrement utile lorsque l'on souhaite
          exécuter une boucle au moins une fois, puis vérifier si la condition
          est vérifiée pour continuer ou non l'exécution de la boucle.
        </p>
      </article>

      <article>
        <h2>Foreach</h2>
        <p>
          La structure foreach est une boucle spécialement conçue pour parcourir
          des tableaux. Elle permet de parcourir l'ensemble des éléments d'un
          tableau sans avoir à se soucier de la taille de ce dernier.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$tableau = array("apple", "banana", "orange");\nforeach ($tableau as $fruit) {\n  echo $fruit;\n}`}
        </SyntaxHighlighter>
        <p>
          Ici, la boucle foreach parcourt chaque élément du tableau $tableau, et
          stocke la valeur de chaque élément dans la variable $fruit à chaque
          itération. On peut ensuite utiliser cette variable pour afficher
          chaque élément du tableau.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$tableau_assoc = array("apple" => "pomme", "banana" => "banane", "orange" => "orange");\nforeach ($tableau_assoc as $fr_en => $fr_fr) {\n  echo "En anglais, ".$fr_en." se traduit par ".$fr_fr;\n}`}
        </SyntaxHighlighter>
        <p>
          On peut également utiliser foreach pour parcourir des tableaux
          associatifs, en récupérant à chaque itération la clé et la valeur
          associée à cette clé.
        </p>
      </article>
    </div>
  );
};

export default StructuresDeContrôle;
