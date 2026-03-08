import { AxiosResponse } from "axios";

import {
  NotificationType,
  NotificationTypeParams,
  NotificationTypeResponse,
  NotificationTypeForm,
} from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

export class NotificationTypeServices extends AbstractAPI {
  constructor() {
    super("v1/admin/notification_type");
  }

  public async getNotificationTypes(
    params: NotificationTypeParams,
  ): Promise<AxiosResponse<INetworkResponse<NotificationTypeResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async getNotificationType(
    id?: string,
  ): Promise<AxiosResponse<INetworkResponse<NotificationType>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${id}/`,
    });
  }

  public async updateNotificationType(
    data: NotificationTypeForm,
  ): Promise<AxiosResponse<INetworkResponse<NotificationType>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/${data.id}/`,
      data,
    });
  }

  public async addNotificationType(
    data: NotificationTypeForm,
  ): Promise<AxiosResponse<INetworkResponse<NotificationType>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }
}
