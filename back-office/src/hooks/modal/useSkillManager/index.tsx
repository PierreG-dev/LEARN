import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./index.scss";
import { IoIosAdd } from "react-icons/io";
import useRequests from "../../useRequests";

type IProps = {
  defaultSet?: string[];
  courseId?: string;
};

const useSkillManager = ({ courseId, defaultSet = [] }: IProps) => {
  const request = useRequests();
  // --- Liste des skills
  const [skills, setSkills] = useState<string[]>(defaultSet);
  // --- State pour gérer l'input
  const [input, setInput] = useState<string>("");

  // --- Met à jout la liste des skills si un defaultSet arrive après l'instanciation du hook
  useEffect(() => {
    if (JSON.stringify(skills) !== JSON.stringify(defaultSet)) {
      setSkills(defaultSet);
    }
  }, [defaultSet]);

  const handleAddSkill = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // Vérification de la présence du courseId
      if (!courseId) return;

      // --- Vérification d'un potentiel doublon
      if (skills.includes(input.charAt(0).toUpperCase() + input.slice(1)))
        return;

      // --- Ajout du nouveau skill
      request.fetchToAPI("/api/postSkill", "POST", {
        type: "application/json",
        content: JSON.stringify({
          courseId: courseId,
          skillName: input,
        }),
      });
      setInput("");
    },
    [input, skills]
  );

  const deleteSkill = useCallback(
    (skill: string) => {
      // --- Vérification de la présence du courseId
      if (!courseId) return;
      // --- Vérificatio nde la présence du skill à supprimer
      if (!skills.includes(skill)) return;

      // --- Suppression du skill
      request.fetchToAPI("/api/deleteSkill", "PUT", {
        type: "application/json",
        content: JSON.stringify({
          courseId: courseId,
          skillName: skill,
        }),
      });
    },
    [skills]
  );

  const SkillsManager = useMemo(
    () => (
      <div className="skills-manager-container">
        <form className="input-button-container" onSubmit={handleAddSkill}>
          <input
            type="text"
            className="learn-input"
            placeholder="Entrez un nom"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
          <button className="learn-button" type="submit">
            <IoIosAdd />{" "}
          </button>
        </form>
        <br />
        {skills.length === 0 && (
          <em className="learn-note">
            Aucun skill associé à ce cours pour le moment
          </em>
        )}
        {skills.length !== 0 && <hr className="learn-separator" />}
        <ul>
          {skills.map((skill: string, key: number) => (
            <li key={key} onClick={() => deleteSkill(skill)}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    ),
    [skills, input]
  );

  return {
    skills,
    setSkills,
    SkillsManager,
  };
};

export default useSkillManager;
