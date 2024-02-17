import { useParams } from "react-router-dom";

const ChapterPage = () => {
  const { pathname: url } = useParams();

  return <h1>ChapterPage{url}</h1>;
};

export default ChapterPage;
