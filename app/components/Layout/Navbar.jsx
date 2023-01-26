import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const pages = ['Cours', 'Exercices'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = ({ children, isConnected }) => {
  return (
    <main>
      <MainContainer style={{ background: '#E07A5F' }}>
        <Link href="/">
          <div id="navbar_logo">
            <div className="gears-container">
              <i></i>
              <i></i>
            </div>
            <div className="logo-typo">LEARN</div>
          </div>
        </Link>
        <div id="navbar_links" className="logo-typo">
          <Link href="/Cours">Cours</Link>
          <Link href="/Exercices">Exercices</Link>
        </div>
      </MainContainer>
      {children}
    </main>
  );
};

const MainContainer = styled.nav`
  display: flex;

  align-items: center;
  height: 75px;
  width: 100vw;

  #navbar_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-width: 5%;
    color: #fafafa;
    font-size: 1.8rem;
    padding-left: 10%;
    transition: 0.1s;
    cursor: pointer;

    &:hover {
      filter: invert(20%) sepia(30%) saturate(511%) hue-rotate(346deg)
        brightness(100%) contrast(91%);
    }
  }

  #navbar_links {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fafafa;
    gap: 20px;
    padding: 0 1%;

    a {
      transition: 0.1s;
    }
    a:hover {
      color: #f2cc8f;
    }
  }
`;
export default Navbar;
