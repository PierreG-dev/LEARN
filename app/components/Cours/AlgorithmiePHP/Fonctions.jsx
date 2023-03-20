import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Fonctions = () => {
  return (
    <div>
      <h1>Les fonctions</h1>
      <p>
        En PHP, les fonctions sont des blocs de code réutilisables qui peuvent
        prendre des paramètres en entrée et retourner une valeur en sortie.
        Elles sont très utiles pour organiser et réutiliser du code, et pour
        effectuer des tâches spécifiques de manière répétitive.
      </p>
      <article>
        <h2>Fonctions</h2>
        <p>
          Les fonctions en PHP permettent de regrouper des instructions en un
          bloc qui peut être appelé et exécuté à plusieurs reprises dans un
          script. Cela facilite la réutilisation de code et permet d'améliorer
          la lisibilité et la maintenance du code.
        </p>
        <p>
          Pour définir une fonction en PHP, on utilise le mot-clé{" "}
          <code>function</code>, suivi du nom de la fonction et de ses
          paramètres entre parenthèses, et enfin de ses instructions entre des
          accolades.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`function maFonction($parametre1, $parametre2) {\n  // Instructions de la fonction\n  return $resultat;\n}`}
        </SyntaxHighlighter>
        <p>
          Ici, la fonction <code>maFonction</code> prend deux paramètres,{" "}
          <code>$parametre1</code> et <code>$parametre2</code>, et retourne la
          variable <code>$resultat</code>. Notez que la variable{" "}
          <code>$resultat</code> peut être de n'importe quel type.
        </p>
        <p>
          Pour appeler une fonction, on utilise simplement son nom suivi des
          valeurs des paramètres entre parenthèses. La fonction est alors
          exécutée avec les valeurs des paramètres qui lui sont passées, et peut
          retourner une valeur.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`$resultat = maFonction(5, 10);\necho $resultat; // affiche la valeur retournée par la fonction`}
        </SyntaxHighlighter>
        <p>
          Il est également possible de définir des paramètres optionnels pour
          une fonction en leur affectant une valeur par défaut. Si un appel à la
          fonction ne fournit pas de valeur pour ces paramètres, leur valeur par
          défaut sera utilisée.
        </p>
        <SyntaxHighlighter language="php" style={vscDarkPlus}>
          {`function maFonction($parametre1, $parametre2 = 10) {\n  // Instructions de la fonction\n  return $resultat;\n}`}
        </SyntaxHighlighter>
        <p>
          Ici, la fonction <code>maFonction</code> a deux paramètres,{" "}
          <code>$parametre1</code> et <code>$parametre2</code>, avec une valeur
          par défaut de 10. Ainsi, si un appel à la fonction ne fournit pas de
          valeur pour <code>$parametre2</code>, sa valeur par défaut sera
          utilisée.
        </p>
      </article>
    </div>
  );
};

export default Fonctions;
