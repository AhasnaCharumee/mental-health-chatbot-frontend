const API_URL = "http://localhost:3000/api/chatbot/message"; // Change to your backend URL

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
