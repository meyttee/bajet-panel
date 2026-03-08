interface IServer {
  deployment_name: string;
  image: string;
  port: number;
  service_url: string;
  websocket_name: string;
  status: string;
  user_logs: string;
  scope: string;
  label: string;
  api_name: string;
  cpu: number;
  ram: number;
  id: string;
  api_image: string;
  has_info: boolean;
  use_gpu: boolean;
  pvc_name: string;
  mount_path: string;
  is_up: boolean;
}

interface IServersReponsePayload {
  results: IServer[];
  total_count: number;
  page_count: number;
}

interface IServersRequestPayload {
  deployment_name: string;
  use_gpu: boolean;
  status: string;
  label: string;
  api_name__iregex: string;
  ordering: string;
  search: string;
  page_size: number;
  page: number;
}

interface IStartServerRequestPayload {
  version: string;
}

export type {
  IServer,
  IServersReponsePayload,
  IServersRequestPayload,
  IStartServerRequestPayload,
};
