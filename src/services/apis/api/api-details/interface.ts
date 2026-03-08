import { AiSeoInfo } from "../../ai-services";

interface IBaseApiInfoTags {
  id: string;
  name: string;
  is_approved: boolean;
}
interface IBaseApiInfoCategory {
  id: string;
  name: string;
  english_name: string;
  picture: string;
}

interface IApiInfoVersions {
  id: string;
  version: string;
  status: string;
}

interface IApiUser {
  id: string;
  nick_name: string;
  role: string;
  profile_picture: string;
  email: string;
}

interface IGetBaseApiInfo {
  id: string;
  created_at: string;
  updated_at: string;
  summary: string;
  name: string;
  picture: string;
  slug: string;
  user: IApiUser;
  category: IBaseApiInfoCategory;
  tags: IBaseApiInfoTags[];
  enroll: number;
  requests: number;
  delay_time_millisecond: number;
  all_version: IApiInfoVersions;
  description: string;
  use_case: string;
  demo: string;
  rating: number;
  preference: number;
  count_rating: number;
}

interface IEndpointGroup {
  id: string;
  name: string;
  url: string;
  action_type: string;
  preference: number;
  delay_time_millisecond: number;
  errors: number;
}

interface IEndpoint {
  id: string;
  name: string;
  action_type: string;
  delay_time_millisecond: number;
  preference: number;
  errors: number;
  all_endpoint: IEndpointGroup[];
}

interface IGetApiEndpoints {
  group_endpoint: IEndpoint[];
  page_count: number;
  total_count: number;
}

interface IApiDetailSetting {
  version_count: number;
  version_up_count: number;
  earnings_coefficient_api: number;
}
interface UpdateApiDetailSettingPayload {
  earnings_coefficient_api: number;
  version_count: number;
  version_up_count: number;
}

interface HardwareResource {
  use_gpu: boolean;
  cuda_version: {
    label: string;
    cuda_version_type: string;
    price: number;
  };
  core: { value: number };
  ram: { value: number };
  label: string;
}

const versionStatus = {
  proccessing: "PROCESSING",
  accepted: "ACCEPTED",
  not_accepted: "NOT_ACCEPTED",
  deprecated: "DEPRECATED",
  waiting_deprecate: "WAITING_DEPRECATE",
  waiting: "WAITING",
  proxy_error: "PROXY_ERROR",
} as const;

type VersionStatus = (typeof versionStatus)[keyof typeof versionStatus];

interface VersionInfo {
  id: string;
  created_at: string;
  updated_at: string;
  version: string;
  address: string;
  status: VersionStatus;
  is_public: boolean;
  description: string;
  is_deprecated: boolean;
  seo_info: AiSeoInfo;
  api_name: string;
  address_type: "Proxy" | "GitUrl" | "DockerImage";
  port: number;
  deprecated_time: string;
  docker_image_address: string;
  git_url: string;
  branch: string;
  proxy_key: string;
  hardware_resource: HardwareResource;
}

interface IApiDetailBaseVersionSeoInfo {
  id: string;
  title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical: string;
  robots: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface IApiDetailBaseVersion {
  id: string;
  created_at: string;
  updated_at: string;
  version: string;
  address: string;
  status: string;
  is_public: boolean;
  description: string;
  is_deprecated: boolean;
  seo_info: IApiDetailBaseVersionSeoInfo;
  api_name: string;
  address_type: string;
  port: number;
  deprecated_time: string;
  docker_image_address: string;
  git_url: string;
  branch: string;
}

interface UpdateSeoInfoPayload {
  title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical: string;
  robots: string;
  image: string;
}
interface CreateSeoInfoPayload {
  title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical: string;
  robots: string;
  image: string;
  version: string;
}
export type {
  IEndpoint,
  IGetApiEndpoints,
  IGetBaseApiInfo,
  IApiDetailSetting,
  UpdateApiDetailSettingPayload,
  IApiDetailBaseVersion,
  IApiDetailBaseVersionSeoInfo,
  UpdateSeoInfoPayload,
  CreateSeoInfoPayload,
  VersionStatus,
  VersionInfo,
};
