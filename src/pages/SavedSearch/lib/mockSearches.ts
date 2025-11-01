export interface SavedSearch {
  id: number;
  carName: string;
  year: number;
  mileage: string;
  resultsCount: number;
  date: string;
}

export const mockSearches: SavedSearch[] = [
  {
    id: 1,
    carName: "Audi Q3",
    year: 2023,
    mileage: "2500...",
    resultsCount: 256,
    date: "19/08/2024",
  },
  {
    id: 2,
    carName: "BMW X5",
    year: 2023,
    mileage: "2500...",
    resultsCount: 256,
    date: "19/08/2024",
  },
  {
    id: 3,
    carName: "Toyota Camry",
    year: 2023,
    mileage: "2500...",
    resultsCount: 256,
    date: "19/08/2024",
  },
  {
    id: 4,
    carName: "Mercedes-Benz C-Class",
    year: 2024,
    mileage: "1000...",
    resultsCount: 142,
    date: "15/08/2024",
  },
  {
    id: 5,
    carName: "Honda Accord",
    year: 2022,
    mileage: "5000...",
    resultsCount: 189,
    date: "12/08/2024",
  },
  {
    id: 6,
    carName: "Volkswagen Tiguan",
    year: 2023,
    mileage: "3000...",
    resultsCount: 203,
    date: "10/08/2024",
  },
];