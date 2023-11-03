import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { BsDot, BsFillGearFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts.ts";
import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";

interface Props {
  handleLogout: () => void;
}

const user_links = [
  {
    link: "/courses",
    name: "Cours",
  },
  {
    link: "/exercices",
    name: "Exercices",
  },
];

const admin_links = [
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
  const navigate = useNavigate();
  const connectedUser = useSelector((state: RootState) => state.data.user);
  const isServerOnline = useSelector(
    (state: RootState) => state.globals.isServerOnline
  );

  const [isUserMenuDeployed, setIsUserMenuDeployed] = useState(false);

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

          <ul id="user_navlinks">
            {user_links.map((link, key) => (
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

          <div id="navbar_separator" />

          <ul id="admin_navlinks">
            {admin_links.map((link, key) => (
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

      <div
        id="profile_container"
        className={isUserMenuDeployed ? "deployed" : ""}
        onClick={() => setIsUserMenuDeployed((prevstate) => !prevstate)}
      >
        <img src={connectedUser?.avatarUrl} alt={connectedUser?.username} />
        <h4>{connectedUser?.username}</h4>
        <ul id="navbar_profile_selector">
          <li style={{ animationDelay: "0.1s" }} id="user_menu_account">
            <BiSolidUser />
            <Link to="/account">Mon compte</Link>
          </li>
          <li style={{ animationDelay: "0.2s" }} id="user_menu_settings">
            <BsFillGearFill />
            <Link to="/settings">Paramètres</Link>
          </li>
          <li
            value=""
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
            style={{ animationDelay: "0.3s" }}
            id="user_menu_logout"
          >
            <MdLogout />
            <span>Se déconnecter</span>
          </li>
        </ul>

        <BsDot
          id="connection_status"
          title={isServerOnline ? "En ligne" : "Tentative de reconnexion..."}
          style={{ color: isServerOnline ? "green" : "orangered" }}
        />
        <FaChevronDown id="user_menu_chevron" />
      </div>
    </nav>
  );
};

export default Navbar;
