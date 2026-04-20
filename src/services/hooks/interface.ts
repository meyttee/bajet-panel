interface IReport {
  chat: {
    id: string;
    user: string;
    title: string;
  };
  content: string;
  role: "assistant" | "user";
  created_at: string;
  feedback: "like" | "dislike" | null;
}

interface IGetReportsResponsePayload {
  count: number;
  next: string | null;
  previous: string | null;
  results: IReport[];
}

interface IRetrievedDoc {
  doc_id: string;
  chunk_id: string;
  chunk_text: string;
  score: number;
  metadata: {
    source: string;
    page: number;
  };
  reference_number: number;
}

interface IMetaData {
  tokens: number;
  processing_time: number;
}

interface IMessage {
  id: string;
  created_at: string;
  role: "user" | "assistant";
  content: string;
  retrieved_docs: IRetrievedDoc[];
  metadata: IMetaData;
  feedback: null;
}

interface IGetReportByIdResponsePayload {
  id: string;
  user: string;
  title: string;
  messages: IMessage[];
}

interface ISession {
  id: string;
  user: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface IGetSessionsResponsePayload {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISession[];
}

interface IQuestion {
  id: number;
  timestamp: string;
  user_query: string;
  bot_response: string;
  user_feedback: string;
  admin_feedback: string;
  status: boolean;
}

interface IGetQuestionsResponsePayload {
  count: number;
  next: string | null;
  previous: string | null;
  results: IQuestion[];
}

interface IUsers {
  id: string;
  username: string;
  question_count: string;
  last_activity: string;
  chat_count: number;
}

interface IGetUsersResponsePayload {
  count: number;
  next: string | null;
  previous: string | null;
  results: IUsers[];
}

interface ILogiPayload {
  username: string;
  password: string;
}

interface IPermissionedUser {
  id: number;
  username: string;
  role: string;
  personnel_code: null | string;
  phone_number: string | null;
  last_login: string;
  user_permissions: number[];
}

interface IGetPermissionedUsers {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPermissionedUser[];
}

export type {
  ILogiPayload,
  IReport,
  IGetReportsResponsePayload,
  IMessage,
  IGetReportByIdResponsePayload,
  ISession,
  IGetSessionsResponsePayload,
  IQuestion,
  IGetQuestionsResponsePayload,
  IUsers,
  IGetUsersResponsePayload,
  IPermissionedUser,
  IGetPermissionedUsers,
};
