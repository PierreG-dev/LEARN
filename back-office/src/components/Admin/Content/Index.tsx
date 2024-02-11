import { Link } from "react-router-dom";
import "./index.scss";
import useModal from "../../../hooks/modal/useModal";
const data = [
  {
    id: 1,
    titre: "Introduction à la programmation",
    description:
      "Ce cours couvre les bases de la programmation informatique. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    titre: "Développement web avancé",
    description: "Ce cours explore les concepts avancés de développement web.",
  },
  {
    id: 3,
    titre: "Science des données",
    description:
      "Ce cours se concentre sur l'analyse et la visualisation des données.",
  },
  {
    id: 4,
    titre: "Algorithmique et structures de données",
    description:
      "Ce cours présente les algorithmes et les structures de données fondamentales.",
  },
  {
    id: 5,
    titre: "Systèmes d'exploitation",
    description:
      "Ce cours examine les principes et le fonctionnement des systèmes d'exploitation.",
  },
  {
    id: 6,
    titre: "Réseaux informatiques",
    description:
      "Ce cours aborde les principes et les technologies des réseaux informatiques.",
  },
  {
    id: 7,
    titre: "Programmation orientée objet",
    description:
      "Ce cours explore les concepts et les principes de la programmation orientée objet.",
  },
  {
    id: 8,
    titre: "Développement mobile",
    description:
      "Ce cours se concentre sur le développement d'applications mobiles.",
  },
  {
    id: 9,
    titre: "Intelligence artificielle",
    description:
      "Ce cours explore les fondements et les applications de l'intelligence artificielle.",
  },
  {
    id: 10,
    titre: "Bases de données",
    description:
      "Ce cours couvre les bases de la conception et de la gestion des bases de données.",
  },
  {
    id: 11,
    titre: "Ingénierie logicielle",
    description:
      "Ce cours se concentre sur les processus et les méthodes de l'ingénierie logicielle.",
  },
  {
    id: 12,
    titre: "Sécurité informatique",
    description:
      "Ce cours aborde les principes et les techniques de la sécurité informatique.",
  },
  {
    id: 13,
    titre: "Développement d'applications web",
    description:
      "Ce cours se concentre sur le développement d'applications web modernes.",
  },
  {
    id: 14,
    titre: "Cloud computing",
    description:
      "Ce cours explore les concepts et les technologies du cloud computing.",
  },
  {
    id: 15,
    titre: "Analyse des données",
    description:
      "Ce cours se concentre sur l'analyse et l'interprétation des données.",
  },
  {
    id: 16,
    titre: "Développement Agile",
    description:
      "Ce cours présente les principes et les pratiques du développement Agile.",
  },
  {
    id: 17,
    titre: "Génie logiciel",
    description:
      "Ce cours explore les principes et les méthodes du génie logiciel.",
  },
  {
    id: 18,
    titre: "Développement d'applications distribuées",
    description:
      "Ce cours couvre les concepts et les techniques du développement d'applications distribuées.",
  },
  {
    id: 19,
    titre: "Big Data",
    description:
      "Ce cours explore les technologies et les techniques pour le traitement et l'analyse du Big Data.",
  },
  {
    id: 20,
    titre: "Interface homme-machine",
    description:
      "Ce cours se concentre sur la conception et le développement d'interfaces utilisateur.",
  },
];

const ContentPage = () => {
  const modal = useModal();

  return (
    <div id="content_admin_page">
      <modal.Content />
      <div>
        <h1>Cours</h1>
        <button
          className="learn-button"
          onClick={() => {
            console.log("issou");
            modal.displayModal("CourseCreation");
          }}
        >
          Ajouter un cours
        </button>
      </div>
      <hr />
      <h4>{data.length} cours</h4>
      <ul>
        {data.map((course, key) => (
          <li key={key}>
            <h3 title={course.titre}> {course.titre}</h3>
            <div>
              <p>{course.description}</p>
              <ul>
                <li>
                  <a href={`/admin/content/${course.id}/exercices`}>
                    50 exercices
                  </a>
                </li>
                <li>
                  <a href={`/admin/content/${course.id}`}>3 sets</a>
                </li>
                <li>
                  <a href={`/admin/content/${course.id}/lessons`}>18 leçons</a>
                </li>
                <li>
                  <a href={`/admin/content/${course.id}`}>50 skills</a>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentPage;
