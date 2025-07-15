import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import "./ChatPage.css";
import { useNavigate } from "react-router-dom";
import { newinputTextStore } from "../store/store";

export default function MainPage() {
  const [robotAnimationData, setRobotAnimationData] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { newinputText, setNewInputText, shouldAutoSend, setShouldAutoSend } =
    newinputTextStore();

  // 로봇 애니메이션 로딩
  useEffect(() => {
    // Dynamically import the Lottie animation data
    fetch("/lottie_robot.json")
      .then((response) => response.json())
      .then((data) => setRobotAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  // 로그인 여부 확인
  const isLoggedIn = !!localStorage.getItem("userEmail");

  // 텍스트 입력 처리 및 높이 자동 조절
  const handleTextChange = (e) => {
    setInputText(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // textarea 높이 자동 조절 함수
  const adjustTextareaHeight = (element) => {
    if (!element) return;

    // 내용에 따라 높이 조절
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  };

  // textarea 참조가 설정되었을 때 초기 높이 설정
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, []); // 메시지 목록이 변경될 때마다 실행

  // 메시지 전송 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // api 요청 : 현재 채팅방 개설 상태확인
    setNewInputText(inputText);
    setShouldAutoSend(true);
    navigate(`/chat/${1}`);
  };

  // 키 입력 처리 핸들러
  const handleKeyDown = (e) => {
    // 쉬프트 + 엔터인 경우 줄바꿈 처리
    if (e.key === "Enter" && e.shiftKey) {
      // 기본 동작(폼 제출) 방지
      e.preventDefault();
      // 커서 위치에 줄바꿈 추가
      const cursorPosition = e.target.selectionStart;
      const newText =
        inputText.substring(0, cursorPosition) +
        "\n" +
        inputText.substring(cursorPosition);

      setInputText(newText);

      // 다음 렌더링 후 커서 위치 조정
      setTimeout(() => {
        e.target.selectionStart = cursorPosition + 1;
        e.target.selectionEnd = cursorPosition + 1;
      }, 0);
    }
    // 그냥 엔터만 누른 경우 폼 제출
    else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div className="chat-bg">
        <div className={`chat-container empty-chat`}>
          <div className="initial-layout">
            <div className="title-container">
              <div className="robot-container">
                <Lottie
                  animationData={robotAnimationData}
                  className="robot-animation"
                />
              </div>
              <h1 className="chat-title">무엇을 도와드릴까요?</h1>
            </div>
            <div className="chat-center initial-chat">
              {/* 초기 화면에서만 보이는 입력 폼 */}
              <form className="chat-form" onSubmit={handleSubmit}>
                <textarea
                  ref={textareaRef}
                  className="chat-input"
                  placeholder={
                    isLoggedIn
                      ? "무엇이든 입력하세요"
                      : "채팅을 이용하시려면 로그인이 필요합니다."
                  }
                  value={inputText}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  disabled={!isLoggedIn}
                  rows={1}
                />
                <button
                  className="chat-send"
                  type="submit"
                  disabled={!inputText.trim() || !isLoggedIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                    />
                  </svg>
                </button>
              </form>
              <div className="chat-guide">
                실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
