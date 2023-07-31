import { FC } from "react";
import "../../components/Legal/index.scss";

const LegalUsage: FC = () => (
  <section id="terms-of-use">
    <h1>Conditions d'Utilisation</h1>
    <p>
      Bienvenue sur <strong>LEARN</strong>, votre plateforme d'apprentissage en
      ligne dédiée au développement Web. Nous sommes ravis de vous avoir parmi
      nous.
    </p>

    <p>
      En accédant à ce site et en utilisant nos services, vous acceptez les
      conditions suivantes. Nous vous invitons à lire attentivement ces
      conditions avant d'utiliser nos services.
    </p>

    <h2 id="services">Services</h2>
    <p>
      Nous offrons une gamme variée de cours en ligne sur le développement Web,
      adaptés aux débutants ainsi qu'aux développeurs expérimentés. Certains de
      ces cours sont disponibles gratuitement, tandis que d'autres nécessitent
      un achat pour y accéder. Nous nous efforçons d'offrir une formation de
      qualité qui répond à vos besoins et favorise votre développement
      professionnel.
    </p>

    <h2 id="user-accounts">Comptes d'utilisateurs</h2>
    <p>
      Pour profiter pleinement de nos services, vous devez créer un compte
      d'utilisateur. Lors de la création de votre compte, vous vous engagez à
      fournir des informations précises et à jour. Vous êtes entièrement
      responsable de la sécurité de votre compte ainsi que de la confidentialité
      de vos informations de connexion.
    </p>

    <h2 id="payments">Paiements</h2>
    <p>
      Pour les cours payants, les paiements sont effectués en ligne par les
      moyens de paiement que nous indiquons sur notre site. Nous nous efforçons
      de proposer des moyens de paiement sûrs et pratiques pour nos
      utilisateurs.
    </p>

    <h2 id="intellectual-property">Droits de propriété intellectuelle</h2>
    <p>
      Le contenu de nos cours est protégé par les lois sur le droit d'auteur. En
      accédant à nos cours, vous obtenez une licence pour utiliser ce contenu à
      des fins personnelles et éducatives. Cependant, vous n'êtes pas autorisé à
      reproduire, distribuer ou utiliser ce contenu à des fins commerciales sans
      notre permission écrite. Pour plus d'informations sur les droits de
      propriété intellectuelle, consultez cette page{" "}
      <a
        href="https://www.cnil.fr/fr/droits-diffusion-et-droit-copie-que-dit-la-loi"
        target="_blank"
      >
        CNIL
      </a>
      .
    </p>

    <h2 id="limitation-of-liability">Limitation de responsabilité</h2>
    <p>
      Bien que nous nous efforçons de fournir des informations précises et à
      jour dans nos cours, nous ne pouvons garantir l'exactitude et la
      pertinence de ces informations à tout moment. En utilisant notre
      plateforme, vous acceptez donc de le faire à vos propres risques et
      assumez l'entière responsabilité de toute perte résultant de votre
      utilisation de nos cours.
    </p>
    <h2 id="changes-to-terms">Modifications des Conditions</h2>
    <p>
      Ces conditions d'utilisation sont susceptibles d'être modifiées ou mises à
      jour. Nous vous recommandons donc de les consulter régulièrement pour
      rester informé des changements. Votre utilisation continue de notre site
      après la publication de modifications à ces termes signifie que vous
      acceptez ces changements.
    </p>

    <h2 id="contact">Nous contacter</h2>
    <p>
      Si vous avez des questions concernant ces conditions d'utilisation,
      n'hésitez pas à nous contacter à [votre contact]. Nous nous efforçons de
      répondre à toutes vos questions et préoccupations.
    </p>

    <p>
      <em>
        Note: En utilisant ce site, vous acceptez ces termes et conditions dans
        leur intégralité. Si vous n'êtes pas d'accord avec ces termes et
        conditions ou une partie de ces termes et conditions, vous ne devez pas
        utiliser ce site.
      </em>
    </p>

    <h2 id="terms-of-use-ref">Références pour les Conditions d'Utilisation</h2>
    <ul>
      <li>
        <a
          href="https://www.cnil.fr/fr/cgu-conditions-generales-dutilisation-un-contrat-qui-nengage-pas-que-lutilisateur"
          target="_blank"
        >
          CGU : conditions générales d’utilisation, un contrat qui n’engage pas
          que l’utilisateur (CNIL)
        </a>
      </li>
      <li>
        <a
          href="https://www.cnil.fr/fr/droits-diffusion-et-droit-copie-que-dit-la-loi"
          target="_blank"
        >
          Droits de diffusion et droit à la copie : que dit la loi ? (CNIL)
        </a>
      </li>
    </ul>
  </section>
);

export default LegalUsage;
