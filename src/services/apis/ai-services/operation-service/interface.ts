import { IPaginationMeta } from "@/services/interceptor";

type Status =
  | "RUNNING"
  | "ADMIN_OFF"
  | "FAIL"
  | "PROCESSING"
  | "NEED_TIME"
  | "CANCEL"
  | "OFF"
  | "ASSIGN_VOLUME";

export interface IDeploymentResult {
  deployment_name: string;
  image: string;
  port: number;
  service_url: string;
  websocket_name: string;
  status: Status;
  user_logs: string;
  scope: string;
  label: string;
  api_name: string;
  api_image: string;
  cpu: number;
  ram: number;
  id: string;
  has_info: boolean;
  use_gpu: boolean;
  pvc_name: string;
  mount_path: string;
  is_up: boolean;
}

export interface IDeploymentRequest {
  title?: string;
  description: string;
  created_at__lte?: string;
  created_at__gte?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
}

export type IDeployPayload = {
  version: string;
};

export interface IDeploymentResponse extends IPaginationMeta {
  results: IDeploymentResult[];
}

export interface ApiParkSetting {
  pod_lifespan: number;
  most_visited_period: number;
  most_visited_cnt: number;
  min_priority: number;
}

export type UpdateApiParkSetting = Partial<ApiParkSetting>;

export interface Log {
  created_at: string;
  deployment_name: string;
  log: string;
}

export interface LogsParams {
  deployment_name: string;
  created_at__lt: string;
  created_at__gte: string;
  page: string;
  page_size: number;
  search: string;
  ordering: string;
}

export interface LogsResponse extends IPaginationMeta {
  logs: Log[];
}

export interface Problem {
  deployment_name: string;
  description: string;
  created_at: string;
  is_solved: boolean;
}

export interface ProblemsParams {
  deployment_name: string;
  is_solved: boolean;
  page: string;
  page_size: number;
  search: string;
  ordering: string;
}

export interface ProblemsResponse extends IPaginationMeta {
  results: Problem[];
}

export interface ApiQueue {
  deployment_name: string;
  label: string;
  scope: string;
  api_name: string;
  user_email: string;
  status: string;
  referral_to_admin: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
  page_url: string;
  api_image: string;
}

export interface ApiQueueParams {
  deployment__api_name__iregex: string;
  user_email: string;
  created_at__lt: string;
  created_at__gte: string;
  deployment__label: string;
  deployment__scope: string;
  status: string;
  page: string;
  page_size: number;
  search: string;
  ordering: string;
}

export interface ApiQueueResponse extends IPaginationMeta {
  results: ApiQueue[];
}

export interface DeploymentLabelsResponse {
  labels: string[];
}

export interface DeploymentResponse {
  deployment_name: string;
  image: string;
  service_url: string;
  websocket_name: string;
  api_name: string;
  cpu: number;
  ram: number;
  status: Status;
  label: string;
  port: number;
  scope: string;
  admin_logs: string;
}

export interface ImageResponse {
  logs: string;
}

interface Version {
  id: string;
  version: string;
}

export interface AiServiceApi {
  id: string;
  name: string;
  all_version: Version[];
}

export interface AiServiceApiResponse {
  all_api: AiServiceApi[];
}

export interface ContainerLog {
  container_image: string;
  log: string;
}
export type PodStatus =
  | "Failed"
  | "ImagePullBackOff"
  | "OOMKilled"
  | "InvalidImageNameRunning"
  | "CrashLoopBackOff"
  | "Pending"
  | "ContainerCreating"
  | "Terminating";

export interface PodLog {
  logs: ContainerLog[];
  pod_status: PodStatus;
  pod_name: string;
}

export interface DeployLogResponse {
  error: string;
  pod_logs?: PodLog[];
  needed_deploy: boolean;
}

export interface ImageResponse {
  socket_group_name: string;
  task_id: string;
}
export interface StopImagePayload {
  task_id: string;
  image_name: string;
}

export interface CommandPayload {
  deployment_name: string;
  command: string;
}
export interface CommandResponse {
  result: string[];
}
