import { Sessions } from "./sessions";

export interface Zones {
  id: string;
  name: string;
  pricePerHour: number;
  maxCapacity: number;
  address: string;
  sessions?: Sessions[];
}
