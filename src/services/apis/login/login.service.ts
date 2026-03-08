import { AxiosResponse } from "axios";

import { AbstractAPI, INetworkResponse } from "@/services";

import { ILogiPayload, ILogiResponse } from "./interface";

export class AuthServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async postUserAuthLogin(
    data: ILogiPayload,
  ): Promise<AxiosResponse<INetworkResponse<ILogiResponse>>> {
    return await this.http.request({
      method: `POST`,
      url: `v1/user/register/login/`,
      data,
    });
  }

  public async reloadCaptcha(data: { captcha_key: string }): Promise<
    AxiosResponse<
      INetworkResponse<{
        captcha: {
          captcha_key: string;
          captcha_image: string;
        };
      }>
    >
  > {
    return await this.http.request({
      method: `POST`,
      url: `v1/user/register/reload_captcha/`,
      data,
    });
  }
}
