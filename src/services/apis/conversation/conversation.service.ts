import { AxiosResponse } from "axios";
import {
  IDiscussionVersionResponsePayload,
  IDiscussionVersionParams,
  IDiscussionCategoryResponsePayload,
  IDiscussionDetailResponse,
  IDiscussionMessagesResponse,
} from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services";

export class DiscussionServices extends AbstractAPI {
  constructor() {
    super(`/v1/admin/discussion/`);
  }

  public async getDiscussionVersion(
    id: string,
    params?: IDiscussionVersionParams,
  ): Promise<
    AxiosResponse<INetworkResponse<IDiscussionVersionResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `${this.url}${id}/version/`,
      params,
    });
  }
  public async getDiscussionCategory(): Promise<
    AxiosResponse<INetworkResponse<IDiscussionCategoryResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `${this.url}category/`,
    });
  }
  public async deleteDiscussion(
    id: string,
    description: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: `DELETE`,
      url: `${this.url}${id}/delete/`,
      data: {
        description,
      },
    });
  }
  public async getDiscussionDetail(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<IDiscussionDetailResponse>>> {
    return await this.http.request({
      method: `GET`,
      url: `${this.url}${id}/`,
    });
  }

  public async postApproveDiscussion(
    id: string,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: `POST`,
      url: `${this.url}${id}/approved/`,
    });
  }
  public async getDiscussionMessages(
    id: string,
    params?: IDiscussionVersionParams,
  ): Promise<AxiosResponse<INetworkResponse<IDiscussionMessagesResponse>>> {
    return await this.http.request({
      method: `GET`,
      url: `${this.url}${id}/messages/`,
      params,
    });
  }
}
