import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/index.ts';
import { useSelector } from 'react-redux';

const Loader: React.FC = () => {
  const [displayLoader, setDisplayLoader] = useState(true);
  const isPending = useSelector((state: RootState) => state.auth.isPending);

  useEffect(() => {
    if (!isPending)
      setTimeout(() => {
        setDisplayLoader(false);
      }, 1500);
  }, [isPending]);

  return (
    <MainContainer
      style={{
        opacity: displayLoader ? '1' : '0',
        zIndex: displayLoader ? '5' : '-1',
        transition: 'opacity 0.3s ease 0s, z-index 0s linear 0.3s',
      }}
    >
      <h1
        className="logo-typo"
        style={{ color: '#E07A5F !important', fontSize: '3rem' }}
      >
        LEARN
      </h1>
      <div className="loadingContainer">
        <div className="ball1"></div>
        <div className="ball2"></div>
        <div className="ball3"></div>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  opacity: 1;
  transition: 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0)
    linear-gradient(to right bottom, #f4f1de, #f2cc8f 120%) repeat scroll 0% 0%;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin-bottom: 30px;
  }

  .loadingContainer {
    position: relative;
    margin: 10px auto 0 auto;
  }
  .loadingContainer div {
    height: 20px;
    width: 20px;
    border-radius: 0;
    background: #e07a5f;
    float: left;
    margin: 0 3px;
  }
  .loadingContainer .ball1 {
    z-index: 1;
    -moz-animation: bounce 1s infinite ease-in-out;
    -webkit-animation: bounce 1s infinite ease-in-out;
  }
  .loadingContainer .ball2 {
    -moz-animation: bounce 1s infinite ease-in-out;
    -webkit-animation: bounce 1s infinite ease-in-out;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .loadingContainer .ball3 {
    -moz-animation: bounce 1s infinite ease-in-out;
    -webkit-animation: bounce 1s infinite ease-in-out;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .loadingContainer .ball4 {
    -moz-animation: bounce 1s infinite ease-in-out;
    -webkit-animation: bounce 1s infinite ease-in-out;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%,
    15% {
      -moz-transform: translate(0, 0);
    }
    50% {
      -moz-transform: translate(0, -30px);
      background: #e07a5f;
    }
    85%,
    100% {
      -moz-transform: translate(0, 0);
    }
  }
  @keyframes bounce {
    0%,
    20% {
      -webkit-transform: translate(0, 0);
    }
    50% {
      -webkit-transform: translate(0, -30px);
      background: #e07a5f;
    }
    80%,
    100% {
      -webkit-transform: translate(0, 0);
    }
  }
`;

export default Loader;
