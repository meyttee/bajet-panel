import { AxiosResponse } from "axios";

import { WithdrawItem, WithdrawItemResponse } from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

export class WithdrawItemServices extends AbstractAPI {
  constructor() {
    super("v1/admin/withdraw_item");
  }

  public async getWithdrawItem(): Promise<
    AxiosResponse<INetworkResponse<WithdrawItemResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
    });
  }

  public async addWithdrawItem(
    data: Partial<WithdrawItem>,
  ): Promise<AxiosResponse<INetworkResponse<WithdrawItem>>> {
    return this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }
}
