import { AbstractAPI, INetworkResponse } from "@/services";

import {
  IServersReponsePayload,
  IServersRequestPayload,
  IStartServerRequestPayload,
} from "./interface";
import { AxiosResponse } from "axios";

export class ServersServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async getServers(
    params: IServersRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<IServersReponsePayload>>> {
    return this.http.request({
      url: "v1/admin/operation_service/deploy/deployment_list/",
      method: "GET",
      params,
    });
  }
  public async stopServer(id: string) {
    return this.http.request({
      url: `v1/admin/operation_service/deploy/${id}/stop_deploy/`,
      method: "DELETE",
    });
  }
  public async startServer(data: IStartServerRequestPayload) {
    return this.http.request({
      url: `v1/admin/operation_service/deploy/`,
      method: "POST",
      data,
    });
  }
}
