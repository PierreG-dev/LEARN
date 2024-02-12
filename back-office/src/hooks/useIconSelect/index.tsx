import { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { IconType } from "react-icons";
import { IoChevronDown } from "react-icons/io5";
import iconGenerator from "../../utilities/iconGenerator";

import "./index.scss";

// Import des icônes
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as FaBrands from "react-icons/fa";

// Liste des icônes
const iconsList: { [index: string]: IconType } = {
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...CgIcons,
  ...FaIcons,
  ...FiIcons,
  ...GiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TiIcons,
  ...VscIcons,
  ...FaBrands,
};

const useIconSelect = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<
    { name: string; value: string; icon: JSX.Element | undefined }[]
  >([]);

  // Convertir l'objet iconsList en un tableau d'options
  const options = Object.keys(iconsList).map((icon) => ({
    name: icon,
    value: icon,
    icon: iconGenerator(icon),
  }));

  useEffect(() => {
    // Filtrer les options en fonction du terme de recherche
    const filtered = options
      .filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 50); // Limiter à 50 résultats
    setFilteredOptions(filtered);
  }, [searchTerm]);

  const handleIconSelect = (value: string) => {
    setSelectedIcon(value);
    setSearchTerm(value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!Object.keys(iconsList).includes(e.target.value)) setSearchTerm("");
    setIsInputFocused(false);
  };

  const IconSelect = (
    <div>
      <input
        onFocus={handleInputFocus}
        className="learn-input md"
        onBlur={handleInputBlur}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Sélectionnez une icône..."
      />

      <IoChevronDown
        className={`iconlist-chevron ${isInputFocused ? "rotated" : ""}`}
      />

      <ul id="icons_list" className={isInputFocused ? "visible" : ""}>
        {filteredOptions.map((option) => (
          <li key={option.value} onClick={() => handleIconSelect(option.value)}>
            {option.icon}
            <span dangerouslySetInnerHTML={{ __html: option.name }} />
          </li>
        ))}
      </ul>
    </div>
  );

  return {
    IconSelect,
    selectedIcon,
    setSelectedIcon,
  };
};

export default useIconSelect;
