import React from "react";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

export default function ChatMessage({ message, isUser = false }: ChatMessageProps) {
  return (
    <div
      className={`chat-bubble ${isUser ? "user" : "bot"}`}
      style={{ alignSelf: isUser ? "flex-end" : "flex-start" }}
    >
      {message}
    </div>
  );
}
