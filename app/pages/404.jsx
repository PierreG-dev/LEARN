import { Fragment } from "react";
import Link from "next/link";
import styled from "styled-components";

export default () => {
  return (
    <MainContainer>
      <h1>
        Page non trouvée
        <br />
        <span>404</span>
      </h1>
      <Link href="/">
        <button>Revenir à l'accueil</button>
      </Link>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;

  h1 {
    color: #e07a5f;
    font-family: "Silkscreen", cursive !important;
    text-align: center;

    span {
      font-family: "Silkscreen", cursive !important;
      font-size: 5rem;
    }
  }

  button {
    background: #e07a5f;
    border: none;
    color: #fafafa;
    border-radius: 5px;
    padding: 10px 15px;
    transition: 0.1s;
    cursor: pointer;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

    &:hover {
      background: #fafafa;
      color: #e07a5f;
    }
  }
`;
