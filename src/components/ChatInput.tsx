import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-area">
      <input
        type="text"
        placeholder="Share your thoughts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="chat-input"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="chat-send"
      >
        Send
      </button>
    </form>
  );
}
