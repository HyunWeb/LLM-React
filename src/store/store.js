import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   userEmail: null,
//   setUserEmail: (email) => set({ userEmail: email }),
// }));

export const newinputTextStore = create((set) => ({
  newinputText: "",
  setNewInputText: (text) => set({ newinputText: text }),
  shouldAutoSend: false,
  setShouldAutoSend: (value) => set({ shouldAutoSend: value }),
}));

export const useChatMenuStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (value) => set({ isMenuOpen: value }),
  isAlertModalOpen: false,
  setIsAlertModalOpen: (value) => set({ isAlertModalOpen: value }),
  isEditModalOpen: false,
  setIsEditModalOpen: (value) => set({ isEditModalOpen: value }),
}));
export const useCustomAlertStore = create((set) => ({
  isCustomAlertOpen: false,
  setIsCustomAlertOpen: (value) => set({ isCustomAlertOpen: value }),
  alertTitle: "",
  setAlertTitle: (title) => set({ alertTitle: title }),
  alertMessage: "",
  setAlertMessage: (message) => set({ alertMessage: message }),
  alertType: "success",
  setAlertType: (type) => set({ alertType: type }),
}));
