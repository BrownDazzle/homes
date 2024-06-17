import { create } from 'zustand';
import { CreateUserParams } from '../types';

interface ReservationModalStore {
  isOpen: boolean;
  propertyUserId: string,
  conversationId: string,
  onOpen: () => void;
  onClose: () => void;
}

const useReservationModal = create<ReservationModalStore>((set) => ({
  isOpen: false,
  propertyUserId: '',
  conversationId: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useReservationModal;
