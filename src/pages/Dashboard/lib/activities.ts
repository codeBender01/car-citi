export interface Activity {
  id: number;
  type: "approved" | "message" | "saved";
  text: string;
  boldText: string;
}

export const activities: Activity[] = [
  {
    id: 1,
    type: "approved",
    text: "Ваше объявление ",
    boldText: "Audi Q3 3.5 Sportpack было одобрено",
  },
  {
    id: 2,
    type: "message",
    text: "Ali Tufan оставил сообщение на ",
    boldText: "Volvo xc40 Recharge 1.5T",
  },
  {
    id: 3,
    type: "saved",
    text: "Кто-то сохранил ваш ",
    boldText: "Mercedes Benz E-Series listing",
  },
  {
    id: 4,
    type: "saved",
    text: "Кто-то сохранил ваш ",
    boldText: "BMV X5 25d xDrive 4x4 Premium Package",
  },
  {
    id: 5,
    type: "approved",
    text: "Ваше объявление ",
    boldText: "Audi Q3 3.5 Sportpack было одобрено",
  },
  {
    id: 6,
    type: "message",
    text: "Ali Tufan оставил сообщение на ",
    boldText: "Volvo xc40 Recharge 1.5T",
  },
];