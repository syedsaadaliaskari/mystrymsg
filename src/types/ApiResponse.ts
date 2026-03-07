import { Message } from "../model/User.model";

export interface ApiResponse {
  success: boolean;
  message?: string;
  isAcceptingMessages?: string;
  messages?: Array<Message>;
}
