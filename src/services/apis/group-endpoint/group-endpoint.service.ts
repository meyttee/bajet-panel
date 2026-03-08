import { AxiosResponse } from "axios";

import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

import {
  EndpointListResponse,
  GroupEndpointChart,
  GroupEndpointChartParams,
  GroupEndpointLogParams,
  GroupEndpointLogResponse,
} from "./interface";

export class GroupEndpointServices extends AbstractAPI {
  constructor() {
    super("v1/admin/group_endpoint");
  }

  public async getGroupEndpointChartById(
    id: string,
    params: GroupEndpointChartParams,
  ): Promise<AxiosResponse<INetworkResponse<GroupEndpointChart>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/chart/`,
      params,
    });
  }

  public async getGroupEndpointListById(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<EndpointListResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/endpoint_list/`,
    });
  }

  public async getGroupEndpointLogsById(
    id: string,
    params: GroupEndpointLogParams,
  ): Promise<AxiosResponse<INetworkResponse<GroupEndpointLogResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/log/`,
      params,
    });
  }
}
