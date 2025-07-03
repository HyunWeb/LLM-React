import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import Sidebar from './components/Sidebar';
import { SidebarProvider } from './context/SidebarContext';

function HomePage() {
  return (
    <div>
      <h1>홈페이지</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
          <li>
            <Link to="/chat">채팅</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
