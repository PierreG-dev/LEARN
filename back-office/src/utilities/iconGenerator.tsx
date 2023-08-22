import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as FaBrands from 'react-icons/fa';
import { IconType } from '@react-icons/all-files';

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

const iconGenerator = (iconName: string) => {
  if (!iconName || !iconsList[iconName]) return;
  const IconComponent = iconsList[iconName];

  return <IconComponent />;
};

export default iconGenerator;
