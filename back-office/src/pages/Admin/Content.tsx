import { useLocation, useParams } from "react-router-dom";

// --- Routes
import ContentPage from "../../components/Admin/Content";
import CoursePage from "../../components/Admin/Content/Course";
import ChapterPage from "../../components/Admin/Content/Chapter";
import ExercicesPage from "../../components/Admin/Content/Exercices";
import ExercicePage from "../../components/Admin/Content/Exercices/Exercice";
import ExerciceSetPage from "../../components/Admin/Content/ExerciceSet";
import LessonPage from "../../components/Admin/Content/Lesson";
import SubchapterPage from "../../components/Admin/Content/SubChapter";

const Content = () => {
  // --- Récupération des différents paramètres d'URL
  const {
    courseId,
    exerciceId,
    exerciceSetId,
    chapterId,
    subchapterId,
    lessonId,
  } = useParams();
  const location = useLocation();

  /**
   * Fonction qui sert à choisir quelle partie de la page afficher en fonction de l'URL
   * @return Un composant adapté à l'URL
   */
  const pagePicker = () => {
    if (location.pathname === "/admin/content") {
      return <ContentPage />;
    } else if (location.pathname === `/admin/content/${courseId}`) {
      return <CoursePage />;
    } else if (location.pathname === `/admin/content/${courseId}/exercices`) {
      return <ExercicesPage />;
    } else if (
      location.pathname === `/admin/content/${courseId}/exercices/${exerciceId}`
    ) {
      return <ExercicePage />;
    } else if (
      location.pathname ===
      `/admin/content/${courseId}/exerciceSet/${exerciceSetId}`
    ) {
      return <ExerciceSetPage />;
    } else if (
      location.pathname === `/admin/content/${courseId}/chapter/${chapterId}`
    ) {
      return <ChapterPage />;
    } else if (
      location.pathname ===
      `/admin/content/${courseId}/chapter/${chapterId}/subchapter/${subchapterId}`
    ) {
      return <SubchapterPage />;
    } else if (location.pathname === `/admin/content/${courseId}`) {
      return <LessonPage />;
    }
  };

  return pagePicker();
};

export default Content;
