import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Variables = () => {
  return (
    <div>
      <h1>Variables et valeurs</h1>
      <p>
        En PHP, les <strong>variables</strong> sont utilisées pour stocker des
        informations, tandis que les <strong>valeurs</strong> sont les données
        stockées dans ces variables. Les <strong>types de valeurs</strong>{" "}
        déterminent la nature des données stockées dans une variable (par
        exemple, nombre entier, chaîne de caractères, etc.).
      </p>
      <article>
        <h2>Déclaration et affectation des variables</h2>
        <p>
          Pour déclarer une variable en PHP, il suffit d'utiliser le symbole{" "}
          <code>$</code> suivi du nom de la variable. On peut ensuite lui
          affecter une valeur en utilisant l'opérateur d'affectation{" "}
          <code>=</code>.
        </p>
        <h3>Déclaration et affectation d'une variable</h3>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$x = 10; // Déclare la variable $x et lui affecte la valeur 10`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Les constantes en PHP</h2>
        <p>
          Une constante est une valeur qui ne change pas au cours de l'exécution
          du script PHP. Contrairement aux variables, une fois qu'une constante
          est définie, sa valeur ne peut pas être modifiée. Les constantes sont
          souvent utilisées pour stocker des valeurs qui ne changent jamais,
          telles que les paramètres de configuration ou les identifiants de base
          de données.
        </p>

        <h3>Définition d'une constante</h3>
        <p>
          Une constante est définie à l'aide de la fonction{" "}
          <code>define()</code>, qui prend deux arguments : le nom de la
          constante et sa valeur. Il est recommandé d'utiliser des majuscules
          pour le nom des constantes, afin de les différencier des variables.
        </p>

        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`define("MA_CONSTANTE", "valeur"); // Définit la constante MA_CONSTANTE avec la valeur "valeur"`}
        </SyntaxHighlighter>

        <p>
          Une fois définie, une constante peut être utilisée dans le reste du
          script en faisant simplement référence à son nom.
        </p>

        <h3>Accès à une constante</h3>
        <p>
          Pour accéder à une constante, il suffit de faire référence à son nom
          en utilisant la syntaxe suivante :
        </p>

        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`echo MA_CONSTANTE; // Affiche "valeur"`}
        </SyntaxHighlighter>

        <p>
          Il est également possible d'accéder à une constante en utilisant la
          fonction <code>constant()</code>, qui prend le nom de la constante en
          argument et renvoie sa valeur.
        </p>

        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`echo constant("MA_CONSTANTE"); // Affiche "valeur"`}
        </SyntaxHighlighter>

        <h3>Constantes prédéfinies</h3>
        <p>
          PHP possède également de nombreuses constantes prédéfinies, qui sont
          disponibles pour tous les scripts PHP sans qu'il soit nécessaire de
          les définir manuellement. Ces constantes incluent des informations sur
          le serveur, le système d'exploitation, la version de PHP en cours
          d'exécution et d'autres informations utiles.
        </p>

        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`echo PHP_VERSION; // Affiche la version de PHP en cours d'exécution`}
        </SyntaxHighlighter>
      </article>
      <article>
        <h2>Les portées de variables en PHP</h2>
        <p>
          La portée d'une variable en PHP définit l'endroit où la variable peut
          être utilisée dans le code. Les variables en PHP peuvent avoir une
          portée globale ou locale.
        </p>{" "}
        <h3>Portée globale</h3>
        <p>
          Une variable a une portée globale si elle est déclarée en dehors de
          toutes les fonctions ou classes. Les variables globales peuvent être
          utilisées n'importe où dans le script, y compris dans les fonctions ou
          les classes.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$variable_globale = "valeur"; // Variable globale
function exemple() {
  echo $variable_globale; // Affiche "valeur"
  }
  
  exemple();`}
        </SyntaxHighlighter>
        <h3>Portée locale</h3>
        <p>
          Une variable a une portée locale si elle est déclarée à l'intérieur
          d'une fonction ou d'une classe. Les variables locales ne peuvent être
          utilisées que dans la fonction ou la classe où elles sont définies.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`function exemple() {
        $variable_locale = "valeur"; // Variable locale
        echo $variable_locale; // Affiche "valeur"
        }
        
        exemple();
        echo $variable_locale; // Erreur : la variable $variable_locale n'existe pas dans ce contexte`}
        </SyntaxHighlighter>
        <h3>Portée statique</h3>
        <p>
          Une variable a une portée statique si elle est déclarée à l'intérieur
          d'une fonction et conserve sa valeur entre les appels de la fonction.
          Les variables statiques sont souvent utilisées pour compter le nombre
          de fois où une fonction est appelée.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`function exemple() {
        static $compteur = 0; // Variable statique
        $compteur++;
        echo $compteur;
        }
        
        exemple(); // Affiche 1
        exemple(); // Affiche 2
        exemple(); // Affiche 3`}
        </SyntaxHighlighter>
      </article>
    </div>
  );
};

export default Variables;
