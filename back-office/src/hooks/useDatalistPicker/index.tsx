import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";
import "./index.scss";

/**
 * @typedef {Object} IProps - Les propriétés du composant.
 * @property {string[]} dataset - Les données à afficher dans la liste.
 * @property {boolean} [multiple=false] - Indique si la sélection multiple est activée.
 * @property {string} [placeholder] - Placeholder pour l'input.
 */

/**
 * Hook personnalisé pour la sélection de données avec une liste déroulante.
 * @param {IProps} props - Les propriétés du composant.
 * @returns {{DatalistPicker: JSX.Element, selectedData: string[] | string, setSelectedData: Function}}
 */
const useDatalistPicker = ({ dataset, multiple = false, placeholder }) => {
  /** Permet de savoir si l'input est en focus ou non */
  const [isInputFocused, setIsInputFocused] = useState(false);
  /** Donnée sélectionnée; peut être une chaîne ou un tableau de chaînes */
  const [selectedData, setSelectedData] = useState(multiple ? [] : "");
  /** Valeur de l'input de recherche */
  const [searchTerm, setSearchTerm] = useState("");
  /** Contenu de la liste à afficher (après filtrage) */
  const [filteredOptions, setFilteredOptions] = useState([]);

  /** Référence pour l'input */
  const input = useRef(null);
  /** Référence pour la dataList */
  const dataList = useRef(null);
  /** Référence pour la tagList */
  const tagList = useRef(null);

  /**
   * Effet pour filtrer les options en fonction du terme de recherche.
   */
  useEffect(() => {
    const filtered = dataset
      .filter((data) => data.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 50); // Limiter à 50 résultats
    setFilteredOptions(filtered);
  }, [searchTerm, dataset]);

  /**
   * Fonction pour gérer la sélection d'une donnée.
   * @param {string} value - La valeur sélectionnée.
   */
  const handleDataSelect = useCallback(
    (value) => {
      if (multiple) {
        setSelectedData((prevState) => {
          const alreadySelected = prevState.includes(value);
          const copy = [...prevState];
          if (alreadySelected) return copy.filter((item) => item !== value);
          copy.push(value);
          return copy;
        });
      } else {
        setSelectedData(value);
        setSearchTerm(value);
      }
    },
    [multiple]
  );

  /**
   * Fonction pour supprimer un élément sélectionné (uniquement pour la sélection multiple).
   * @param {string} value - La valeur à supprimer.
   */
  const handleDeleteItem = useCallback((value) => {
    setTimeout(() => {
      setSelectedData((prevState) => {
        if (Array.isArray(prevState))
          return prevState.filter((item) => item !== value);
        return "error";
      });
    }, 5);
  }, []);

  /**
   * Fonction pour mettre à jour le terme de recherche.
   * @param {ChangeEvent<HTMLInputElement>} e - L'événement de changement de l'input.
   */
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  /**
   * Fonction pour mettre en focus l'input.
   */
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  /**
   * Fonction pour gérer le blur de l'input.
   * @param {MouseEvent} e - L'événement de clic.
   */
  const handleInputBlur = useCallback((e) => {
    if (
      e.target !== input.current &&
      e.target !== dataList.current &&
      e.target &&
      tagList.current &&
      !dataList.current?.contains(e.target) &&
      !tagList.current.contains(e.target)
    )
      setIsInputFocused(false);
  }, []);

  /**
   * Effet pour ajouter et retirer l'écouteur de clic sur le document.
   */
  useEffect(() => {
    document.addEventListener("click", handleInputBlur);

    return () => document.removeEventListener("click", handleInputBlur);
  }, []);

  /**
   * Composant DatalistPicker.
   */
  const DatalistPicker = (
    <div>
      <input
        ref={input}
        onFocus={handleInputFocus}
        className="learn-input"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder || "Entrez votre recherche..."}
      />

      <ul
        ref={dataList}
        id="data_list"
        className={isInputFocused ? "visible" : ""}
      >
        {filteredOptions.map((data, key) => (
          <li
            key={key}
            onClick={() => {
              handleDataSelect(data);
            }}
          >
            {data}
            <FaCheck style={{ opacity: selectedData.includes(data) ? 1 : 0 }} />
          </li>
        ))}
      </ul>
      {multiple && Array.isArray(selectedData) && (
        <ul ref={tagList} id="selected_tag_list">
          {selectedData.map((item, key) => (
            <li key={key} onClick={() => handleDeleteItem(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // Retourne les éléments nécessaires
  return {
    DatalistPicker,
    selectedData,
    setSelectedData,
  };
};

export default useDatalistPicker;
