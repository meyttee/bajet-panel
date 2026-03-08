import { AxiosResponse } from "axios";

import { FinacialConfig } from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

export class FinancialConfigServices extends AbstractAPI {
  constructor() {
    super("v1/admin/financial_config");
  }

  public async getFinancialConfig(): Promise<
    AxiosResponse<INetworkResponse<FinacialConfig>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
    });
  }

  public async addFinancialConfig(
    data: Partial<FinacialConfig>,
  ): Promise<AxiosResponse<INetworkResponse<FinacialConfig>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }
}
