import { AbstractAPI, INetworkResponse } from "@/services";
import { AxiosResponse } from "axios";

import {
  CategoryInfo,
  CategoryNamesResponse,
  CategoryParams,
  CategoryResponse,
} from "./interface";

export class CategoryServices extends AbstractAPI {
  constructor() {
    super("v1/admin/category");
  }

  public async getCategories(
    params: CategoryParams,
  ): Promise<AxiosResponse<INetworkResponse<CategoryResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async getCategoryNames(): Promise<
    AxiosResponse<INetworkResponse<CategoryNamesResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/all_name/`,
    });
  }

  public async addCategoryInfo(
    collection: CategoryInfo,
  ): Promise<AxiosResponse<INetworkResponse<CategoryInfo>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data: collection,
    });
  }

  public async updateCategoryInfo(
    category: CategoryInfo,
  ): Promise<AxiosResponse<INetworkResponse<CategoryInfo>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/${category.id}/`,
      data: category,
    });
  }

  public async getCategoryInfo(
    categoryId?: string,
  ): Promise<AxiosResponse<INetworkResponse<CategoryInfo>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${categoryId}/`,
    });
  }
}
