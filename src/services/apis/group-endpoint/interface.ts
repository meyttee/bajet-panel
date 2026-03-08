import { IPaginationMeta } from "@/services/interceptor";

export interface EndpointChartData {
  datas: number[];
  label: string;
}

export interface GroupEndpointChartParams {
  range_filter: string;
  kind_filter: string;
  endpoint?: string;
}

export interface GroupEndpointChart {
  endpoint_chart_data: EndpointChartData[];
  dates: string[];
}

export interface Endpoint {
  id: string;
  name: string;
}

export interface EndpointListResponse {
  data: Endpoint[];
}

export interface EndpointLog {
  endpoint: Endpoint;
  date: string;
  request_method: string;
  status: string;
  response_time: number;
  message: string;
  user: string;
}

export interface GroupEndpointLogParams {
  endpoint_id: string;
  request_method: string;
  status: string;
  date__gte: string;
  date__lte: string;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

export interface GroupEndpointLogResponse extends IPaginationMeta {
  endpoint_log: EndpointLog[];
}
