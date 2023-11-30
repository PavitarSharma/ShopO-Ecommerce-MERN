import React, { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  size?: string;
}

const Modals: React.FC<ModalProps> = ({ isOpen, onClose, body, size }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
        fixed
    inset-0
    flex
    items-center
    justify-center
    z-[10000]
    bg-black/40
    px-4
    
        "
      >
        <div
          style={{
            maxWidth: size ? size : "72rem",
          }}
          className={`
            w-full
            max-h-[610px]
            h-auto
            overflow-y-auto
            overflow-x-hidden
            mx-auto
            rounded-xl
            bg-white
            p-4
            modal-scrollbar
            text-black
            relative
            transition
            duration-300
            shadow-lg
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            `}
        >
          <button className="absolute right-4 top-4">
            <MdClose color="#444" size={24} onClick={handleClose} />
          </button>
          <div>{body}</div>
        </div>
      </div>
    </>
  );
};

export default Modals;
