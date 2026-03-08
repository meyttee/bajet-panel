import { IPaginationMeta } from "@/services/interceptor";

import { IUserApiPackageDetail } from "../../user";

export interface UsersApiPackage {
  id: string;
  user: IUserApiPackageDetail["user"];
  package: IUserApiPackageDetail["package"];
  created_at: string;
  count_api_call: number;
  expired_date: string;
}

export interface UsersApiPackagesParams {
  user_id: string;
  api__name: string;
  version: string;
  type: string;
  name: string;
  created_at__lte: string;
  created_at__gte: string;
  expired_date__lte: string;
  expired_date__gte: string;
  count_api_call__lte: string;
  count_api_call__gte: string;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface Version {
  id: string;
  version: string;
}

export interface Api {
  id: string;
  name: string;
  all_version: Version[];
}

export interface ApiResponse {
  all_api: Api[];
}

export interface UsersApiPackagesResponse extends IPaginationMeta {
  list: UsersApiPackage[];
}

export interface StepPackage {
  price: number;
  max_api_call_count?: number;
}

export interface ApiPackage {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  type: string;
  price: number;
  daily_limit: number;
  enroll: number;
  step_package_data: StepPackage[];
  is_active: boolean;
  is_buy_active: boolean;
  monthly_limit: number;
}

export interface ApiPackageResponse {
  api_package: ApiPackage[];
}
