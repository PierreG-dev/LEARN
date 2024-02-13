import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import useRequests from "../../useRequests";
import useDatalistPicker from "../../useDatalistPicker";
import technologies from "../../../utilities/technologies";
import useDifficultySelector from "../../useDifficultySelector";
import iconsList from "../../../utilities/iconsList";

const categoriesData = ["Front-end", "Back-end", "Dev-ops", "Outils"];

const CourseCreation = () => {
  const form = useRef<HTMLFormElement | null>(null);
  // --- HOOKS
  const { difficulty, DifficultySelector } = useDifficultySelector({
    top: 60,
    left: 20,
  });
  const iconSelector = useDatalistPicker({
    dataset: Object.keys(iconsList),
    multiple: false,
    placeholder: "Selectionnez une icône",
    alt: "icons",
  });
  const categoriesSelector = useDatalistPicker({
    dataset: categoriesData,
    multiple: true,
    placeholder: "Selectionnez des domaines",
  });

  const languagesSelector = useDatalistPicker({
    dataset: technologies.languagesList,
    multiple: true,
    placeholder: "Selectionnez des technologies",
    alt: "languages",
  });

  const request = useRequests();

  // --- STATES
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (request.pendingRequest) return;
      request.fetchToAPI("/api/postCourse", "POST", {
        type: "application/json",
        content: JSON.stringify({
          title: title,
          description,
          categories: categoriesSelector.selectedData,
          languages: languagesSelector.selectedData,
          iconName: iconSelector.selectedData,
          difficulty: difficulty,
        }),
      });
    },
    [
      title,
      description,
      categoriesSelector.selectedData,
      languagesSelector.selectedData,
      languagesSelector.selectedData,
      iconSelector.selectedData,
      difficulty,
      request.pendingRequest,
    ]
  );

  return (
    <>
      <h1>Nouveau cours</h1>
      <br />
      <hr />
      <br />

      <DifficultySelector />

      <form ref={form}>
        {request.data && (
          <em className="learn-note">{request.errorHandler.error.msg}</em>
        )}
        <div>
          <label htmlFor="title">Intitulé</label>
          <input
            type="text"
            name="title"
            className="learn-input md"
            placeholder="Nom du cours"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="icon">Icône</label>
          {iconSelector.DatalistPicker}
        </div>

        <div>
          <label htmlFor="categories">Catégories</label>
          {categoriesSelector.DatalistPicker}
        </div>

        <div>
          <label htmlFor="languages">Languages</label>
          {languagesSelector.DatalistPicker}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="learn-input"
            cols={40}
            rows={5}
            style={{ resize: "none" }}
            placeholder="Brève description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </form>
      <button
        type="button"
        className="learn-button"
        onClick={(e) => handleSubmit(e)}
      >
        Créer le cours {request.statusIcon}
      </button>
    </>
  );
};

export default CourseCreation;
