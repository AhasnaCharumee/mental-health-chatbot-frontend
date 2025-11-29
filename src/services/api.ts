const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://mental-health-backend-rk06xwmds-charumeeahasna-3998s-projects.vercel.app";

export const API_URL =
  `${process.env.REACT_APP_API_URL}/api/chatbot/message`;


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
