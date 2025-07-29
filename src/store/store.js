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
  isSidebarOpen: false,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),
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

// 채팅 목록 관리
export const useChatListStore = create((set) => ({
  chatList: [],
  setChatList: (chatList) => set({ chatList }),
  addChat: (newChat) =>
    set((state) => ({
      chatList: [...state.chatList, newChat],
    })),
  updateChatList: (updatedList) => set({ chatList: updatedList }),
}));

export const useChatIdStore = create((set) => ({
  chatId: "",
  setChatId: (id) => set({ chatId: id }),
}));

export const useChatListNameStore = create((set) => ({
  chatListName: [],
  setChatListName: (name) => set({ chatListName: name }),
}));

export const useChatListLoadingStore = create((set) => ({
  chatListLoading: true,
  setChatListLoading: (loading) => set({ chatListLoading: loading }),
}));
