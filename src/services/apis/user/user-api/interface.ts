import { IPaginationMeta } from "@/services";

export interface IUser {
  id: string;
  nick_name: string;
  role: "ADMIN" | "USER";
  profile_picture: string;
  email: string;
}

export interface IApi {
  id: string;
  name: string;
  picture: string;
  user: IUser;
}

export interface IVersion {
  id: string;
  created_at: string;
  updated_at: string;
  version: string;
  status:
    | "PROCESSING"
    | "ACCEPTED"
    | "NOT_ACCEPTED"
    | "DEPRECATED"
    | "WAITING_DEPRECATE"
    | "WAITING"
    | "PROXY_ERROR";
  api: IApi;
  status_date: string;
  requests: number;
  enroll: number;
  is_public: boolean;
}

export interface IGetVersionListRequestPayload {
  requests__lte?: number;
  requests__gte?: number;
  enroll__lte?: number;
  enroll__gte?: number;
  status?:
    | "PROCESSING"
    | "ACCEPTED"
    | "NOT_ACCEPTED"
    | "DEPRECATED"
    | "WAITING_DEPRECATE"
    | "WAITING"
    | "PROXY_ERROR";
  status_date__gte?: string;
  status_date__lte?: string;
  name?: string;
  user?: string;
  page_size?: number;
  page?: number;
  search?: string;
  ordering?: string;
}
export interface IDeprecateVersionRequestPayload {
  version: string;
}

export interface IDeprecateVersionResponsePayload {
  message: string;
  success?: boolean;
}

export interface IGetVersionListResponsePayload extends IPaginationMeta {
  list: IVersion[];
}

export interface IApproveVersionRequestPayload {
  version: string;
}

export interface IApproveVersionResponsePayload {
  success: boolean;
  message?: string;
  data?: IVersion;
}
export interface IDisapproveVersionRequestPayload {
  description: string;
  title: string;
}

export interface IDisapproveVersionResponsePayload {
  message: string;
  success?: boolean;
}

export interface IResolveProxyErrorResponsePayload {
  message: string;
  success?: boolean;
}
export interface IResolveProxyErrorRequestPayload {}
