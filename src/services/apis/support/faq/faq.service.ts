import { AxiosResponse } from "axios";

import { AbstractAPI, INetworkResponse } from "@/services";

import {
  ICreateFaqRequestPayload,
  ICreateFaqResponsePayload,
  IFaqItem,
  IGetFaqCategoryListRequestPayload,
  IGetFaqCategoryListResponsePayload,
} from "./interface";

export default class FaqCategoryService extends AbstractAPI {
  constructor() {
    super("v1/admin/faq_category");
  }

  public async getFaqCategoryList(
    params: IGetFaqCategoryListRequestPayload,
  ): Promise<
    AxiosResponse<INetworkResponse<IGetFaqCategoryListResponsePayload>>
  > {
    return this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async createFaq(
    data: ICreateFaqRequestPayload,
  ): Promise<AxiosResponse<INetworkResponse<ICreateFaqResponsePayload>>> {
    return this.http.request({
      method: "POST",
      url: `/v1/admin/faq/`,
      data,
    });
  }

  public async getFaqData(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<ICreateFaqResponsePayload>>> {
    return this.http.request({
      method: "GET",
      url: `/v1/admin/faq/${id}/`,
    });
  }

  public async updateFaq(
    data: ICreateFaqRequestPayload,
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<ICreateFaqResponsePayload>>> {
    return this.http.request({
      method: "PUT",
      url: `/v1/admin/faq/${id}/`,
      data,
    });
  }

  public async deleteFaq(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<IFaqItem>>> {
    return this.http.request({
      method: "DELETE",
      url: `/v1/admin/faq/${id}/`,
    });
  }
}
