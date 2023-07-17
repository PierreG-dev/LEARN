import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

interface Props {
  handleLogout: () => void;
  isConnected: boolean;
}

const links = [
  {
    link: "/classes",
    name: "Classes",
  },
  {
    link: "/chapters",
    name: "Chapitres",
  },
];

const Navbar = ({ handleLogout, isConnected }: Props) => {
  const location = useLocation();
  console.log(location);

  return (
    <nav>
      <div>
        <Link to="/">
          <h2>
            LEARN<sup>Manager</sup>
          </h2>
        </Link>

        <ul>
          {links.map((link, key) => (
            <li
              className={
                location.pathname.includes(link.link) ? "selected" : ""
              }
              key={key}
            >
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout}>
        <MdLogout />
      </button>
    </nav>
  );
};

export default Navbar;
