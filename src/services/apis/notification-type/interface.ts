import { IPaginationMeta } from "@/services/interceptor";

export interface NotificationType {
  id: string;
  title: string;
  priority: number;
  key: string;
  show_list: boolean;
  default_sms: boolean;
  default_email: boolean;
}

export interface NotificationTypeResponse extends IPaginationMeta {
  data: NotificationType[];
}

export interface NotificationTypeParams {
  default_sms: string;
  default_email: string;
  show_list: string;
  page_size: number;
  page: number;
  search: string;
  ordering: string;
}

export type NotificationTypeForm = Partial<NotificationType>;
