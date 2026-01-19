import type { Message } from "@/pages/Messages/lib/mockData";

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
