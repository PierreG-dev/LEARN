import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const StructuresDeDonnees = () => {
  return (
    <div>
      <h1>Structures de données</h1>
      <p>
        En PHP, il existe plusieurs structures de données pour stocker et
        manipuler des valeurs. Les tableaux sont très utilisés et permettent de
        stocker des valeurs en associant une clé à chaque élément. Les objets
        sont également très utilisés pour encapsuler des données et des
        fonctionnalités dans un même objet.
      </p>

      <article>
        <h2>Tableaux</h2>
        <p>
          Les tableaux en PHP sont des structures de données permettant de
          stocker plusieurs valeurs sous un même nom. Il existe deux types de
          tableaux en PHP : les tableaux numériques et les tableaux associatifs.
        </p>
        <h3>Tableaux numériques</h3>
        <p>
          Les tableaux numériques sont des tableaux dans lesquels chaque élément
          est associé à un index numérique (entier). La première valeur d'un
          tableau numérique est associée à l'index 0, la deuxième à l'index 1,
          etc.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$tableau = array("valeur1", "valeur2", "valeur3");\n// Accès à la première valeur :\necho $tableau[0];\n// Parcours du tableau :\nforeach ($tableau as $valeur) {\n  echo $valeur;\n}`}
        </SyntaxHighlighter>
        <p>
          On peut accéder à chaque élément du tableau en utilisant son index. On
          peut également parcourir le tableau en utilisant la boucle foreach.
        </p>
        <h3>Tableaux associatifs</h3>
        <p>
          Les tableaux associatifs sont des tableaux dans lesquels chaque
          élément est associé à une clé. La clé peut être de n'importe quel type
          (entier, chaîne de caractères, etc.) et doit être unique.
          Contrairement aux tableaux numériques, les éléments d'un tableau
          associatif ne sont pas ordonnés.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$tableau_assoc = array("cle1" => "valeur1", "cle2" => "valeur2", "cle3" => "valeur3");\n// Accès à la première valeur :\necho $tableau_assoc["cle1"];\n// Parcours du tableau :\nforeach ($tableau_assoc as $cle => $valeur) {\n  echo "La valeur associée à la clé ".$cle." est ".$valeur;\n}`}
        </SyntaxHighlighter>
        <p>
          On peut accéder à chaque élément du tableau en utilisant sa clé. On
          peut également parcourir le tableau en utilisant la boucle foreach, en
          récupérant à chaque itération la clé et la valeur associée à cette
          clé.
        </p>
      </article>

      <article>
        <h2>Les objets</h2>
        <p>
          Les objets en PHP sont des instances de classes. Une classe est un
          modèle qui définit les propriétés et les méthodes d'un objet. Pour
          créer un objet, il faut instancier une classe à l'aide du mot-clé{" "}
          <code>new</code>.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`//Définition d'une classe
class Personne {
  public $nom;
  public $age;

public function __construct($nom, $age) {
$this->nom = $nom;
$this->age = $age;
}

public function sePresenter() {
echo "Je m'appelle ".$this->nom." et j'ai ".$this->age." ans.";
}
}

//Instanciation de la classe
$personne = new Personne("Jean", 30);

//Appel d'une méthode de l'objet
$personne->sePresenter();`}
        </SyntaxHighlighter>
        <p>
          Dans cet exemple, la classe <code>Personne</code> a deux propriétés
          publiques <code>$nom</code> et <code>$age</code>, ainsi que deux
          méthodes :<code>__construct()</code> qui permet d'initialiser les
          propriétés de l'objet lors de son instanciation, et{" "}
          <code>sePresenter()</code> qui affiche un message de présentation de
          l'objet. Ensuite, nous créons un objet <code>$personne</code> de la
          classe <code>Personne</code> en passant les arguments "Jean" et 30 au
          constructeur. Enfin, nous appelons la méthode{" "}
          <code>sePresenter()</code> de l'objet pour afficher le message de
          présentation.
        </p>
        <p>
          Les propriétés et les méthodes d'un objet peuvent être publics, privés
          ou protégés :
        </p>
        <ul>
          <li>
            Public : accessibles de partout, aussi bien à l'intérieur qu'à
            l'extérieur de la classe.
          </li>
          <li>Privé : accessibles uniquement à l'intérieur de la classe.</li>
          <li>
            Protégé : accessibles à la fois à l'intérieur de la classe et des
            classes qui en héritent.
          </li>
        </ul>
        <p>
          Il est également possible de créer des classes abstraites, qui ne
          peuvent pas être instanciées directement, et des interfaces, qui
          définissent les méthodes que les classes qui les implémentent doivent
          fournir.
        </p>
      </article>

      <article>
        <h2>Tableaux associatifs</h2>
        <p>
          Les tableaux associatifs sont une structure de données en PHP qui
          permettent de stocker des éléments en utilisant des clés
          personnalisées plutôt que des index numériques. Les tableaux
          associatifs sont définis en utilisant la fonction array() ou en
          utilisant la syntaxe courte []. Les clés des éléments peuvent être de
          n'importe quel type de données, comme une chaîne de caractères, un
          nombre ou un booléen.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$personne = array(
  "nom" => "Dupont",
  "prenom" => "Jean",
  "age" => 25,
  "ville" => "Paris"
);\necho "Le nom de la personne est " . $personne["nom"] . ", son age est de " . $personne["age"] . " ans.";} `}
        </SyntaxHighlighter>
        <p>
          Dans l'exemple ci-dessus, un tableau associatif est créé pour stocker
          les informations d'une personne. Les clés sont les noms des attributs
          et les valeurs sont les valeurs correspondantes. On peut accéder à
          chaque élément en utilisant sa clé en utilisant la syntaxe
          $tableau["clé"].
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$personne["age"] = 26;\necho "La personne a maintenant " . $personne["age"] . " ans.";`}
        </SyntaxHighlighter>
        <p>
          On peut également modifier la valeur d'un élément en utilisant la
          syntaxe $tableau["clé"] = "valeur". Dans l'exemple ci-dessus, l'âge de
          la personne est modifié pour être 26.
        </p>
      </article>
    </div>
  );
};

export default StructuresDeDonnees;
