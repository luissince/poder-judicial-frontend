import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onHidden: () => void;
  onClose?: () => void;
  ref?: React.RefObject<ReactModal>;
  children: React.ReactNode;
}

Modal.setAppElement('#root');

const CustomModal: React.FC<ModalProps> = ({ isOpen, onOpen, onHidden, onClose, children, ref }) => {
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxHeight: '90%',
      overflow: 'auto', // Habilitar desplazamiento vertical
      borderRadius: '8px', // Opcional: ajusta según tus preferencias
    },
  };

  return (
    <Modal
      ref={ref}
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onAfterClose={onHidden}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onClose}
      style={customModalStyles}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-none shadow-lg p-0 flex"
      overlayClassName="fixed z-[1000] top-0 left-0 w-full h-full bg-gray-900 bg-opacity-30 flex items-center justify-center"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;