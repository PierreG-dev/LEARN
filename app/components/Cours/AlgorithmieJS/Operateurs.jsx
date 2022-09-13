import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Operateurs = () => {
  return (
    <article>
      <h1>Les opérateurs</h1>
      <p>
        Les <strong>opérateurs</strong> sont des symboles, qui, associés à des
        données (venant de variables ou directes) produisent un processus et
        donc un résultat (sous forme de retour la plupart du temps).
      </p>
      <h2>Opérateurs d'affectation</h2>
      <h3>Affectation simple</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x = 2 //Affecte à x la valeur 2`}
      </SyntaxHighlighter>
      <h3>Affectation après addition</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x += 2 //Affecte à x le résultat de l'addition entre x et 2`}
      </SyntaxHighlighter>
      <h3>Affectation après soustraction</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x -= 2 //Affecte à x le résultat de la soustraction entre x et 2`}
      </SyntaxHighlighter>
      <h3>Affectation après multiplication</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x *= 2 //Affecte à x le résultat de la multiplication entre x et 2`}
      </SyntaxHighlighter>
      <h3>Affectation après division</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x /= 2 //Affecte à x le résultat de la division entre x et 2`}
      </SyntaxHighlighter>
      <h3>Affectation du reste</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x %= 2 //Affecte à x le reste de la division entre x et 2`}
      </SyntaxHighlighter>
      <h3>Affectation après exponentiation</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x **= 2 //Affecte à x le résultat de l'exponentiation entre x et 2`}
      </SyntaxHighlighter>
      <h3>Incrémentation</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x++ //Affecte à x sa valeur + 1`}
      </SyntaxHighlighter>
      <h3>Décrémentation</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x-- //Affecte à x sa valeur - 1`}
      </SyntaxHighlighter>
      <h2>Opérations arithmétiques</h2>
      <h3>Addition</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x + 2 //Retourne le résultat de l'addition entre x et 2`}
      </SyntaxHighlighter>
      <h3>Soustraction</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x - 2 //Retourne le résultat de la soustraction entre x et 2`}
      </SyntaxHighlighter>
      <h3>Multiplication</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x * 2 //Retourne le résultat de la multiplication entre x et 2`}
      </SyntaxHighlighter>
      <h3>Division</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x / 2 //Retourne le résultat de la division entre x et 2`}
      </SyntaxHighlighter>
      <h3>Exponentiation</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x ** 2 //Retourne le résultat de l'exponentiation entre x et 2`}
      </SyntaxHighlighter>
      <h3>Modulo</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`x % 2 //Retourne le reste de la division entre x et 2`}
      </SyntaxHighlighter>
      <h2>Opérateurs de comparaison</h2>
      <h3>Egalité</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 == "1" //Retourne true\n1 == 2 //Retourne false`}
      </SyntaxHighlighter>
      <h3>Inégalité</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 != "1" //Retourne false\n1 != 2 //Retourne true`}
      </SyntaxHighlighter>
      <h3>Egalité stricte</h3>
      <p>
        Contrairement à l'égalité simple, l'égalité stricte compare aussi le
        type.
      </p>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 === "1" //Retourne false\n1 === 1 //Retourne true`}
      </SyntaxHighlighter>
      <h3>Inegalité stricte</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 !== "1" //Retourne true\n1 !== 1 //Retourne false`}
      </SyntaxHighlighter>
      <h3>Supériorité stricte</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 > 0 //Retourne true\n1 > 1 //Retourne false\n1 > 2 //Retourne false`}
      </SyntaxHighlighter>
      <h3>Supériorité</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 >= 0 //Retourne true\n1 >= 1 //Retourne true\n1 >= 2 //Retourne false`}
      </SyntaxHighlighter>
      <h3>Infériorité stricte</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 < 0 //Retourne false\n1 < 1 //Retourne false\n1 < 2 //Retourne true`}
      </SyntaxHighlighter>
      <h3>Infériorité</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`1 <= 0 //Retourne false\n1 <= 1 //Retourne true\n1 <= 2 //Retourne true`}
      </SyntaxHighlighter>
      <h2>Opérateurs de condition</h2>
      <p>
        Les opérateurs de conditions permettent de lier plusieurs conditions,
        dans le but de faire une condition logique plus complexe.
      </p>
      <h3>ET logique</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`true && true //Retourne true\ntrue && false //Retourne false\nfalse && true //Retourne false\nfalse && false //Retourne false`}
      </SyntaxHighlighter>
      <h3>OU logique</h3>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {`true && true //Retourne true\ntrue || false //Retourne true\nfalse || true //Retourne true\nfalse || false //Retourne false`}
      </SyntaxHighlighter>
    </article>
  );
};

export default Operateurs;
