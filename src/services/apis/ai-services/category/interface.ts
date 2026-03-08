import { IPaginationMeta } from "@/services";
import { AiSeoInfo } from "../ai-seo-info";

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  english_name: string;
  rank: number;
  picture: string;
  is_active: boolean;
}

export interface CategoryParams {
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

export interface CategoryResponse extends IPaginationMeta {
  data: Category[];
}

export interface CategoryNamesResponse {
  names: string[];
}

export interface CategoryInfo {
  id?: string;
  name: string;
  english_name: string;
  rank?: number;
  picture: string;
  picture_id?: string;
  is_active?: string;
  description?: string;
  seo_info?: AiSeoInfo;
}
