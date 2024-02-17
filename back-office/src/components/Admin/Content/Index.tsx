import { Link } from "react-router-dom";
import "./index.scss";
import useModal from "../../../hooks/modal/useModal";
import { FaLongArrowAltRight } from "react-icons/fa";
import iconGenerator from "../../../utilities/iconGenerator";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index.ts";
import { useCallback } from "react";
import useRequests from "../../../hooks/useRequests.tsx";

const ContentPage = () => {
  const modal = useModal();
  const courses = useSelector((state: RootState) => state.data.courses || []);
  const request = useRequests();

  const handleCourseLock = useCallback((courseId: string) => {
    request.fetchToAPI("/api/lockCourse", "PUT", {
      type: "application/json",
      content: JSON.stringify({
        courseId,
      }),
    });
  }, []);

  return (
    <div id="content_admin_page">
      <modal.Content />
      <div>
        <h1>Cours</h1>
        <button
          className="learn-button"
          onClick={() => {
            modal.displayModal("CourseCreation");
          }}
        >
          Ajouter un cours
        </button>
      </div>
      <hr />
      <h4>{courses.length} cours</h4>
      <ul>
        {courses.map((course, key) => (
          <li key={key}>
            <header>
              {iconGenerator(course.iconName)}
              <h3 title={course.title}> {course.title}</h3>
            </header>
            <div>
              <p>{course.description}</p>
              <ul>
                <li>
                  <Link to={`/admin/content/${course._id}/exercices`}>
                    50 exercices
                  </Link>
                </li>
                <li>
                  <Link to={`/admin/content/${course._id}`}>3 sets</Link>
                </li>
                <li>
                  <Link to={`/admin/content/${course._id}/lessons`}>
                    18 leçons
                  </Link>
                </li>
                <li>
                  <Link to={`/admin/content/${course._id}`}>50 skills</Link>
                </li>
              </ul>
            </div>
            <footer>
              <button
                className="lock-button"
                onClick={() => handleCourseLock(course._id)}
                style={course.isLocked ? { background: "orangered" } : {}}
              >
                {course.isLocked ? <BiLock /> : <BiLockOpen />}
              </button>
              <Link to={`/admin/content/${course._id}`}>
                <FaLongArrowAltRight />
              </Link>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentPage;
