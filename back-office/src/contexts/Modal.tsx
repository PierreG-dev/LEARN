import { createContext } from 'react';
import { IModalContext } from '../types';

const defaultModalContext: IModalContext = {
  Content: () => <></>,
  displayModal: () => 'Default',
};

export const ModalContext = createContext<IModalContext>(defaultModalContext);
