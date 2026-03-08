import { AxiosResponse } from "axios";
import {
  IApproveVersionResponsePayload,
  IDeprecateVersionRequestPayload,
  IDeprecateVersionResponsePayload,
  IDisapproveVersionRequestPayload,
  IDisapproveVersionResponsePayload,
  IGetVersionListRequestPayload,
  IGetVersionListResponsePayload,
  IResolveProxyErrorRequestPayload,
  IResolveProxyErrorResponsePayload,
  IVersion,
} from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services";

export default class VersionListServices extends AbstractAPI {
  constructor() {
    super("v1/admin/version");
  }

  public async getVersionList(
    params: IGetVersionListRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<IGetVersionListResponsePayload>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async getVersion(
    versionId: string,
  ): Promise<AxiosResponse<INetworkResponse<IVersion>>> {
    return this.http.request({
      method: "GET",
      url: `${this.url}/${versionId}/`,
    });
  }

  public async deprecateVersion(
    versionId: string,
    payload: IDeprecateVersionRequestPayload,
  ): Promise<
    AxiosResponse<INetworkResponse<IDeprecateVersionResponsePayload>>
  > {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/${versionId}/deprecate/`,
      data: payload,
    });
  }

  public async approveVersion(
    versionId: string,
  ): Promise<AxiosResponse<INetworkResponse<IApproveVersionResponsePayload>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/${versionId}/approve/`,
    });
  }
  public async disapproveVersion(
    versionId: string,
    payload: IDisapproveVersionRequestPayload,
  ): Promise<
    AxiosResponse<INetworkResponse<IDisapproveVersionResponsePayload>>
  > {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/${versionId}/disapprove/`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  public async resolveProxyError(
    versionId: string,
    payload?: IResolveProxyErrorRequestPayload,
  ): Promise<
    AxiosResponse<INetworkResponse<IResolveProxyErrorResponsePayload>>
  > {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/resolve_proxy_error/${versionId}/`,
      data: payload,
    });
  }
}
