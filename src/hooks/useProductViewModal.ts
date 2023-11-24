import { create } from "zustand";

interface IProductViewModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProductViewModal = create<IProductViewModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProductViewModal;
