export const SOCKET_EVENTS = {
  connectUser: "user:connect",
  joinThread: "chat:join-thread",
  leaveThread: "chat:leave-thread",
  sendMessage: "chat:send-message",
  receiveMessage: "chat:receive-message",
  typing: "chat:typing",
} as const;

export function getChatRoom(threadId: string) {
  return `chat-thread:${threadId}`;
}
