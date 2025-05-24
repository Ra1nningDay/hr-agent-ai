import api from "./axios-instance";

export async function sendChatMessage(
  message: { role: string; content: string }[]
) {
  // console.log("Sending message to API:", message);
  const res = await api.post("/api/interview/chat", { messages: message });
  if (!res.data) throw new Error("Failed to send message");
  return res.data;
}
