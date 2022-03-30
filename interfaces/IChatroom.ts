import { User } from "./IUser";

export interface Chatroom {
  id?: string;
  title: string;
  timestamp?: Date;
  messages?: [{ message: string; user: User }];
}
