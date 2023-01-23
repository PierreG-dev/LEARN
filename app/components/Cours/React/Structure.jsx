import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Structure = () => {
  return (
    <div>
      <h1>Structure</h1>
      <article>
        <h2>Structure d'un projet</h2>
        <p>Un projet possède par défaut une structure comme celle ci:</p>
        <img src="/res/react/course_2.png" alt="" />
        <p>
          On y retrouve: <br />{' '}
          <ul>
            <li>
              <strong>build</strong>: Contient le dernier build (n'existe que si
              un build a été effectué)
            </li>
            <li>
              <strong>node_modules</strong>: contient toutes les ressources
              nécessaires au bon fonctionnement de React
            </li>
            <li>
              <strong>public</strong>: contient toutes les ressources
              accessibles publiquement depuis l'url de votre projet
            </li>
            <li>
              <strong>src</strong>: contient votre code (vous travaillerez ici)
            </li>
            <li>
              <strong>.gitignore</strong>: fichier permettant de lister les
              fichier qui devront être ignorés par git
            </li>
            <li>
              <strong>package.json & package-lock.json</strong>: contient les
              informations liées à l'infrastructure du projet (dépendances,
              paramètrage global...)
            </li>
            <li>
              <strong>README.md</strong>: fichier readme, s'affiche aussi en
              page de garde de votre projet sur GitHub
            </li>
          </ul>
        </p>
      </article>
      <article>
        <h2>Bonnes pratiques</h2>
        <img src="/res/react/course_3.png" alt="" />
        <p>
          Dans un projet, il convient de bien organiser son code. vous avez
          carte blanche, dans la mesure où vos composants se situent tous dans
          le dossier <strong>src</strong> (directement ou indirectement). <br />{' '}
          Vous pouvez par exemple regrouper les composants par catégories:{' '}
          <br />
          <ul>
            <li>
              <strong>Les composants</strong> dans le dossier{' '}
              <span>/src/components</span>
            </li>
            <li>
              <strong>Les utilitaires</strong> (petits composants utiles et
              réutilisables) dans le dossier{' '}
              <span>/src/components/utilities</span>
            </li>
            <li>
              <strong>Les éléments de navigation</strong> (Navbar, Footer...)
              dans le dossier <span>/src/components/Layout</span>
            </li>
            <li>
              <strong>Les éléments d'une page "A"</strong> dans le dossier{' '}
              <span>/src/components/pages/A</span>
            </li>
          </ul>
          etc...
        </p>
      </article>
    </div>
  );
};

export default Structure;
