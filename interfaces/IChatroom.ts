import { User } from "./IUser";

export interface Chatroom {
  id?: string;
  title: string;
  messages?: [{ id?: string; message?: string; user?: User; timestamp?: Date }];
}
