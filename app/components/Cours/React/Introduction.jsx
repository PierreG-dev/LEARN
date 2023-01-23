import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Introduction = () => {
  return (
    <div>
      <h1>Bienvenue dans React</h1>
      <p>
        Ce cours ne traite que de la version <strong>Hooks</strong> de React{' '}
        <strong>{'(>=16.8)'}</strong>. <br /> il existe des versions
        radicalement différentes, <strong>sous forme de classes</strong>, plus
        orientées POO (Programmation Orientée Objet). <br />
        Si vous tombez sur des aides en ligne utilisant ces versions, sachez que
        les deux peuvent cohabiter dans la mesure ou la syntaxe du composant est
        dans une version precise.
      </p>
      <p>
        De plus, React est compatible avec <strong>Typescript</strong>, mais
        nous ne l'utiliserons pas ici.
      </p>
      <p>
        Ce cours{' '}
        <strong>
          n'a pas vocation à remplacer la{' '}
          <a
            href="https://reactjs.org/docs/getting-started.html"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            documentation officielle
          </a>
        </strong>
        .
      </p>
      <article>
        <h2>Présentation</h2>
        <p>
          React est une librairie Javascript (et non, pas un framework...)
          fournissant un environnement de développement intéressant pour les
          projets complexes.
        </p>
        <p>
          Soyons clair, React <strong>N'est pas</strong> fait pour des projets
          de petite envergure (peu de JS, contenu statique...), en l'utilisant à
          toutes les sauces, tout ce que vous obtiendrez, c'est du temps perdu.{' '}
          <br /> De plus, React étant gourmand en ressources, vous risquez de
          "Bloat" votre site WEB, le résultat étant qu'il sera plus gourmand en
          performances pour... rien. <br />
          Evidemment les appareils modernes ont largement les moyens de faire
          tourner votre site vitrine statique sur React sans sourciller, mais
          sachez que moins vous mettez de code entre le HTML final et le
          navigateur, plus votre site sera léger.
        </p>
        <p>
          Vous avez bien compris, React en fait... c'est du{' '}
          <strong>HTML</strong>🤯 <br />
          Au risque de vous décevoir, un navigateur internet, ça affiche du{' '}
          <strong>HTML/CSS</strong>. <br />
          Le rôle de React, sera de générer ce code HTML automatiquement, en
          fonction du code (en JS) que vous aurez fourni dans son evironnement.
        </p>
      </article>
      <article>
        <h2>Référencement</h2>
        <p>
          <strong>React</strong> est donc une librairie qui génère du HTML a
          partir de fichiers Javascript.
        </p>
        <p>
          Et c'est à la fois sa force, et sa faiblesse. <br />
          Sa force puisque cela permet de <strong>
            générer du code HTML
          </strong>{' '}
          couplé à du JS qui serait infiniment plus long à écrire en vanilla, et
          sa faiblesse car c'est <strong>sur le client</strong> (navigateur du
          visiteur) que la page sera générée.
        </p>
        <p>
          Pour autant les règles ne changent pas:{' '}
          <strong>un code JS sera TOUJOURS lancé par une page HTML</strong>{' '}
          (cette dernière étant la première ressource à être executée.)
          <br />
          Ce qui implique donc que le visiteur ait d'abord une page HTML vide,
          avant de voir le contenu.
        </p>
        <p>
          <strong>
            Cela ne pose aucun problème pour les visiteurs humains
          </strong>
          , le remplissage étant imperceptible car très rapide.
        </p>
        <p>
          <strong>Pour un visiteur non humain en revanche</strong> (Robots de
          référencements), cela pose problème. <br />
          En effet, ces derniers s'occupent de référencer votre page sur leurs
          moteurs <strong>en lisant le contenu du fichier HTML</strong> (d'où
          l'importance de bien utiliser les balises de mise en page), vous
          l'aurez compris, tout ce qu'ils voient en arrivant sur votre site,
          c'est une page blanche.
        </p>
        <p>
          C'est donc très simple:{' '}
          <strong>
            Il n'y a PAS de référencement sur les projets sous React.js.
          </strong>
          <br />
          Aux dernières nouvelles, des choses sont en train d'être développées
          pour y remédier, néanmoins rien n'est mis en place à l'heure actuelle.
        </p>
        <p>
          Si vous souhaitez avoir du référencement avec un écosystème React, il
          faudra vous tourner vers des technologies de <strong>SSR</strong>{' '}
          (Server-Side Rendering) comme le framework <strong>Next.js</strong>{' '}
          pour ne citer que lui. <br />
          Le but étant de générer la page WEB <strong>avant</strong> de
          l'envoyer au visiteur, pour éviter que la page HTML initiale soit
          vide.
        </p>
      </article>
      <article>
        <h2>Créer un nouveau projet</h2>
        <p>Pour créer un projet React, il vous faut:</p>
        <ul>
          <li>
            <strong>un environnement CLI</strong> (powershell, cmd, bash...)
          </li>
          <li>
            <strong>NPM</strong> (Node Package Manager)
          </li>
          <li>
            <strong>Node JS</strong>
          </li>
        </ul>
        <p>
          La commande suivante lance le processus de création d'un nouveau
          projet dans le dossier courant:
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          npx create-react-app nom_du_projet
        </SyntaxHighlighter>
        <p>
          Un nouveau dossier sera créé, portant le nom du projet, il faudra s'y
          déplacer avec la commande <span>cd [dossier]</span>
        </p>
      </article>
      <article>
        <h2>Serveur de développement</h2>
        <p>
          Pour lancer un serveur de développement, on se place dans la racine du
          projet, on et lance la commande:
        </p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          npm start
        </SyntaxHighlighter>
        <p>
          Une fois le serveur lancé, ce dernier sera accessible localement à
          l'adresse <strong>localhost:3000</strong> (3000 étant le port par
          défaut) ou <strong>127.0.0.1:3000</strong>
        </p>
      </article>
      <article>
        <h2>Build</h2>
        <p>
          Pour avoir un résultat exploitable de votre projet, vous devrez créer
          un <strong>build</strong>, ce dernier étant tout simplement un projet
          WEB au format HTML|CSS|JS généré par React à partir de votre code
        </p>
        <p>Pour build:</p>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          npm run build //dans la racine de votre projet
        </SyntaxHighlighter>
        <p>
          Vous aurez votre build dans un dossier nommé <span>build</span> situé
          à la racine de votre projet.
        </p>
      </article>
    </div>
  );
};

export default Introduction;
