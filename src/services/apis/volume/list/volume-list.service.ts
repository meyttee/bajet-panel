import { AxiosResponse } from "axios";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

import {
  IBackupDetails,
  IBackupDetailsRequesPayload,
  ICheckPermissionResponsePayload,
  ICreateVolumeRequestPayload,
  IGetDestinationsResponsePayload,
  IGetVolumeDataResponsePayload,
  IGetVolumeListRequestPayload,
  IGetVolumeListResponsePayload,
  IMountVolumeResponsePayload,
  IPostExtendVolume,
} from "./interface";

export default class VolumeListServices extends AbstractAPI {
  constructor() {
    super("v1/admin/resource_management/volume/");
  }

  public async getVolumelist(
    params: IGetVolumeListRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<IGetVolumeListResponsePayload>>> {
    return await this.http.request({
      url: this.url,
      method: "GET",
      params,
    });
  }

  public async getVolumeData(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<IGetVolumeDataResponsePayload>>> {
    return await this.http.request({
      url: `${this.url}${id}/`,
      method: "GET",
    });
  }

  public async deleteVolume(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/`,
      method: "DELETE",
    });
  }

  public async extendVolume(
    id: string,
    data: IPostExtendVolume,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/extend/`,
      method: "POST",
      data,
    });
  }

  public async createVolume(
    data: ICreateVolumeRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}`,
      method: "POST",
      data,
    });
  }

  public async checkPremission(
    data: ICheckPermissionResponsePayload,
  ): Promise<AxiosResponse<INetworkResponse<{ has_permission: boolean }>>> {
    return await this.http.request({
      url: `${this.url}check_permission/`,
      method: "POST",
      data,
    });
  }

  public async getDestinations(
    user_id: string,
  ): Promise<
    AxiosResponse<INetworkResponse<IGetDestinationsResponsePayload[]>>
  > {
    return await this.http.request({
      url: `${this.url}destinations/${user_id}/`,
      method: "GET",
    });
  }

  public async mountVolume(
    id: string,
    data: IMountVolumeResponsePayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/mount/`,
      method: "POST",
      data,
    });
  }

  public async unmountVolume(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/unmount/`,
      method: "POST",
    });
  }

  public async backupVolume(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/backup/`,
      method: "POST",
    });
  }

  public async backupReport(
    id: string,
    params: IBackupDetailsRequesPayload,
  ): Promise<AxiosResponse<INetworkResponse<IBackupDetails>>> {
    return await this.http.request({
      url: `${this.url}${id}/backup_detail/`,
      method: "GET",
      params,
    });
  }
  public async fixInitializing(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      url: `${this.url}${id}/fix_initializing/`,
      method: "POST",
    });
  }
}
