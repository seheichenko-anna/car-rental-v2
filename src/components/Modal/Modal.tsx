import { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal') as HTMLElement;

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleBackdropClick} className={s.backdrop}>
      <div className={s.modal}>
        <button onClick={closeModal} className={s.btn_close}>
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
