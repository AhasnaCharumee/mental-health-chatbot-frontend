const DEFAULT_BACKEND =
  process.env.REACT_APP_API_URL?.trim() ||
  "https://mental-health-chatbot-backend-teal.vercel.app";

const API_URL = `${DEFAULT_BACKEND.replace(/\/$/, "")}/api/chatbot/message`;

export async function sendMessage(message: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  let data;

  try {
    data = await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message");
  }

  return data.data; // { reply, language }
}
