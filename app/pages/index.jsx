import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {}, []);

  return (
    <MainContainer>
      <LeftContainer>
        <h1 className="logo-typo">LEARN_</h1>
        <h2>Apprenez à votre rythme, avec les bons outils.</h2>
        <Link href="/Cours">
          <button className="cssbuttons-io-button">
            {' '}
            Accéder aux cours
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </Link>
      </LeftContainer>
      <RightContainer>
        <img src="/res/home_rightside_image.png" alt="" />
      </RightContainer>
    </MainContainer>
  );
}

const LeftContainer = styled.section`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #e07a5f;
  h1 {
    font-size: 5rem;
    margin-top: 0;
    margin-bottom: 15px;
  }
  h2 {
    margin-top: 0;
    font-size: 2rem;
    text-align: center;
  }
`;

const RightContainer = styled.aside`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  background: #f2cc8f;
  display: flex;
`;
