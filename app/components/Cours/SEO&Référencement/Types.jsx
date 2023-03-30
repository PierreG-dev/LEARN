import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Types = () => {
  return (
    <div>
      <h1 className="text-center">Types de données</h1>

      <article>
        <h2>Un type ?</h2>
        <p>
          Les types de données en PHP sont des concepts fondamentaux pour
          comprendre comment fonctionne ce langage de programmation. En effet,
          chaque donnée stockée dans une variable, une constante ou une
          expression a un type spécifique qui détermine sa structure, son
          comportement et les opérations qui peuvent être effectuées sur elle.
          Dans ce cours, nous allons passer en revue les différents types de
          données en PHP et leurs caractéristiques.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`
    <?php
        $toto = 42; // toto est un nombre
        $toto = 'truc'; // toto est désormais une chaîne de caractères
        $toto = true; // toto est désormais un booléen
    ?>`}
        </SyntaxHighlighter>
      </article>

      <article>
        <h2>Le type entier en PHP</h2>
        <p>
          En PHP, un entier est une valeur numérique entière, c'est-à-dire un
          nombre sans décimales. Les entiers peuvent être positifs ou négatifs,
          et sont définis en utilisant la syntaxe suivante :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 42; // Un entier positif
$b = -15; // Un entier négatif`}
        </SyntaxHighlighter>
        <p>
          Les opérations arithmétiques de base (addition, soustraction,
          multiplication, division et modulo) peuvent être effectuées sur les
          entiers en utilisant les opérateurs correspondants :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 5 + 3; // Addition : $a vaut 8
$b = 5 - 3; // Soustraction : $b vaut 2
$c = 5 * 3; // Multiplication : $c vaut 15
$d = 5 / 3; // Division : $d vaut environ 1.6667
$e = 5 % 3; // Modulo : $e vaut 2 (le reste de la division de 5 par 3)`}
        </SyntaxHighlighter>
        <p>
          Les opérations d'incrémentation et de décrémentation peuvent également
          être effectuées sur les entiers en utilisant les opérateurs
          <code>++</code> et <code>--</code> :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 5;
$a++; // Incrémente $a de 1 : $a vaut 6
$a--; // Décrémente $a de 1 : $a vaut 5`}
        </SyntaxHighlighter>
        <p>
          Il est important de noter que les entiers en PHP sont automatiquement
          convertis en nombres à virgule flottante (float) si le résultat d'une
          opération arithmétique produit un nombre à virgule flottante. Par
          exemple :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 5 / 2; // $a vaut 2.5`}
        </SyntaxHighlighter>
      </article>

      <article>
        <h2>Nombres à virgule flottante (float)</h2>
        <p>
          Les nombres à virgule flottante, ou nombres décimaux, sont des nombres
          qui ont une partie fractionnaire, séparée de la partie entière par un
          point (« . » en anglais). En PHP, on utilise le type
          <code>float</code> ou <code>double</code> pour représenter ces
          nombres.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 3.14;
$b = -2.5;`}
        </SyntaxHighlighter>
        <p>
          Les opérations arithmétiques sont également possibles avec les nombres
          à virgule flottante :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$c = $a + $b; // Addition
$d = $a * $b; // Multiplication`}
        </SyntaxHighlighter>
        <p>
          Il est important de noter que les nombres à virgule flottante peuvent
          subir des erreurs d'arrondi, en particulier lorsqu'on effectue des
          opérations avec eux. Par exemple :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = 0.1;
$b = 0.2;
$c = $a + $b;
echo $c; // Affiche 0.30000000000000004`}
        </SyntaxHighlighter>
        <p>
          Dans cet exemple, la valeur affichée n'est pas exactement égale à 0.3,
          en raison d'une erreur d'arrondi liée à la représentation interne des
          nombres à virgule flottante.
        </p>
      </article>

      <article>
        <h2>Chaînes de caractères (strings)</h2>
        <p>
          Les chaînes de caractères sont des séquences de caractères. En PHP,
          les chaînes de caractères sont délimitées par des guillemets simples
          (') ou des guillemets doubles ("). Il est important de noter que les
          guillemets doubles permettent l'interpolation de variables,
          c'est-à-dire que la valeur de la variable est insérée dans la chaîne
          de caractères.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$str1 = 'Bonjour';
$str2 = "le monde";
$str3 = "Je m'appelle $nom"; // $nom est une variable qui contient une chaîne de caractères`}
        </SyntaxHighlighter>
        <p>
          Les chaînes de caractères peuvent être concaténées à l'aide de
          l'opérateur de concaténation (.) :
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$str4 = $str1 . ' ' . $str2; // Concaténation de deux chaînes de caractères`}
        </SyntaxHighlighter>
        <p>
          Les chaînes de caractères sont souvent utilisées pour stocker des
          données de texte telles que des noms, des adresses, des descriptions,
          etc.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$nom = 'Jean Dupont';
$adresse = '12 rue des Lilas';
$description = "Je suis une personne passionnée par l'informatique et la programmation."`}
        </SyntaxHighlighter>
      </article>

      <article>
        <h2>Booléens en PHP</h2>
        <p>
          Les booléens sont des valeurs logiques qui représentent soit
          <code>true</code> (vrai) soit <code>false</code> (faux). En PHP, les
          valeurs <code>true</code> et <code>false</code> sont représentées par
          les mots-clés respectifs <code>true</code> et <code>false</code>.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = true;
$b = false;`}
        </SyntaxHighlighter>
        <p>
          Les booléens sont souvent utilisés pour contrôler le flux d'exécution
          d'un script. Par exemple, ils sont utilisés dans les structures de
          contrôle comme <code>if</code> et <code>while</code>.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`if ($a == true) {
  // Code à exécuter si $a est vrai
}

while ($b == false) {
// Code à exécuter tant que $b est faux
}`}
        </SyntaxHighlighter>
      </article>

      <article>
        <h2>Null</h2>
        <p>
          En PHP, <code>null</code> est une valeur spéciale qui représente
          l'absence de valeur. Elle est souvent utilisée pour initialiser une
          variable avant de lui attribuer une valeur.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$a = null; // Initialisation de $a sans valeur

$a = "Bonjour"; // Attribution de la valeur "Bonjour" à $a} </SyntaxHighlighter> <p> Les valeurs <code>null</code> sont également utilisées pour vérifier si une variable a été initialisée ou non. </p> <SyntaxHighlighter language="php" style={vscDarkPlus}> {if ($a == null) {
// $a n'a pas encore été initialisée
}

$b = "Bonjour";
if ($b != null) {
// $b a été initialisée avec une valeur
}`}
        </SyntaxHighlighter>
      </article>
    </div>
  );
};

export default Types;
