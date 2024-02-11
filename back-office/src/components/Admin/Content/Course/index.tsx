import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();

  return <h1>Course n°{courseId}</h1>;
};

export default CoursePage;
