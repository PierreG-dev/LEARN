import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts.ts";
import { BsDot } from "react-icons/bs";

interface Props {
  handleLogout: () => void;
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

const Navbar = ({ handleLogout }: Props) => {
  const location = useLocation();
  const connectedUser = useSelector((state: RootState) => state.data.user);
  const isServerOnline = useSelector(
    (state: RootState) => state.globals.isServerOnline
  );

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
              {(connectedUser?.roles?.includes("teacher") ||
                connectedUser?.roles?.includes("admin")) && <sup>Manager</sup>}
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
      </div>
      <div>
        <button onClick={handleLogout}>
          <MdLogout />
        </button>
        <BsDot
          id="connection_status"
          title={isServerOnline ? "En ligne" : "Tentative de reconnexion..."}
          style={{ color: isServerOnline ? "green" : "orangered" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
