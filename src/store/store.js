import { create } from "zustand";

const useAuthStore = create((set) => ({
  userEmail: null,
  setUserEmail: (email) => set({ userEmail: email }),
}));

export default useAuthStore;
