import { IPaginationMeta } from "@/services";
import { AiSeoInfo } from "../ai-seo-info";

export interface Collection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  english_name: string;
  is_active: boolean;
  rank: number;
  picture: string;
}

export interface CollectionParams {
  name: string;
  created_at__lte: string;
  created_at__gte: string;
  updated_at__lte: string;
  updated_at__gte: string;
  rank__lte: string;
  rank__gte: string;
  is_active: string;
  page: string;
  page_size: number;
  search: string;
  ordreing: string;
}

export interface CollectionResponse extends IPaginationMeta {
  list: Collection[];
}

export interface CollectionInfo {
  name: string;
  english_name: string;
  api_order_by: string;
  api_query: string;
  is_active?: string;
  rank?: number;
  picture?: string;
  description?: string;
  id?: string;
  seo_info?: AiSeoInfo;
}

export interface CollectionNamesResponse {
  name: string[];
}
