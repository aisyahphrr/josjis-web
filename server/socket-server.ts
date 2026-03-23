import "dotenv/config";

import { createServer } from "node:http";
import { Server } from "socket.io";

import { getChatRoom, SOCKET_EVENTS } from "../src/server/socket/events";

const port = Number(process.env.SOCKET_PORT ?? 3001);
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const httpServer = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({
      ok: true,
      path: request.url,
      socket: "Sadaya Socket.IO server aktif",
    }),
  );
});

const io = new Server(httpServer, {
  cors: {
    origin: appUrl,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on(SOCKET_EVENTS.connectUser, (payload?: { userId?: string }) => {
    if (payload?.userId) {
      socket.data.userId = payload.userId;
      socket.join(`user:${payload.userId}`);
    }
  });

  socket.on(SOCKET_EVENTS.joinThread, (payload: { threadId: string }) => {
    socket.join(getChatRoom(payload.threadId));
  });

  socket.on(SOCKET_EVENTS.leaveThread, (payload: { threadId: string }) => {
    socket.leave(getChatRoom(payload.threadId));
  });

  socket.on(
    SOCKET_EVENTS.sendMessage,
    (payload: {
      threadId: string;
      senderId: string;
      body: string;
      createdAt?: string;
    }) => {
      io.to(getChatRoom(payload.threadId)).emit(SOCKET_EVENTS.receiveMessage, {
        ...payload,
        createdAt: payload.createdAt ?? new Date().toISOString(),
      });
    },
  );

  socket.on(
    SOCKET_EVENTS.typing,
    (payload: { threadId: string; senderId: string; isTyping: boolean }) => {
      socket
        .to(getChatRoom(payload.threadId))
        .emit(SOCKET_EVENTS.typing, payload);
    },
  );
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server jalan di http://localhost:${port}`);
});
