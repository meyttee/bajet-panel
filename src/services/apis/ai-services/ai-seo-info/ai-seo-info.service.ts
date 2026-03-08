import { AbstractAPI, INetworkResponse } from "@/services";
import { AxiosResponse } from "axios";

import { AiSeoInfo, AiSeoInfoFields } from "./interface";

export class AiSeoInfoServices extends AbstractAPI {
  constructor() {
    super("v1/admin/ai_seo_info");
  }

  public async removeAiSeoInfo(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "DELETE",
      url: `${this.url}/${id}/`,
    });
  }

  public async getAiSeoInfo(
    id?: string,
  ): Promise<AxiosResponse<INetworkResponse<AiSeoInfo>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/`,
    });
  }

  public async addAiSeoInfo(
    data: AiSeoInfoFields,
  ): Promise<AxiosResponse<INetworkResponse<AiSeoInfo>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }

  public async updateAiSeoInfo(
    data: AiSeoInfoFields,
  ): Promise<AxiosResponse<INetworkResponse<AiSeoInfo>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/${data.id}/`,
      data,
    });
  }
}
