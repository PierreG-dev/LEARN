import { FC } from "react";
import "../../components/Legal/index.scss";

const LegalPrivacy: FC = () => (
  <section id="privacy-policy">
    <h1>Politique de Confidentialité</h1>
    <p>
      Bienvenue sur <strong>LEARN</strong>, votre plateforme d'apprentissage en
      ligne dédiée à l'approfondissement de vos compétences en développement
      Web. Nous valorisons votre <strong>vie privée</strong> et nous engageons à
      la respecter. La présente <strong>Politique de confidentialité</strong>{" "}
      explique les types de données que nous collectons de votre part et comment
      nous les utilisons. Nous vous encourageons à lire cette politique
      attentivement pour comprendre nos pratiques relatives à vos informations
      personnelles.
    </p>

    <h2 id="data-collection">Collecte de données</h2>
    <p>
      Lors de votre inscription sur notre plateforme, nous pouvons être amenés à
      collecter diverses informations vous concernant. Cela peut inclure votre
      nom, votre adresse électronique, votre numéro de téléphone ainsi que
      d'autres informations nécessaires pour la création de votre compte
      d'utilisateur et pour la prestation de nos services.
    </p>

    <h2 id="data-use">Utilisation des données</h2>
    <p>
      Nous utilisons vos données pour diverses raisons. Cela comprend la
      fourniture des services que vous avez demandés, l'amélioration continue de
      notre plateforme pour vous offrir une meilleure expérience utilisateur,
      ainsi que l'envoi d'informations pertinentes concernant nos services.
    </p>

    <h2 id="data-sharing">Partage des données</h2>
    <p>
      Vos informations personnelles sont précieuses et nous nous engageons à les
      protéger. Nous ne vendons pas, ni ne partageons vos données personnelles
      avec des tiers à des fins commerciales.
    </p>

    <h2 id="cookies">Cookies</h2>
    <p>
      Nous utilisons des <strong>cookies</strong> sur notre site pour améliorer
      votre expérience utilisateur. Les cookies sont des petits fichiers de
      données qui sont téléchargés sur votre appareil lorsque vous visitez notre
      site. Ils nous permettent de vous reconnaître lors de vos visites
      ultérieures, d'optimiser les performances de notre site et de
      personnaliser le contenu que nous vous proposons. Pour en savoir plus sur
      les cookies, vous pouvez consulter cet{" "}
      <a
        href="https://www.cnil.fr/fr/site-web-cookies-et-autres-traceurs"
        target="_blank"
      >
        article
      </a>{" "}
      de la CNIL.
    </p>

    <h2 id="data-security">Sécurité des données</h2>
    <p>
      Nous prenons la sécurité de vos données très au sérieux. C'est pourquoi
      nous avons mis en place des mesures de sécurité techniques et
      organisationnelles pour protéger vos données contre tout accès,
      modification, divulgation ou destruction non autorisés.
    </p>

    <h2 id="user-rights">Vos droits</h2>
    <p>
      Conformément à la réglementation française et européenne, vous disposez de
      plusieurs droits en ce qui concerne vos informations personnelles. Vous
      avez le droit de demander un accès à vos données, de demander la
      rectification de toute information incorrecte, de demander la suppression
      de vos données, et de limiter leur traitement. Vous pouvez exercer ces
      droits en nous contactant à [votre contact].
    </p>

    <p>
      Cette Politique de confidentialité est susceptible d'être modifiée. Nous
      vous recommandons de la consulter régulièrement pour rester informé de
      toute modification.
    </p>

    <p>
      <em>
        Note: Il est important de noter que nous nous réservons le droit de
        modifier cette politique de confidentialité à tout moment, donc veuillez
        la consulter fréquemment. Les modifications et clarifications prendront
        effet immédiatement après leur publication sur le site web.
      </em>
    </p>

    <h2 id="privacy-policy-ref">
      Références pour la Politique de Confidentialité
    </h2>
    <ul>
      <li>
        <a
          href="https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles"
          target="_blank"
        >
          Les droits pour maîtriser vos données personnelles (CNIL)
        </a>
      </li>
      <li>
        <a
          href="https://www.cnil.fr/fr/site-web-cookies-et-autres-traceurs"
          target="_blank"
        >
          Site web, cookies et autres traceurs (CNIL)
        </a>
      </li>
    </ul>
  </section>
);

export default LegalPrivacy;
