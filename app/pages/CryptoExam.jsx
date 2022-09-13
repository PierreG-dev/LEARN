import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CryptoExam = () => {
  return (
    <MainContainer>
      <img className={'background'} src="/res/btc_background.jpg" alt="" />
      <div
        style={{
          background: "url('/res/overlay.png')",
          height: '100%',
          width: '100%',
          position: 'absolute',
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
              Examen <br />
              JavaScript
            </h1>
          </div>

          <section title="Contexte">
            <h2>Contexte</h2>

            <p>
              On cherche à construire une application qui permet d'afficher en
              temps réel le prix d'une cryptomonnaie choisie par l'utilisateur
              en temps réel. <br />
              Le prix recherché est celui de la cryptomonnaie en question contre
              l'EURO (€).
            </p>
            <p>
              La plateforme de change Coinbase met à disposition son service de
              récupération de prix de cryptomonnaies en temps réel sur le l'URL
              suivant:
            </p>
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
              https://api.coinbase.com/v2/prices/[CRYPTO]-EUR/buy
            </SyntaxHighlighter>
            <p>
              Par exemple, pour récupérer le prix d'un Ethereum (une monnaie)
              contre 1 Euro il faudra fair la requête sur l'URL suivant:
            </p>
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
              https://api.coinbase.com/v2/prices/ETH-EUR/buy
            </SyntaxHighlighter>
          </section>

          <section title={'Partie I'}>
            <h2>Partie I</h2>
            <p>
              <strong>Afficher le prix</strong> d'un Bitcoin contre 1 Euro.
            </p>
          </section>

          <section title={'Partie II'}>
            <img src="/res/rank_1.png" alt="" className="medal" />
            <h2>Partie II</h2>
            <p>
              <strong>Afficher les prix</strong> des 6 monnaies suivantes:{' '}
              <strong>Bitcoin</strong>, <strong>Ethereum</strong>,{' '}
              <strong>Cardano</strong>, <strong>Polkadot</strong>,{' '}
              <strong>Cronos</strong> et <strong>Polygon</strong>.
            </p>
          </section>

          <section title={'Partie III'}>
            <h2>Partie III</h2>
            <p>
              A l'aide d'un élément <strong>{'<select>'}</strong>, proposer à
              l'utilisateur une interface qui <strong>affiche le prix</strong>{' '}
              de la monnaie sélectionnée (parmis les 6 précédentes) dans ce
              dernier.
            </p>
          </section>
          <section title={'Partie IV'}>
            <img src="/res/rank_2.png" alt="" className="medal" />

            <h2>Partie IV</h2>
            <p>
              Améliorer le code de la <strong>Partie III</strong> en{' '}
              <strong>mettant à jour le prix</strong> de la monnaie affichée{' '}
              <u>toutes les secondes</u>.
            </p>
          </section>
          <section title={'Partie V'}>
            <h2>Partie V</h2>
            <p>
              Améliorer le code de la <strong>Partie IV</strong> en{' '}
              <strong>changeant la couleur du prix</strong> affiché en fonction
              de l'évolution de ce dernier.
              <br />
              Exemple: <br />
            </p>

            <p>
              <span style={{ color: 'dodgerblue' }}>
                1700 €<sup>►</sup>
              </span>{' '}
              (Le prix est stable)
              <br />
              <span style={{ color: 'green' }}>
                1750 €<sup>▲</sup>
              </span>{' '}
              (Le prix vient d'augmenter après la mise à jour)
              <br />
              <span style={{ color: 'orangered' }}>
                1670 €<sup>▼</sup>
              </span>
              (Le prix vient de diminuer après la mise à jour)
            </p>
          </section>
          <section title={'Partie VI'}>
            <img src="/res/rank_3.png" alt="" className="medal" />
            <h2>Partie VI</h2>
            <p>
              Toujours en améliorant le code précédent,{' '}
              <strong>afficher un historique des prix</strong> observés pour la
              monnaie selectionnée. <br />
              Si le prix ne bouge pas après une mise à jour, inutile de
              l'enregistrer deux fois d'affilée.
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
              Lors du chargement de la monnaie selectionnée,{' '}
              <strong>afficher un loader a la place du prix</strong> le temps
              que l'affichage soit mis à jour
            </p>
          </section>

          <section title={'Bonus II'}>
            <img src="/res/rank_5.png" alt="" className="medal" />
            <h2 className={'mb-4'}>Bonus II</h2>
            <p>
              <strong>
                Afficher un graphique de l'évolution du prix de la monnaie
              </strong>{' '}
              affichée depuis qu'elle a été selectionnée.
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

export default CryptoExam;
