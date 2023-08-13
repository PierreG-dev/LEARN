import { Link } from "react-router-dom";
import "../components/Error404/index.scss";

const _404 = () => {
  return (
    <main id="error_404">
      <h1>
        Page non trouvée
        <br />
        <span>404</span>
      </h1>
      <Link to="/">
        <button className="learn-button">Revenir à l'accueil</button>
      </Link>
    </main>
  );
};
export default _404;
