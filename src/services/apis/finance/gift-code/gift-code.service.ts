import { AbstractAPI, INetworkResponse } from "@/services";
import { AxiosResponse } from "axios";

import {
  GetGiftCodesParams,
  GetGiftCodesReportParams,
  GiftCode,
  GiftCodeUsersParams,
  GiftCodeUsersResponse,
  IGetGiftCodeReportResponse,
  IGetGiftCodesReponse,
  NewGiftCode,
  UpdateGiftCode,
} from "./interface";

export class GiftCodeServices extends AbstractAPI {
  constructor() {
    super(`v1/admin/gift_code`);
  }

  public async getAllGiftCodes(
    params: GetGiftCodesParams,
  ): Promise<AxiosResponse<INetworkResponse<IGetGiftCodesReponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async getGiftCode(
    id?: string,
  ): Promise<AxiosResponse<INetworkResponse<GiftCode>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/`,
    });
  }

  public async createNewGiftCode(
    data: NewGiftCode,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }

  public async updateGiftCode(
    data: UpdateGiftCode,
  ): Promise<AxiosResponse<INetworkResponse<GiftCode>>> {
    const { id, ...giftCodeData } = data;
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/${data.id}/`,
      data: giftCodeData,
    });
  }

  public async deleteGiftCode(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "DELETE",
      url: `${this.url}/${id}/`,
    });
  }

  public async getGiftCodeUsers(
    giftCodeId: string,
    params: GiftCodeUsersParams,
  ): Promise<AxiosResponse<INetworkResponse<GiftCodeUsersResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${giftCodeId}/users/`,
      params,
    });
  }

  public async getGiftCodeReports(
    params: GetGiftCodesReportParams,
  ): Promise<AxiosResponse<INetworkResponse<IGetGiftCodeReportResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/report/`,
      params,
    });
  }
}
