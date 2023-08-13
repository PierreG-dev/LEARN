import { useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import styled from "styled-components";

const Chapter = () => {
  const data = useSelector((state: RootState) => state.globalData.data);
  console.log(data);

  return (
    <MainContainer>
      <ul>
        {data.map(() => (
          <li>issou</li>
        ))}
      </ul>
    </MainContainer>
  );
};

const MainContainer = styled.div``;

export default Chapter;
