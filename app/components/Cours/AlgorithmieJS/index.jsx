import Fonctions from './Fonctions';
import Operateurs from './Operateurs';
import StructuresDeControle from './StructuresDeContrôle';
import TypeArray from './TypeArray';
import TypeNumber from './TypeNumber';
import TypeObject from './TypeObject';
import Types from './Types';
import TypeString from './TypeString';
import Variables from './Variables';
import StructuresDeDonnees from './StructuresDeDonnees';

export default [
  {
    nom: 'Variables',
    jsx: <Variables />,
    access: true,
  },
  {
    nom: 'Types de valeurs',
    jsx: <Types />,
    access: true,
  },
  {
    nom: 'Opérateurs',
    jsx: <Operateurs />,
    access: true,
  },
  {
    nom: 'Structures de contrôle',
    jsx: <StructuresDeControle />,
    access: true,
  },
  {
    nom: 'Structures de données',
    jsx: <StructuresDeDonnees />,
    access: false,
  },
  {
    nom: 'Fonctions',
    jsx: <Fonctions />,
    access: false,
  },

  // {
  //   nom: 'Type Number',
  //   jsx: <TypeNumber />,
  // },
  // {
  //   nom: 'Type String',
  //   jsx: <TypeString />,
  // },
  // {
  //   nom: 'Type Array',
  //   jsx: <TypeArray />,
  // },
  // {
  //   nom: 'Type Object',
  //   jsx: <TypeObject />,
  // },
];

/*
JavaScript ................................................................................................................................... 1
Algorithmie ............................................................................................................................ 3
Les variables ...................................................................................................................... 3
Types de valeur .................................................................................................................. 3
Opérateurs ......................................................................................................................... 4
Structures de contrôle ....................................................................................................... 6
Fonctions ......................................................................................................................... 10
Type String ....................................................................................................................... 11
Type Array ....................................................................................................................... 12
Type Object...................................................................................................................... 14
Type Number ................................................................................................................... 15
API Fetch .............................................................................................................................. 16
Async | Await....................................................................................................................... 17
Programmation Orientée Objet .......................................................................................... 18
Introduction ..................................................................................................................... 18
Classes personnalisées .................................................................................................... 18
Méthodes ........................................................................................................................ 19
Création d’une instance .................................................................................................. 21
*/
