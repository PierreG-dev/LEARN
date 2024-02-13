import { FormEvent, useCallback, useEffect, useState } from "react";
import useIconSelect from "../../useIconSelect";
import useRequests from "../../useRequests";
import useDatalistPicker from "../../useDatalistPicker";
import technologies from "../../../utilities/technologies";
import useDifficultySelector from "../../useDifficultySelector";

const categoriesData = ["Front-end", "Back-end", "Dev-ops", "Outils"];

const CourseCreation = () => {
  // --- HOOKS
  const { difficulty, DifficultySelector } = useDifficultySelector({
    top: 60,
    left: 20,
  });
  const { IconSelect, selectedIcon } = useIconSelect();
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

  console.log(technologies.languagesList);

  const request = useRequests();

  // --- STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState();

  // const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   request.fetchToAPI("/api/postCourse", "POST", {
  //     type: "application/json",
  //     content: {},
  //   });
  // }, []);

  return (
    <>
      <h1>Nouveau cours</h1>
      <br />
      <hr />
      <br />

      <DifficultySelector />

      <form onSubmit={() => {}}>
        <div>
          <label htmlFor="title">Intitulé</label>
          <input
            type="text"
            name="title"
            className="learn-input md"
            placeholder="Nom du cours"
          />
        </div>

        <div>
          <label htmlFor="icon">Icône</label>
          {IconSelect}
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
          />
        </div>
      </form>
    </>
  );
};

export default CourseCreation;
