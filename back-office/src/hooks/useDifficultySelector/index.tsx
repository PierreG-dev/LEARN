import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "./index.scss";

type IDifficulty = 1 | 2 | 3 | 4 | 5;
type IProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  position?: "absolute" | "relative";
  defaultDifficulty?: IDifficulty;
  fixed?: boolean;
};

function useDifficultySelector({
  defaultDifficulty,
  fixed = false,
  ...props
}: IProps) {
  const [difficulty, setDifficulty] = useState<IDifficulty>(
    defaultDifficulty || 3
  );

  // --- Permet de mettre à jour la difficultée en cas de changement du props
  useEffect(
    () => setDifficulty((defaultDifficulty as IDifficulty) || 3),
    [defaultDifficulty]
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setDifficulty(value as IDifficulty);
  }, []);

  const pointerPositionPicker = useCallback((difficulty: IDifficulty) => {
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

  const DifficultySelector = memo(() => (
    <div className="difficulty-container" style={props}>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        className="difficulty-selector"
        value={difficulty}
        disabled={fixed ? true : false}
        onChange={handleChange}
      />
      <em className="learn-note">{difficultyToText(difficulty)}</em>
      <IoChevronDown
        className="difficulty-pointer"
        style={{ left: pointerPositionPicker(difficulty) }}
      />
    </div>
  ));

  return { difficulty, DifficultySelector };
}

export default useDifficultySelector;
