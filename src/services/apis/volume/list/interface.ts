interface IGetVolumeListRequestPayload {
  status: string;
  mount_scope: "";
  storage_capacity__lte: number;
  storage_capacity__gte: number;
  remind_day__gte: number;
  remind_day__lte: number;
  remind_capacity__gte: number;
  remind_capacity__lte: number;
  user_id: string;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface IVolume {
  id: string;
  name: string;
  storage_capacity: number;
  invoice_num: string;
  status: string;
  user: {
    id: string;
    email: string;
    profile_picture: string;
  };
  invoice_status: string;
  expire_time: string;
  mount_scope: string;
  mounted_service: string;
  api_version_id: string;
  remind_day: string;
  remind_hour: string;
  remind_capacity: string;
  mount_path: string;
  is_jupyter_default: boolean;
  extend_invoice_num: string;
  deletion_time: string;
  backup_type: string;
}

interface IGetVolumeListResponsePayload {
  volumes: IVolume[];
  all_capacity: number;
  all_volumes: number;
  remind_capacity: number;
  page_count: number;
  total_count: number;
}

interface IGetVolumeDataResponsePayload {
  id: string;
  user_id: string;
  name: string;
  mounted_service: string;
  mount_path: string;
  status: string;
  storage_capacity: number;
  allowed_capacity: number;
  exist_volume: true;
  mount_scope: string;
  api_version_id: string;
  invoice_id: string;
  is_jupyter_default: boolean;
  expire_time: string;
}

interface IPostExtendVolume {
  user_id: string;
  storage_capacity: number;
  pay_now: boolean;
  payment_explanation?: string;
}

interface ICheckPermissionResponsePayload {
  user_id: string;
  mount_scope: string;
  api_version_id?: string;
}

interface IGetDestinationsResponsePayload {
  mount_scope: string;
  name: string;
  use_volume: boolean;
  version_id?: string;
}

interface ICreateVolumeRequestPayload {
  user_id: string;
  name: string;
  storage_capacity: number;
  mount_scope?: string;
  api_version_id?: string;
  mount_path?: string;
  pay_now: boolean;
  payment_explanation?: string;
}

interface IMountVolumeResponsePayload {
  user_id: string;
  mount_scope: string;
  mount_path: string;
  api_version_id?: string;
}

interface IBackupDetails {
  details: {
    created_at: string;
    detail: string;
  }[];
  page_count: number;
  total_count: number;
}

interface IBackupDetailsRequesPayload {
  created_at__date__lte: string;
  created_at__date__gte: string;
  page: number;
  page_size: number;
}

export type {
  IGetVolumeListRequestPayload,
  IGetVolumeListResponsePayload,
  IVolume,
  IGetVolumeDataResponsePayload,
  IPostExtendVolume,
  IGetDestinationsResponsePayload,
  ICreateVolumeRequestPayload,
  IMountVolumeResponsePayload,
  ICheckPermissionResponsePayload,
  IBackupDetails,
  IBackupDetailsRequesPayload,
};
