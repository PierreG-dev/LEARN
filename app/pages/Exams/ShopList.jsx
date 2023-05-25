import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const ShopList = () => {
  return (
    <MainContainer>
      <img
        className={'background'}
        src="https://images.pexels.com/photos/952353/pexels-photo-952353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
      />
      <div
        style={{
          background: "url('/res/overlay.png')",
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
          position: 'fixed',
          opacity: 0.3,
          zIndex: -1,
        }}
      ></div>
      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-w-6xl mx-auto my-auto'
        }
      >
        <InfosContainer>
          <div className="flex flex-col justify-between p-6 block md:hidden mb-7">
            <h1 style={{ color: '#fafafa' }}>
              Liste <br /> de <br />
              Courses
            </h1>
          </div>

          <section title="Contexte">
            <h2>Contexte</h2>

            <p>
              On cherche à créer une application de liste de courses pour gérer
              les achats efficacement. <br />
              Les utilisateurs peuvent ajouter, modifier, supprimer et marquer
              les articles comme achetés. Personnalisation de la liste et
              filtrage des articles pour une gestion simplifiée des achats.
            </p>
            <p>
              On peut modéliser un produit à acheter dans un objet, et stocker
              dans un tableau les différents élements. <br />
              Un produit sera modélisé comme ceci:
            </p>
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
              {`{
  id: 1,
  name: "Pain",
  quantity: 2,
  isPurchased: false,
}`}
            </SyntaxHighlighter>
            <p>Ainsi, on stockera plusieurs produits de la manière suivante:</p>
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
              {`const shoppingList = [
  {
    id: 1,
    name: "Pain",
    quantity: 2,
    isPurchased: false,
  },
  {
    id: 2,
    name: "Lait",
    quantity: 1,
    isPurchased: true,
  },
  // ...
];
`}
            </SyntaxHighlighter>
          </section>

          <section title={'Partie I'}>
            <h2>Partie I</h2>
            <p>
              <strong>Affichage basique de la liste de courses</strong>
              <br /> Créez un composant <strong>ShoppingList</strong> qui
              affiche une liste de courses prédéfinie. <br />
              Utilisez un state pour stocker les éléments de la liste et
              affichez-les à l'aide d'une boucle dans le rendu du composant.
            </p>
          </section>

          <section title={'Partie II'}>
            <img src="/res/rank_1.png" alt="" className="medal" />
            <h2>Partie II</h2>
            <p>
              <strong>Ajout d'éléments à la liste</strong>
              <br />
              Ajoutez la fonctionnalité d'ajout d'éléments à la liste de
              courses. <br /> Utilisez un champ de saisie contrôlé et un bouton
              pour permettre à l'utilisateur d'ajouter de nouveaux éléments à la
              liste. <br />
              Mettez à jour le state avec les nouveaux éléments saisis par
              l'utilisateur.
            </p>
          </section>

          <section title={'Partie III'}>
            <h2>Partie III</h2>
            <p>
              <strong>Suppression d'éléments de la liste</strong>
              <br />
              Permettez à l'utilisateur de supprimer des éléments de la liste de
              courses. <br />
              Ajoutez un bouton de suppression à côté de chaque élément de la
              liste et implémentez la logique nécessaire pour mettre à jour le
              state en supprimant l'élément correspondant.
            </p>
          </section>
          <section title={'Partie IV'}>
            <img src="/res/rank_2.png" alt="" className="medal" />

            <h2>Partie IV</h2>
            <p>
              <strong>Marquage des éléments comme achetés</strong> <br />
              Ajoutez la fonctionnalité de marquer les éléments de la liste
              comme achetés. <br />
              Ajoutez un bouton de basculement (toggle) à côté de chaque élément
              de la liste et mettez à jour le state pour refléter l'état d'achat
              de chaque élément.
            </p>
          </section>
          <section title={'Partie V'}>
            <h2>Partie V</h2>
            <p>
              <strong>Filtrage des éléments achetés</strong>
              <br />
              Ajoutez la possibilité de filtrer les éléments achetés dans la
              liste de courses. <br />
              Ajoutez un bouton de filtre et utilisez le state pour afficher
              uniquement les éléments achetés ou non achetés en fonction de
              l'état du filtre.
            </p>
          </section>
          <section title={'Partie VI'}>
            <img src="/res/rank_3.png" alt="" className="medal" />
            <h2>Partie VI</h2>
            <p>
              <strong>Améliorations de l'interface utilisateur</strong>
              <br />
              Améliorez l'interface utilisateur de votre application de liste de
              courses en utilisant des styles CSS ou une bibliothèque de
              composants. <br />
              Ajoutez des styles pour rendre l'application plus attrayante et
              conviviale.
            </p>
          </section>
        </InfosContainer>

        <BonusContainer>
          <div className="flex flex-col justify-between p-6 hidden md:block">
            <h1>Bonus</h1>
          </div>

          <section title={'Bonus I'}>
            <img src="/res/rank_4.png" alt="" className="medal" />
            <h2 className={'mb-3'}>Bonus I</h2>
            <p>
              <strong>Modification des éléments de la liste</strong>
              <br />
              Permettez à l'utilisateur de modifier les éléments de la liste de
              courses. <br /> Ajoutez un bouton d'édition à côté de chaque
              élément de la liste et implémentez la logique nécessaire pour
              mettre à jour le state en modifiant l'élément correspondant.{' '}
              <br />
              Utilisez un champ de saisie contrôlé pour permettre à
              l'utilisateur de modifier le nom et la quantité de l'élément.
            </p>
          </section>

          <section title={'Bonus II'}>
            <img src="/res/rank_5.png" alt="" className="medal" />
            <h2 className={'mb-4'}>Bonus II</h2>
            <p>
              <strong>Enregistrement des données localement</strong>
              <br />
              Ajoutez la fonctionnalité d'enregistrement des données localement.
              Utilisez les fonctionnalités de stockage local du navigateur
              (localStorage) pour sauvegarder la liste de courses de
              l'utilisateur. <br />
              Lorsque l'application est rechargée, les données doivent être
              restaurées à partir du stockage local pour permettre à
              l'utilisateur de retrouver sa liste précédente.
            </p>
          </section>
        </BonusContainer>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-top: -10vh;
  padding: 0 5vw;
  position: relative;
  width: 100%;
  min-height: 100%;
  z-index: 0;
  overflow-x: hidden;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  img.medal {
    width: 30px;
    position: absolute;
    top: 0px;
    right: 5px;
    filter: css-shadow(1px 1px 4px rgba(0, 0, 0, 0.4));
    transition: 0.1s;
  }
  img.medal:hover {
    transform: scale3d(1.1, 1.1, 1);
  }

  h1 {
    font-family: 'Bebas Neue', cursive !important;
    font-size: 4.5rem;
    letter-spacing: 0.8rem;
    text-align: justify;
    color: #272727;
    line-height: 4rem;
    text-align: center;
    margin-left: 8px;
    text-shadow: 0px 0 5px rgba(0, 0, 0, 0.3);
  }
  h2 {
    font-family: 'Bebas Neue', cursive !important;
    font-size: 1.8rem;
    letter-spacing: 0.5rem;
  }
  h3 {
    font-size: 1.3rem;
  }

  ul {
    list-style: '- ';
  }

  h4,
  p,
  li,
  a {
    font-family: Montserrat;
    font-weight: 600;
  }

  h3,
  h4,
  p {
    letter-spacing: 1.5px;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -2;
  }

  section {
    margin-bottom: 1.5rem;
    padding: 0.8rem 2.7rem;
    background: #fffff9;
    color: #373737;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    transition: 0.15s;
    position: relative;
  }
  section:hover {
    transform: scale3d(1.02, 1.02, 1);
    cursor: help;
  }

  img {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
  }
`;

const BonusContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3); */
  img.medal {
    width: 30px;
    position: absolute;
    top: 5px !important;
    right: 5px;
    filter: css-shadow(1px 1px 4px rgba(0, 0, 0, 0.4));
    transition: 0.1s;
  }
  img.medal:hover {
    transform: scale3d(1.1, 1.1, 1);
  }

  h1 {
    color: #dadada !important;
  }

  section {
    position: relative;
    width: 100%;
    background: #545454;
    color: #fafafa;

    h2 {
      color: #fafafa !important;
    }
  }
  button {
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10vw;
    color: #fafafa;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 5px;
    text-align: center;
    font-size: 3rem;
    transition: 0.5s;
    white-space: nowrap;

    span {
      font-size: 1rem;
      opacity: 0;
    }
  }
  button:hover {
    width: 50%;
    background: rgba(255, 255, 255, 0.3);
    span {
      opacity: 0.8;
      transition: 0.3s 0.4s;
    }
    svg {
      opacity: 0;
    }
  }
  button:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    button {
      display: none;
    }
  }
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*padding: 2.7rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  background: #fffff9;*/
  color: #373737;
  border-radius: 5px;
`;

export default ShopList;
