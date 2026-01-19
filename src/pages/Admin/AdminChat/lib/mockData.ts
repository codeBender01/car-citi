import type { Message, Conversation } from "@/pages/Messages/lib/mockData";

export const mockAdminConversations: Conversation[] = [
  {
    id: 1,
    userId: 101,
    userName: "Алексей Иванов",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "BMW X5 2021",
    lastMessage: "Спасибо за помощь!",
    timestamp: "2 мин.",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 2,
    userId: 102,
    userName: "Мария Петрова",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Mercedes-Benz E-Class 2022",
    lastMessage: "У меня проблема с размещением объявления",
    timestamp: "15 мин.",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: 3,
    userId: 103,
    userName: "Дмитрий Сидоров",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Toyota Camry 2020",
    lastMessage: "Можете помочь с оплатой?",
    timestamp: "1 час",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 4,
    userId: 104,
    userName: "Елена Васильева",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Audi A6 2023",
    lastMessage: "Как изменить контактные данные?",
    timestamp: "3 час",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 5,
    userId: 105,
    userName: "Сергей Новиков",
    userAvatar: "https://via.placeholder.com/50",
    carModel: "Lexus RX 2021",
    lastMessage: "Хорошо, буду ждать",
    timestamp: "21/01/2026",
    unreadCount: 0,
    isOnline: false,
  },
];

export const mockAdminMessages: Message[] = [
  {
    id: 1,
    senderId: 101,
    text: "Здравствуйте! У меня возникла проблема с загрузкой фотографий автомобиля.",
    timestamp: "16:30",
    isCurrentUser: false,
  },
  {
    id: 2,
    senderId: 0, // Admin
    text: "Добрый день! Я помогу вам разобраться. Какой формат фотографий вы пытаетесь загрузить?",
    timestamp: "16:32",
    isCurrentUser: true,
  },
  {
    id: 3,
    senderId: 101,
    text: "Я пытаюсь загрузить фото в формате JPG, размер около 2 МБ",
    timestamp: "16:33",
    isCurrentUser: false,
  },
  {
    id: 4,
    senderId: 0, // Admin
    text: "Понял. Попробуйте очистить кэш браузера и попробовать снова. Если проблема сохранится, дайте знать.",
    timestamp: "16:35",
    isCurrentUser: true,
  },
  {
    id: 5,
    senderId: 101,
    text: "Спасибо за помощь!",
    timestamp: "16:40",
    isCurrentUser: false,
  },
];