import { AxiosResponse } from "axios";
import {
  ApiParkSetting,
  IDeploymentRequest,
  IDeploymentResponse,
  IDeploymentResult,
  IDeployPayload,
  UpdateApiParkSetting,
  ApiQueueParams,
  ApiQueueResponse,
  AiServiceApiResponse,
  DeploymentLabelsResponse,
  LogsParams,
  LogsResponse,
  ProblemsParams,
  ProblemsResponse,
  DeploymentResponse,
  ImageResponse,
  DeployLogResponse,
  StopImagePayload,
  CommandPayload,
  CommandResponse,
} from "./interface";
import { AbstractAPI, INetworkResponse } from "@/services/interceptor";

export default class OperationService extends AbstractAPI {
  constructor() {
    super("v1/admin/operation_service");
  }

  public async getDeployList(
    params: IDeploymentRequest,
  ): Promise<AxiosResponse<INetworkResponse<IDeploymentResponse>>> {
    return this.http.request({
      method: "GET",
      url: `${this.url}/deploy/deployment_list/?scope=apipark`,
      params,
    });
  }

  public async deploy(
    data: IDeployPayload,
  ): Promise<AxiosResponse<INetworkResponse<IDeploymentResult>>> {
    return this.http.request({
      method: "POST",
      url: `${this.url}/deploy/`,
      data,
    });
  }

  public async stopDeploy(
    deploymentName: string,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "DELETE",
      url: `${this.url}/deploy/${deploymentName}/stop_deploy/`,
    });
  }

  public async getApiParkSetting(): Promise<
    AxiosResponse<INetworkResponse<ApiParkSetting>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/park/setting/`,
    });
  }

  public async updateApiParkSetting(
    data: UpdateApiParkSetting,
  ): Promise<AxiosResponse<INetworkResponse<ApiParkSetting>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/park/update_setting/`,
      data,
    });
  }

  public async getLogs(
    params: LogsParams,
  ): Promise<AxiosResponse<INetworkResponse<LogsResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/park/log_list/`,
      params,
    });
  }

  public async getProblems(
    params: ProblemsParams,
  ): Promise<AxiosResponse<INetworkResponse<ProblemsResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/park/problem_list/`,
      params,
    });
  }

  public async postSolveProblem(
    versionId: string,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/park/${versionId}/solve_problem/`,
    });
  }

  public async getApisQueue(
    params: ApiQueueParams,
  ): Promise<AxiosResponse<INetworkResponse<ApiQueueResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/park/park_list/`,
      params,
    });
  }

  public async getDeploymentLabels(): Promise<
    AxiosResponse<INetworkResponse<DeploymentLabelsResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/deploy/deployment_labels/`,
    });
  }

  public async getAllApis(): Promise<
    AxiosResponse<INetworkResponse<AiServiceApiResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: "v1/admin/api/all/",
    });
  }

  public async getDeployment(
    deployment_name?: string,
  ): Promise<AxiosResponse<INetworkResponse<DeploymentResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/deploy/${deployment_name}/retrieve_deployment/`,
    });
  }

  public async getImage(
    deployment_name?: string,
  ): Promise<AxiosResponse<INetworkResponse<ImageResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/image/${deployment_name}/retrieve_image/`,
    });
  }
  public async postImage(
    data: IDeployPayload,
  ): Promise<AxiosResponse<INetworkResponse<ImageResponse>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/image/`,
      data,
    });
  }
  async postImageStop(
    data: StopImagePayload,
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/image/stop_prepare_image/`,
      data,
    });
  }
  public async getDeployLog(
    deployment_name?: string,
  ): Promise<AxiosResponse<INetworkResponse<DeployLogResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/deploy/${deployment_name}/deploy_log/`,
    });
  }
  public async postCommand(
    data: CommandPayload,
  ): Promise<AxiosResponse<INetworkResponse<CommandResponse>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/deploy/exec/`,
      data,
    });
  }
}
