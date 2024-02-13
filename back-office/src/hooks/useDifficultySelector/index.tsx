import { ChangeEvent, memo, useCallback, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "./index.scss";

type IDifficulty = 1 | 2 | 3 | 4 | 5;
type IProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

function useDifficultySelector(props: IProps) {
  const [difficulty, setDifficulty] = useState<IDifficulty>(3); // Initial difficulty level

  console.log("difficulty" + difficulty);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setDifficulty(value as IDifficulty);
  }, []);

  const pointerPositionPicker = useCallback((difficulty: IDifficulty) => {
    console.log((120 / 5) * difficulty - 120 / 6);
    return (120 / 5) * difficulty - 120 / 6;
  }, []);

  const difficultyToText = useCallback((difficulty: IDifficulty) => {
    switch (difficulty) {
      case 1:
        return "Débutant";
      case 2:
        return "Intermédiaire";
      case 3:
        return "Confirmé";
      case 4:
        return "Virtuose";
      case 5:
        return "Grand maître";
      default:
        throw "Erreur: Difficultée non conforme";
    }
  }, []);

  const DifficultySelector = () => (
    <div className="difficulty-container" style={props}>
      <input
        type="range"
        min="1"
        max="5"
        className="difficulty-selector"
        value={difficulty}
        onChange={handleChange}
      />
      <em className="learn-note">{difficultyToText(difficulty)}</em>
      <IoChevronDown
        className="difficulty-pointer"
        style={{ left: pointerPositionPicker(difficulty) }}
      />
    </div>
  );

  return { difficulty, DifficultySelector };
}

export default useDifficultySelector;
