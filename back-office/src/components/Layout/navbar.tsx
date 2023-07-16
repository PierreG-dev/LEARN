import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

interface Props {
  handleLogout: () => void;
  isConnected: boolean;
}

const Navbar = ({ handleLogout, isConnected }: Props) => {
  return (
    <MainContainer>
      <div>
        <Link to="/">
          <h2>
            LEARN<sup>Manager</sup>
          </h2>
        </Link>

        <ul>
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/chapters">Chapitres</Link>
          </li>
        </ul>
      </div>
      <button onClick={handleLogout}>
        <MdLogout />
      </button>
    </MainContainer>
  );
};

const MainContainer = styled.nav`
  width: 100%;
  height: 60px;
  background: #e07a5f;
  display: flex;
  padding: 0 10%;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    gap: 50px;

    a {
      text-decoration: none;

      h2 {
        color: #fafafa;
        font-family: "Silkscreen", cursive;
        letter-spacing: 1px;
        font-size: 1.3rem;

        sup {
          font-size: 0.7rem;
        }
      }
    }

    ul {
      display: flex;
      list-style: none;
      align-items: center;
      gap: 20px;

      li a {
        text-decoration: none;
        color: #f1f1f1;
        font-family: "Silkscreen", cursive;
      }
    }
  }

  & > button {
    border: none;
    background: #fff2;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;
    font-size: 1.1rem;

    &:hover {
      background: #fff4;
    }
  }
`;

export default Navbar;
