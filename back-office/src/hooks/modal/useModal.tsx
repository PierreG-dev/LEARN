/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, ReactNode, FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IContentType } from '../../types';
import './index.scss';
import content from './content';
import DOMPurify from 'dompurify';

const contentSelector = (type: IContentType, options: any) => {
  const Content = content[type];
  return <Content options={options} />;
};

type ModalContentProps = {
  displayed: boolean;
  content: ReactNode | string;
  custom: boolean;
  hideModal: () => void;
};

const ModalContent: FC<ModalContentProps> = ({
  displayed,
  content,
  custom,
  hideModal,
}) =>
  displayed && (
    <dialog id="modal" open>
      <div id="modal_dark_background" onClick={hideModal} />
      <div
        id="modal_content"
        style={{ animation: '0.4s modal_fadeIn 1 ease backwards' }}
        dangerouslySetInnerHTML={
          custom ? { __html: DOMPurify.sanitize(content as string) } : undefined
        }
      >
        <FaTimes onClick={hideModal} />
        <div id="content">{!custom && content}</div>
      </div>
    </dialog>
  );

const useModal = () => {
  const [displayed, setDisplayed] = useState(false);
  const [content, setContent] = useState<ReactNode | string>(<></>);
  const [custom, setCustom] = useState<boolean>(false);

  const hideModal = useCallback(() => setDisplayed(false), []);

  // --- Fonction qui permet d'afficher le modal selon différents cas de figures
  //     - Une modal prédéfini avec un type et des options (type = '...' & options)
  //     - Un modal avec un HTML sous forme de string (type = custom & content)
  const displayModal = useCallback(
    (type: IContentType | 'custom' | 'default', options: any = {}) => {
      if (type === 'default' || (type === 'custom' && !options.customContent))
        return;
      setContent(
        type === 'custom'
          ? options.customContent
          : contentSelector(type, options)
      );
      setCustom(type === 'custom');
      setDisplayed(true);
    },
    []
  );

  return {
    Content: () => (
      <ModalContent
        displayed={displayed}
        content={content}
        custom={custom}
        hideModal={hideModal}
      />
    ),
    displayModal,
  };
};

export default useModal;
