interface IUserInfo {
  id: string;
  nick_name: string;
  role: "ADMIN" | "USER";
  email: string;
  profile_picture?: string;
}

interface IDiscussionParticipant extends IUserInfo {}

interface IDiscussionItem {
  id: string;
  created_at: string;
  category: string;
  title: string;
  message: string;
  like_count: number;
  dislike_count: number;
  user: IUserInfo;
  reply_count?: number;
  participant: IDiscussionParticipant[];
  status?: "ACCEPTED" | "NOT_ACCEPTED" | "REPORTED";
  is_answered: boolean;
}
interface IDiscussionDetailResponse {
  id: string;
  created_at: string;
  category: string;
  title: string;
  message: string;
  user: IUserInfo;
  participant: IDiscussionParticipant;
  status?: "ACCEPTED" | "NOT_ACCEPTED" | "REPORTED";
  like_count?: number;
  dislike_count?: number;
  is_answered: boolean;
}
interface IDiscussionReplyMessage {
  id: string;
  created_at: string;
  message: string;
  like_count?: number;
  dislike_count?: number;
  reply_count?: number;
  user: IUserInfo;
  status?: "ACCEPTED" | "NOT_ACCEPTED" | "REPORTED";
  is_right: boolean;
  reply_messages: IDiscussionReplyMessage[];
}
interface IDiscussionMessageItem {
  id: string;
  created_at: string;
  message: string;
  like_count?: number;
  dislike_count?: number;
  reply_count?: number;
  reply_messages: IDiscussionReplyMessage[];
  user: IUserInfo;
  status?: "ACCEPTED" | "NOT_ACCEPTED" | "REPORTED";
  is_right: boolean;
}

interface IDiscussionVersionResponsePayload {
  data: IDiscussionItem[];
  page_count: number;
  total_count: number;
}
interface IDiscussionMessagesResponse {
  messages: IDiscussionMessageItem[];
  page_count: number;
  total_count: number;
}

interface IDiscussionCategory {
  id: string;
  name: string;
}
interface IDiscussionCategoryResponsePayload {
  category: IDiscussionCategory[];
}

interface IDiscussionVersionParams {
  status?: string;
  category?: string;
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

interface DeleteDiscussionPayload {
  id: string;
  description: string;
}

export type {
  IUserInfo,
  IDiscussionParticipant,
  IDiscussionItem,
  IDiscussionVersionResponsePayload,
  IDiscussionVersionParams,
  IDiscussionCategoryResponsePayload,
  IDiscussionCategory,
  DeleteDiscussionPayload,
  IDiscussionDetailResponse,
  IDiscussionMessagesResponse,
  IDiscussionReplyMessage,
  IDiscussionMessageItem,
};
