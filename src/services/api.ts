const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://mental-health-backend-rk06xwmds-charumeeahasna-3998s-projects.vercel.app";

if (!process.env.REACT_APP_API_URL) {
  // Helpful hint during development — will show in browser console when running locally
  // and in server logs when built (if logs are enabled).
  // Remove or lower verbosity if you don't want this message in production logs.
  // eslint-disable-next-line no-console
  console.warn(
    'REACT_APP_API_URL is not set — using fallback API base:',
    API_BASE
  );
}

export const API_URL = `${API_BASE.replace(/\/$/, '')}/api/chatbot/message`;


export async function sendMessage(message: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  // Try to parse JSON; if server returned non-JSON include the raw body in the error.
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    // Attempt to extract error details
    if (contentType.includes('application/json')) {
      const errJson = await response.json().catch(() => null);
      const errMsg = errJson?.error || errJson?.message || JSON.stringify(errJson) || `HTTP ${response.status}`;
      throw new Error(`Request failed: ${errMsg}`);
    } else {
      const text = await response.text().catch(() => '');
      throw new Error(`Request failed with status ${response.status}: ${text}`);
    }
  }

  if (contentType.includes('application/json')) {
    const data = await response.json().catch(() => {
      throw new Error(`Invalid JSON response from server (status ${response.status})`);
    });
    return data.data; // { reply, language }
  }

  // If we reach here the response was 200 but not JSON — return raw text.
  const text = await response.text().catch(() => '');
  return { raw: text } as any;
}
