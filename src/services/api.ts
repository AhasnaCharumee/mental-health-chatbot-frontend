// Use `REACT_APP_API_URL` to switch deployments without changing code.
// Example .env: REACT_APP_API_URL=https://mental-health-chatbot-backend-2gkdsynyr.vercel.app
const DEFAULT_BACKEND =
  process.env.REACT_APP_API_URL ||
  "https://mental-health-chatbot-backend-teal.vercel.app" ||
  "https://mental-health-chatbot-backend-2gdsynyr.vercel.app";

const API_URL = `${DEFAULT_BACKEND.replace(/\/$/, "")}/api/chatbot/message`;

export async function sendMessage(message: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to send message");
  }

  return data.data; // { reply: string, language: string }
}
