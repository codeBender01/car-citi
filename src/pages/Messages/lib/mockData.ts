export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export interface Conversation {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  carModel: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const mockConversations: Conversation[] = [
  {
    id: 1,
    userId: 1,
    userName: "Murad",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi Q8 2023",
    lastMessage: "Lorem ipsum dolor sit amet",
    timestamp: "1 мин.",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 2,
    userId: 2,
    userName: "Floyd Alexander",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi Q8 2023",
    lastMessage: "Lorem ipsum dolor sit amet",
    timestamp: "35 мин.",
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: 3,
    userId: 3,
    userName: "Floyd Alexander",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi Q8 2023",
    lastMessage: "Lorem ipsum dolor sit amet",
    timestamp: "35 мин.",
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: 4,
    userId: 4,
    userName: "Floyd Alexander",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi Q8 2023",
    lastMessage: "Lorem ipsum dolor sit amet",
    timestamp: "35 мин.",
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: 5,
    userId: 5,
    userName: "Floyd Alexander",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi Q8 2023",
    lastMessage: "Lorem ipsum dolor sit amet",
    timestamp: "19/08/2024",
    unreadCount: 0,
    isOnline: false,
  },
];

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