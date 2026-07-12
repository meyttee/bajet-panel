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
  all_page: number;
  page: string | null;
  results: IReport[];
}

interface IRetrievedDoc {
  score: number;
  chunk_id: string;
  metadata: {
    page: string;
    part: string;
    title: string;
    article: string;
    chapter: string;
    chunk_id: string;
    doc_name: string;
    end_page: number;
    doc_title: string;
    file_path: string;
    chunk_type: string;
    part_title: string;
    start_page: number;
    page_number: number;
    source_file: string;
    chunk_number: number;
    processed_at: string;
    section_info: {
      part: string;
      article: string;
      chapter: string;
      section: null;
      hierarchy_path: string;
    };
    article_title: string;
    chapter_title: string;
    display_title: string;
    document_name: string;
    content_length: number;
    hierarchy_path: string;
    context_summary: {
      page: number;
      doc_title: string;
      hierarchy: {
        part: string;
        article: string;
        chapter: string;
        section: null;
        part_title: string;
        article_title: string;
        chapter_title: string;
        hierarchy_path: string;
      };
    };
    document_context: {
      page: number;
      doc_title: string;
      hierarchy: {
        part: string;
        article: string;
        chapter: string;
        section: null;
        part_title: string;
        article_title: string;
        chapter_title: string;
        hierarchy_path: string;
      };
    };
  };
  chunk_text: string;
  document_title: string;
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
  all_page: number;
  page: string | null;
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
  feedback: "like" | "dislike";
  retrieved_docs: IRetrievedDoc[];
}

interface IGetQuestionsResponsePayload {
  count: number;
  all_page: number;
  page: string | null;
  results: IQuestion[];
  export: string;
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
  all_page: number;
  page: string | null;
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
  all_page: number;
  page: string | null;
  results: IPermissionedUser[];
}

interface ILineChart {
  success: boolean;
  line: {
    name: string;
    total: number;
    month: { count: number; month: string }[];
  }[];
  summary: {
    total_messages: number;
    total_words: number;
    unique_words: number;
    top_keywords: string[];
  };
}

interface IBarChart {
  success: boolean;
  chart: {
    type: string;
    xKey: string;
    series: [
      {
        key: string;
        name: string;
        color: string;
      },
    ];
    data: {
      keyword: string;
      count: number;
    }[];
    title: string;
  };
  summary: {
    total_messages: number;
    total_words: number;
    unique_words: number;
  };
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
  ILineChart,
  IBarChart,
  IRetrievedDoc,
};
