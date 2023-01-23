import Composants from './Composants';
import Context from './Contexts';
import Hooks from './Hooks';
import Introduction from './Introduction';
import Optimisation from './Optimisation';
import Props from './Props';
import ReactRouter from './ReactRouter';
import Helmet from './Helmet';
import CyclesDeVie from './CyclesDeVie';
import Structure from './Structure';

export default [
  {
    nom: 'Introduction',
    jsx: <Introduction />,
    from: 'Composants',
  },
  {
    nom: 'Structure',
    jsx: <Structure />,
    from: 'Composants',
  },
  {
    nom: 'Les composants',
    jsx: <Composants />,
    from: 'Composants',
  },
  {
    nom: 'Les props',
    jsx: <Props />,
    from: 'Props',
  },
  {
    nom: 'Cycles de vie',
    jsx: <CyclesDeVie />,
    from: 'States',
  },
  {
    nom: 'Les hooks',
    jsx: <Hooks />,
    from: 'States',
  },
  {
    nom: 'Optimisation des composants',
    jsx: <Optimisation />,
    from: 'Optimisation',
  },
  {
    nom: 'Routing',
    jsx: <ReactRouter />,
    from: 'Routing',
  },
  {
    nom: 'Headers',
    jsx: <Helmet />,
    from: 'Headers',
  },
  {
    nom: 'Contextes',
    jsx: <Context />,
    from: 'Contextes',
  },
];
