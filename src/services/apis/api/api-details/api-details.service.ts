import { AxiosResponse } from "axios";

import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

import {
  IGetBaseApiInfo,
  IGetApiEndpoints,
  IApiDetailSetting,
  UpdateApiDetailSettingPayload,
  IApiDetailBaseVersion,
  UpdateSeoInfoPayload,
  CreateSeoInfoPayload,
  VersionInfo,
} from "./interface";

export class ApiDetailServices extends AbstractAPI {
  constructor() {
    super("v1/admin/api_detail");
  }
  public async getApiBaseInfo(
    apiId: string,
  ): Promise<AxiosResponse<INetworkResponse<IGetBaseApiInfo>>> {
    return this.http.request({
      url: `v2/admin/api_detail/${apiId}/base_api/`,
      method: "GET",
    });
  }

  public async getApiEndpoints(
    versionId: string,
    search: string,
  ): Promise<AxiosResponse<INetworkResponse<IGetApiEndpoints>>> {
    return this.http.request({
      url: `v1/admin/group_endpoint/${versionId}/data/`,
      method: "GET",
      params: {
        search,
      },
    });
  }

  public async changeEndpointAccuracy(
    endpointId: string,
    data: { preference: number },
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `v1/admin/group_endpoint/${endpointId}/add_endpoint_preference/`,
    });
  }

  public async getApiDetailSetting(
    apiId: string,
  ): Promise<AxiosResponse<INetworkResponse<IApiDetailSetting>>> {
    return this.http.request({
      url: `/v1/admin/api_detail/${apiId}/setting/`,
      method: "GET",
    });
  }
  public async updateApiDetailSetting(
    apiId: string,
    data: UpdateApiDetailSettingPayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `/v1/admin/api_detail/${apiId}/update_setting/`,
      method: "POST",
      data,
    });
  }
  public async getApiDetailBaseVersion(
    apiId: string,
  ): Promise<AxiosResponse<INetworkResponse<IApiDetailBaseVersion>>> {
    return this.http.request({
      url: `/v1/admin/api_detail/${apiId}/base_version/`,
      method: "GET",
    });
  }

  public async updateSeoInfo(
    seoInfoId: string,
    data: UpdateSeoInfoPayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `/v1/admin/version_seo_info/${seoInfoId}/`,
      method: "PUT",
      data,
    });
  }
  public async createSeoInfo(
    data: CreateSeoInfoPayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `/v1/admin/version_seo_info/`,
      method: "POST",
      data,
    });
  }

  public async getApiVersionInfo(
    versionId: string,
  ): Promise<AxiosResponse<INetworkResponse<VersionInfo>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${versionId}/base_version/`,
    });
  }
}
