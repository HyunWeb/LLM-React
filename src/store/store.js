import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userEmail: null,
  setUserEmail: (email) => set({ userEmail: email }),
}));

export const newinputTextStore = create((set) => ({
  newinputText: "",
  setNewInputText: (text) => set({ newinputText: text }),
  shouldAutoSend: false,
  setShouldAutoSend: (value) => set({ shouldAutoSend: value }),
}));
