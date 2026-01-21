import { io, Socket } from "socket.io-client";
import type {
  Message,
  Room,
  SocketMessage,
  PrivateRoomParams,
  PrivateRoomResponse,
  GetMessagesParams,
} from "./types";

const SOCKET_URL =
  import.meta.env.VITE_CHAT_API || "http://192.168.7.162:9000/chat";

interface ChatSocketCallbacks {
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onConnectError?: (error: Error) => void;
  onNewMessage?: (message: Message) => void;
}

class ChatSocket {
  private socket: Socket | null = null;
  private callbacks: ChatSocketCallbacks = {};

  connect(token: string, callbacks: ChatSocketCallbacks = {}) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.callbacks = callbacks;

    const url = new URL(SOCKET_URL);
    const baseURL = `${url.protocol}//${url.host}`;
    const namespace = url.pathname || "/";

    this.socket = io(baseURL + namespace, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["polling", "websocket"],
      upgrade: true,
      rememberUpgrade: true,
      withCredentials: false,
      autoConnect: true,
      forceNew: true,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.callbacks.onConnect?.();
    });

    this.socket.on("disconnect", (reason: string) => {
      this.callbacks.onDisconnect?.(reason);
    });

    this.socket.on("connect_error", (error: Error) => {
      this.callbacks.onConnectError?.(error);
    });

    this.socket.on("newMessage", (message: Message) => {
      console.log("📩 newMessage event received from server:", message);
      this.callbacks.onNewMessage?.(message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRooms() {
    if (!this.socket?.connected) {
      return;
    }
    this.socket.emit("joinRooms");
  }

  getMyRooms(callback: (rooms: Room[]) => void) {
    if (!this.socket?.connected) {
      return;
    }
    this.socket.emit("getMyRooms", {}, callback);
  }

  // Client-specific method to get user's room (returns single room)
  clientGetRoom(callback: (result: { roomId?: string }) => void) {
    if (!this.socket?.connected) {
      console.error("❌ Cannot get client room: Socket not connected");
      callback({});
      return;
    }
    console.log("📤 Fetching client room...");
    this.socket.emit("clientGetRoom", {}, callback);
  }

  getOrCreatePrivateRoom(
    params: PrivateRoomParams,
    callback: (result: PrivateRoomResponse) => void,
  ) {
    if (!this.socket?.connected) {
      return;
    }
    this.socket.emit("getOrCreatePrivateRoom", params, callback);
  }

  getMessages(
    params: GetMessagesParams,
    callback: (messages: Message[]) => void,
  ) {
    if (!this.socket?.connected) {
      callback([]);
      return;
    }

    this.socket.emit("getMessages", params, (response: any) => {
      if (!response) {
        callback([]);
        return;
      }

      if (Array.isArray(response)) {
        callback(response);
      } else {
        callback([]);
      }
    });
  }

  sendMessage(data: SocketMessage) {
    if (!this.socket?.connected) {
      return false;
    }
    this.socket.emit("sendMessage", data);

    return true;
  }

  // Admin-specific method to join admin rooms
  joinRoomsAdmin() {
    if (!this.socket?.connected) {
      console.error("❌ Cannot join admin rooms: Socket not connected");
      return;
    }
    console.log("📤 Joining admin rooms...");
    this.socket.emit("joinRoomsAdmin");
  }

  // Admin-specific method to get admin rooms
  getAdminRooms(callback: (rooms: Room[]) => void) {
    if (!this.socket?.connected) {
      console.error("❌ Cannot get admin rooms: Socket not connected");
      callback([]);
      return;
    }
    console.log("📤 Fetching admin rooms...");
    this.socket.emit("getAdminRooms", {}, (response: any) => {
      console.log("📦 getAdminRooms response:", response);
      if (Array.isArray(response)) {
        callback(response);
      } else {
        console.error("❌ Invalid response format for admin rooms");
        callback([]);
      }
    });
  }

  // Admin-specific method to send messages as admin
  sendMessageAdmin(data: SocketMessage) {
    if (!this.socket?.connected) {
      console.error("❌ Cannot send admin message: Socket not connected");
      return false;
    }
    console.log("📤 Sending admin message:", data);
    this.socket.emit("sendMessageAdmin", data);
    return true;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const chatSocket = new ChatSocket();
