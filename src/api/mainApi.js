import api from "./index";

export const getChatList = async (chatId) => {
  // return await api.get(`/api/chats/${chatId}`);
  return [
    {
      text: "안녕",
      isUser: true,
      timestamp: new Date(),
    },
    {
      text: "안녕하세요. 저는 챗봇입니다. 무엇을 도와드릴까요?",
      isUser: false,
      timestamp: new Date(),
      feedback: null,
      isTyping: true,
    },
  ];
};
