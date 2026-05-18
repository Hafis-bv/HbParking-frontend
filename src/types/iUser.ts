import { PlateNumbers } from "./plateNumbers";
import { Sessions } from "./sessions";

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  balance: number;
  role: string;
  sessions: Sessions[];
  plateNumbers: PlateNumbers[];
}
