import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import MainPage from "./pages/MainPage";
import ChatsPage from "./pages/ChatsPage";
import Modal from "./components/Modal";
import { useChatMenuStore, useCustomAlertStore } from "./store/store";
import AlertModal from "./components/Modal/AlertModal";
import EditModal from "./components/Modal/EditModal";
import CustomAlert from "./components/Modal/CustomAlert";

function App() {
  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useChatMenuStore();
  const { isCustomAlertOpen, setIsCustomAlertOpen } = useCustomAlertStore();
  return (
    <SidebarProvider>
      <Router>
        <Sidebar />
        {/* 삭제 모달 */}
        {isAlertModalOpen && (
          <Modal>
            <AlertModal setIsAlertModalOpen={setIsAlertModalOpen} />
          </Modal>
        )}
        {/* 수정 모달 */}
        {isEditModalOpen && (
          <Modal>
            <EditModal setIsEditModalOpen={setIsEditModalOpen} />
          </Modal>
        )}
        {/* 커스텀 모달 */}
        {isCustomAlertOpen && (
          <CustomAlert setIsCustomAlertOpen={setIsCustomAlertOpen} />
        )}
        {/* 라우트 */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatsPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
