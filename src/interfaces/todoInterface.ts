import { GroupInterface } from "@/interfaces/groupInterface";

export interface TodoInterface {
  id: number;
  title: string;
  description: string;
  color: string;
  priority: number;
  completed: boolean;
  group: GroupInterface;
}
