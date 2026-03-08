import { AxiosResponse } from "axios";

import { AiConfig } from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

export class AiConfigServices extends AbstractAPI {
  constructor() {
    super("v1/admin/ai_config");
  }

  public async getAiConfig(): Promise<
    AxiosResponse<INetworkResponse<AiConfig>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
    });
  }

  public async updateAiConfig(
    data: Partial<AiConfig>,
  ): Promise<AxiosResponse<INetworkResponse<AiConfig>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/update_config/`,
      data,
    });
  }
}
