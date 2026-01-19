export interface Message {
  id: string;
  message: string;
  attachments: string[];
  authorId: string;
  created: string;
  deleted: string | null;
  room_id: string;
  author: {
    id: string;
    phone: string;
  };
  message_readers: any[];
}

export interface Room {
  roomId: string;
  title: string;
  otherUser: {
    id: string;
    phone: string;
  };
  lastMessage?: {
    date: string;
    id: string;
    created: string;
    message: string;
    attachments: [];
    deleted: null;
    room_id: string;
    admin_id: null;
    is_admin_read: boolean;
    is_user_read: boolean;
    user_id: string;
    admins: null;
  };
}

export interface SocketMessage {
  roomId: string;
  message: string;
}

export interface PrivateRoomParams {
  recipientId: number;
}

export interface PrivateRoomResponse {
  roomId: string;
  room: Room;
}

export interface GetMessagesParams {
  roomId: string;
  limit?: number;
  offset?: number;
}
