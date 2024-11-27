interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return;

  return (
    <div>
      <h2>{title}</h2>
      <button
        className="text-gray-500 hover:text-gray-700 font-bold text-xl"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Modal;
