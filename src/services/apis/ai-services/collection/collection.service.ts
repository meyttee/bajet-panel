import { AxiosResponse } from "axios";
import { AbstractAPI, INetworkResponse } from "@/services";

import {
  CollectionInfo,
  CollectionNamesResponse,
  CollectionParams,
  CollectionResponse,
} from "./interface";

export class CollectionServices extends AbstractAPI {
  constructor() {
    super("v1/admin/collection");
  }

  public async getCollections(
    params: CollectionParams,
  ): Promise<AxiosResponse<INetworkResponse<CollectionResponse>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/`,
      params,
    });
  }

  public async deleteCollection(
    collectionId: string,
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: "DELETE",
      url: `${this.url}/${collectionId}/`,
    });
  }
  public async addCollectionInfo(
    collection: CollectionInfo,
  ): Promise<AxiosResponse<INetworkResponse<CollectionInfo>>> {
    return await this.http.request({
      method: "POST",
      url: `${this.url}/`,
      data: collection,
    });
  }

  public async updateCollectionInfo(
    collection: CollectionInfo,
  ): Promise<AxiosResponse<INetworkResponse<CollectionInfo>>> {
    return await this.http.request({
      method: "PUT",
      url: `${this.url}/${collection.id}/`,
      data: collection,
    });
  }

  public async getCollectionInfo(
    collectionId?: string,
  ): Promise<AxiosResponse<INetworkResponse<CollectionInfo>>> {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/${collectionId}/`,
    });
  }

  public async getCollectionNames(): Promise<
    AxiosResponse<INetworkResponse<CollectionNamesResponse>>
  > {
    return await this.http.request({
      method: "GET",
      url: `${this.url}/all_name/`,
    });
  }
}
