import { AxiosResponse } from "axios";
import { AbstractAPI, INetworkResponse } from "@/services";
import {
  IGetApisLogsRequestPayload,
  IGetApisLogsResponsePayload,
  IGetUserApis,
} from "./interface";

export default class ApisLogsServices extends AbstractAPI {
  constructor() {
    super("");
  }

  public async getApisLogs(
    params: IGetApisLogsRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<IGetApisLogsResponsePayload>>> {
    return await this.http.request({
      method: "GET",
      url: `v2/admin/api/platform_report/`,
      params,
    });
  }

  public async getAPIS(
    userId: string,
    params: IGetApisLogsRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<IGetUserApis>>> {
    return await this.http.request({
      method: "GET",
      url: `v1/admin/version/${userId}/user/`,
      params,
    });
  }
}
