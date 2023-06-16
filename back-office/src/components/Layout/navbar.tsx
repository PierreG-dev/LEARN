import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

interface Props {
  handleLogout: () => void;
  isConnected: boolean;
}

const Navbar = ({ handleLogout, isConnected }: Props) => {
  return (
    <MainContainer>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/auth">auth</Link>
        </li>
        <li>
          <Link to="/tutu">tutu</Link>
        </li>
      </ul>
      {isConnected && (
        <button onClick={handleLogout}>
          <MdLogout />
        </button>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.nav`
  width: 80%;
  height: 60px;
  background: red;
  display: flex;
  padding: 0 10%;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    list-style: none;
    gap: 20px;

    li a {
      text-decoration: none;
      color: #f1f1f1;
    }
  }
`;

export default Navbar;
