import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store/index.ts";
import useDifficultySelector from "../../../../hooks/useDifficultySelector";
import "./index.scss";
import useDatalistPicker from "../../../../hooks/useDatalistPicker/index.tsx";
import technologies from "../../../../utilities/technologies.tsx";
import { useEffect } from "react";
import useRequests from "../../../../hooks/useRequests.tsx";
import useSkillManager from "../../../../hooks/modal/useSkillManager/index.tsx";
import iconGenerator from "../../../../utilities/iconGenerator.tsx";

const CoursePage = () => {
  const { courseId } = useParams();
  const course = useSelector((state: RootState) => state.data.courses)?.find(
    (course) => course._id === courseId
  );
  const request = useRequests();
  const difficultySelector = useDifficultySelector({
    position: "relative",
    fixedDifficulty: course?.difficulty,
  });

  const languagesSelector = useDatalistPicker({
    dataset: technologies.languagesList,
    alt: "languages",
    multiple: true,
    defaultSet: course?.languages,
  });

  const skillsManager = useSkillManager({
    courseId: course?._id,
    defaultSet: course?.skills,
  });

  useEffect(() => {
    if (course && course.languages !== languagesSelector.selectedData)
      request.fetchToAPI("/api/putCourse", "PUT", {
        type: "application/json",
        content: JSON.stringify({
          courseId: course._id,
          updatedData: { languages: languagesSelector.selectedData },
        }),
      });
  }, [languagesSelector.selectedData]);

  return (
    <div id="course_admin_page">
      <section id="title_difficulty">
        <h1>
          {iconGenerator(course?.iconName)}
          {course?.title}
        </h1>

        <difficultySelector.DifficultySelector />
      </section>
      <section id="languages_skills">
        <article id="languages">
          <h2>Langages</h2>
          <div className="content">{languagesSelector.DatalistPicker}</div>
        </article>
        <article id="skills">
          <h2>Skills</h2>
          <div className="content">{skillsManager.SkillsManager}</div>
        </article>
      </section>
      <section id="exercices">
        <h2>Exercices</h2>
        <div className="content"></div>
      </section>
      <section id="chapters">
        <h2>Chapitres</h2>
        <div className="content"></div>
      </section>
      <section id="exercices_sets">
        <h2>Sets d'exercices</h2>
        <div className="content"></div>
      </section>
    </div>
  );
};

export default CoursePage;
