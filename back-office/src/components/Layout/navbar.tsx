import { Link, useLocation } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts.ts';
import { BsDot } from 'react-icons/bs';

interface Props {
  handleLogout: () => void;
}

const user_links = [
  {
    link: '/courses',
    name: 'Cours',
  },
  {
    link: '/exercices',
    name: 'Exercices',
  },
];

const admin_links = [
  {
    link: '/classes',
    name: 'Classes',
  },
  {
    link: '/chapters',
    name: 'Chapitres',
  },
];

const Navbar = ({ handleLogout }: Props) => {
  const location = useLocation();
  const connectedUser = useSelector((state: RootState) => state.data.user);
  const isServerOnline = useSelector(
    (state: RootState) => state.globals.isServerOnline
  );

  console.log(connectedUser?.avatarUrl);
  return (
    <nav>
      <div>
        <div>
          <Link to="/">
            <div id="gears-container">
              <i></i>
              <i></i>
            </div>
            <h2>
              LEARN
              {(connectedUser?.roles?.includes('teacher') ||
                connectedUser?.roles?.includes('admin')) && <sup>Manager</sup>}
            </h2>
          </Link>

          <ul id="user_navlinks">
            {user_links.map((link, key) => (
              <li
                className={
                  location.pathname.includes(link.link) ? 'selected' : ''
                }
                key={key}
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>

          <div id="navbar_separator" />

          <ul id="admin_navlinks">
            {admin_links.map((link, key) => (
              <li
                className={
                  location.pathname.includes(link.link) ? 'selected' : ''
                }
                key={key}
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="profile_container">
        <img src={connectedUser?.avatarUrl} alt={connectedUser?.username} />
        <ul id="navbar_profile_selector">
          <li>
            <a href="/profile">Mon compte</a>
          </li>
          <li>
            <a href="/settings">Paramètres</a>
          </li>
          <li value="" onClick={handleLogout}>
            Se déconnecter
            <MdLogout />
          </li>
        </ul>

        <BsDot
          id="connection_status"
          title={isServerOnline ? 'En ligne' : 'Tentative de reconnexion...'}
          style={{ color: isServerOnline ? 'green' : 'orangered' }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
