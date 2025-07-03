import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Header from "../components/Header";
import "./ChatPage.css";
import { sendMessage, formatMessagesForAPI } from "../api/chatApi";

// 좋아요/싫어요 아이콘 컴포넌트
const ThumbUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const ThumbDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
  </svg>
);

// 복사 아이콘 컴포넌트 추가
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [robotAnimationData, setRobotAnimationData] = useState(null);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fullResponse, setFullResponse] = useState("");
  const typingSpeedRef = useRef(30); // 타이핑 속도 (ms)
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackMessageIndex, setFeedbackMessageIndex] = useState(null);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);

  // 로그인 여부 확인
  const isLoggedIn = !!localStorage.getItem("userEmail");

  // 환경변수 디버깅
  useEffect(() => {
    console.log("환경변수 확인:", {
      apiKey: process.env.REACT_APP_OPENAI_API_KEY ? "설정됨" : "설정안됨",
      allEnvVars: process.env,
    });
  }, []);

  useEffect(() => {
    // Dynamically import the Lottie animation data
    fetch("/lottie_robot.json")
      .then((response) => response.json())
      .then((data) => setRobotAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  // 채팅창 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      // 모바일 환경에서 스크롤이 제대로 작동하도록 약간의 지연 추가
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [messages]);

  // 첫 번째 메시지가 추가될 때 레이아웃 조정
  useEffect(() => {
    if (messages.length === 1) {
      // 레이아웃이 변경된 후 스크롤 재조정
      setTimeout(() => {
        window.scrollTo(0, 0);
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 300);
    }
  }, [messages.length]);

  // 타이핑 효과 구현
  useEffect(() => {
    let timeoutId = null;

    if (isTyping && fullResponse) {
      if (displayedResponse.length < fullResponse.length) {
        const randomSpeed = Math.floor(Math.random() * 15) + 15; // 15-30ms 사이로 속도 조정

        timeoutId = setTimeout(() => {
          // 다음 문자가 마침표나 쉼표인 경우 약간 더 긴 지연 추가
          const nextChar = fullResponse[displayedResponse.length];
          const isBreakPoint = [".", ",", "!", "?", ":", ";", "\n"].includes(
            nextChar
          );

          // 한 번에 추가할 글자 수 제한
          const charsToAdd = Math.min(
            Math.floor(Math.random() * 2) + 1, // 1-2글자로 제한
            fullResponse.length - displayedResponse.length
          );

          // 함수형 업데이트 사용
          setDisplayedResponse((prev) =>
            fullResponse.substring(0, prev.length + charsToAdd)
          );

          // 문장 부호에서는 잠시 멈추는 효과
          if (isBreakPoint) {
            typingSpeedRef.current = Math.floor(Math.random() * 150) + 100; // 100-250ms 지연
          } else {
            typingSpeedRef.current = randomSpeed;
          }
        }, typingSpeedRef.current);
      } else {
        // 타이핑이 완료되면 isTyping 상태 업데이트
        setIsTyping(false);

        // 타이핑이 완료되면 스크롤 조정
        timeoutId = setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    // 클린업 함수
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping, displayedResponse, fullResponse, messages]);

  // 메시지 전송 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const isFirstMessage = messages.length === 0;

    // 사용자 메시지 추가
    const userMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText("");
    setLoading(true);

    // 첫 메시지인 경우 스크롤 위치 초기화
    if (isFirstMessage) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 200);
    }

    try {
      // API에 메시지 전송
      const formattedMessages = formatMessagesForAPI(updatedMessages);
      const response = await sendMessage(formattedMessages);

      // 타이핑 효과를 위한 설정
      setFullResponse(response);
      setDisplayedResponse("");
      setIsTyping(true);

      // 응답 메시지 추가 (타이핑 애니메이션용 빈 텍스트로 시작)
      setMessages([
        ...updatedMessages,
        {
          text: "",
          isUser: false,
          timestamp: new Date(),
          feedback: null,
          isTyping: true,
        },
      ]);

      setLoading(false);
    } catch (error) {
      alert(error.message || "오류가 발생했습니다.");
      console.error(error);
      setLoading(false);
    }
  };

  // 타이핑 효과를 위해 메시지 업데이트
  useEffect(() => {
    if (isTyping && fullResponse && displayedResponse) {
      const lastMessageIndex = messages.length - 1;

      // 마지막 메시지가 존재하고 AI 메시지인 경우에만 업데이트
      if (lastMessageIndex >= 0 && !messages[lastMessageIndex].isUser) {
        // 현재 표시된 텍스트와 마지막 메시지의 텍스트가 다른 경우에만 업데이트
        if (messages[lastMessageIndex].text !== displayedResponse) {
          const updatedMessages = [...messages];
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            text: displayedResponse,
          };

          // 함수형 업데이트를 사용하여 최신 상태 기반으로 업데이트
          setMessages((prevMessages) => {
            // 메시지 배열이 변경되지 않았는지 확인
            if (prevMessages.length !== updatedMessages.length) {
              return updatedMessages;
            }

            // 마지막 메시지의 내용만 업데이트하고 나머지는 그대로 유지
            return prevMessages.map((msg, idx) =>
              idx === lastMessageIndex
                ? { ...msg, text: displayedResponse }
                : msg
            );
          });

          // 스크롤 자동 이동은 첫 메시지 표시 시와 타이핑이 완료된 경우에만 수행
          if (
            displayedResponse.length === fullResponse.length ||
            displayedResponse.length === 1
          ) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  }, [displayedResponse, isTyping, fullResponse, messages]);

  // 좋아요/싫어요 처리
  const handleFeedback = (index, type) => {
    const newMessages = [...messages];

    // 싫어요 버튼을 누른 경우 모달창 표시
    if (type === "dislike") {
      setFeedbackMessageIndex(index);
      setShowFeedbackModal(true);
      setFeedbackText(""); // 피드백 텍스트 초기화
      return;
    }

    // 이미 같은 버튼이 선택된 경우 선택 해제
    if (newMessages[index].feedback === type) {
      newMessages[index].feedback = null;
    }
    // 다른 버튼이 선택된 경우 기존 선택 해제하고 새로운 선택
    else {
      newMessages[index].feedback = type;
    }

    setMessages(newMessages);
  };

  // 메시지 복사 처리
  const handleCopyMessage = (index) => {
    const text = messages[index].text;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // 복사 성공 시 복사된 인덱스 표시
        setCopiedMessageIndex(index);

        // 2초 후 복사 표시 제거
        setTimeout(() => {
          setCopiedMessageIndex(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("메시지 복사 실패:", err);
        alert("메시지 복사에 실패했습니다.");
      });
  };

  // 피드백 제출 처리
  const handleFeedbackSubmit = () => {
    if (feedbackMessageIndex !== null) {
      const newMessages = [...messages];
      newMessages[feedbackMessageIndex].feedback = "dislike";
      newMessages[feedbackMessageIndex].feedbackText = feedbackText;
      setMessages(newMessages);

      // TODO: 여기에서 피드백을 서버에 전송하는 로직을 추가할 수 있습니다.
      console.log("피드백 제출:", {
        message: newMessages[feedbackMessageIndex].text,
        feedback: feedbackText,
      });

      // 모달창 닫기
      setShowFeedbackModal(false);
      setFeedbackMessageIndex(null);
      setFeedbackText("");
    }
  };

  // 피드백 모달창 닫기
  const handleCloseModal = () => {
    setShowFeedbackModal(false);
    setFeedbackMessageIndex(null);
    setFeedbackText("");
  };

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
    if (textareaRef2.current) {
      adjustTextareaHeight(textareaRef2.current);
    }
  }, [messages.length]); // 메시지 목록이 변경될 때마다 실행

  // 입력 텍스트가 변경될 때 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
    if (textareaRef2.current) {
      adjustTextareaHeight(textareaRef2.current);
    }
  }, [inputText]);

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
      <Header />
      <div className="chat-bg">
        <div
          className={`chat-container ${
            messages.length === 0 ? "empty-chat" : ""
          }`}
        >
          {messages.length === 0 ? (
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
                {/* <h1 className="chat-title">무엇을 도와드릴까요?</h1> */}
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
                    disabled={loading || !isLoggedIn}
                    rows={1}
                  />
                  <button
                    className="chat-send"
                    type="submit"
                    disabled={loading || !inputText.trim() || !isLoggedIn}
                  >
                    {/* <span className="arrow-up">↑</span> */}
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
          ) : (
            <>
              {/* 메시지가 있을 때의 레이아웃 */}
              <div className="chat-center">
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.isUser ? "user-message" : "ai-message"
                      }`}
                    >
                      <div className="message-content">
                        <span className="typing-effect">{msg.text}</span>
                        {!msg.isUser &&
                          isTyping &&
                          index === messages.length - 1 &&
                          msg.text.length < fullResponse.length && (
                            <span className="typing-cursor"></span>
                          )}
                      </div>

                      {/* 좋아요/싫어요/복사 버튼 (AI 메시지에만 표시) */}
                      {!msg.isUser && !isTyping && (
                        <div className="message-footer">
                          <div className="message-actions">
                            <button
                              className={`action-button copy ${
                                copiedMessageIndex === index
                                  ? "copied show-tooltip"
                                  : ""
                              }`}
                              onClick={() => handleCopyMessage(index)}
                              aria-label="복사"
                            >
                              <CopyIcon />
                              <span className="copy-tooltip">복사됨!</span>
                            </button>
                            <button
                              className={`action-button ${
                                msg.feedback === "like" ? "active" : ""
                              }`}
                              onClick={() => handleFeedback(index, "like")}
                              aria-label="좋아요"
                            >
                              <ThumbUpIcon />
                            </button>
                            <button
                              className={`action-button dislike ${
                                msg.feedback === "dislike" ? "active" : ""
                              }`}
                              onClick={() => handleFeedback(index, "dislike")}
                              aria-label="싫어요"
                            >
                              <ThumbDownIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="message ai-message">
                      <div className="message-content typing">생각 중...</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* 하단 고정 영역 */}
              <div className="chat-bottom">
                <div className="robot-container">
                  <Lottie
                    animationData={robotAnimationData}
                    className="robot-animation"
                  />
                </div>
                <div className="chat-form-container">
                  <form className="chat-form" onSubmit={handleSubmit}>
                    <textarea
                      ref={textareaRef2}
                      className="chat-input"
                      placeholder={
                        isLoggedIn
                          ? "무엇이든 입력하세요. "
                          : "로그인 또는 회원가입 후 채팅을 이용해주세요"
                      }
                      value={inputText}
                      onChange={handleTextChange}
                      onKeyDown={handleKeyDown}
                      disabled={loading || !isLoggedIn}
                      rows={1}
                    />
                    <button
                      className="chat-send"
                      type="submit"
                      disabled={loading || !inputText.trim() || !isLoggedIn}
                    >
                      <span className="arrow-up">↑</span>
                    </button>
                  </form>
                  <div className="chat-guide">
                    실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 피드백 모달창 */}
          {showFeedbackModal && (
            <div className="feedback-modal-overlay">
              <div className="feedback-modal">
                <div className="feedback-modal-header">
                  <h3>피드백</h3>
                </div>
                <div className="feedback-modal-body">
                  <textarea
                    className="feedback-textarea"
                    placeholder="이 응답의 어떤 점이 만족스럽지 않나요?"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={4}
                  />
                  <p className="feedback-note">
                    {" "}
                    이 보고서를 제출하면 향후 모델 개선에 사용됩니다.{" "}
                    <button className="link-button">자세히 알아보기</button>
                  </p>
                </div>
                <div className="feedback-modal-footer">
                  <button
                    className="feedback-cancel-button"
                    onClick={handleCloseModal}
                  >
                    취소
                  </button>
                  <button
                    className="feedback-submit-button"
                    onClick={handleFeedbackSubmit}
                  >
                    제출
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
