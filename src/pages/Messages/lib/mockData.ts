export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  carModel: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    text: "Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur.",
    timestamp: "16:36",
    isCurrentUser: false,
  },
  {
    id: 2,
    senderId: 2,
    text: "Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur.",
    timestamp: "16:36",
    isCurrentUser: true,
  },
  {
    id: 3,
    senderId: 1,
    text: "Lorem ipsum dolor sit amet, consectetur.",
    timestamp: "16:36",
    isCurrentUser: false,
  },
];
