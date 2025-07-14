import api from "./index";

export const getChatList = async (chatId) => {
  return await api.get(`/api/chats/${chatId}`);
};
