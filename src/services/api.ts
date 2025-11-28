const API_URL = "https://mental-health-chatbot-backend-teal.vercel.app/api/chatbot/message"; // production backend

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
