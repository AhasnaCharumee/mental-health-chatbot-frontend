import React, { useState, useRef, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { sendMessage } from "../services/api";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setLoading(true);
    try {
      const response = await sendMessage(message);
      setMessages((prev) => [...prev, { text: response.reply, isUser: false }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { text: "Error: " + error.message, isUser: false }]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-semibold mb-5">Mental Health Chatbot</h1>
      <div className="chat-window bg-glass">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && <p className="italic" style={{ color: "rgba(255,255,255,0.6)" }}>Chatbot is typing...</p>}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
