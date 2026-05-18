import { Sessions } from "./sessions";

export interface PlateNumbers {
  id: string;
  plate: string;
  userId: string;
  createdAt: string;
  sessions?: Sessions[];
}
