import api from "./axios-instance";

export async function sendChatMessage(
  message: { role: string; content: string }[]
) {
  const res = await api.post("/api/interview/chat", { message });
  if (!res.data) throw new Error("Failed to send message");
  return res.data;
}
