
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Bot {
  id: string;
  name: string;
  systemInstruction: string;
  avatarUrl: string;
}

export enum MessageAuthor {
    USER = 'user',
    BOT = 'bot'
}

export interface ChatMessage {
  author: MessageAuthor;
  text: string;
}
