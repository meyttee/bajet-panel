export interface AiSeoInfo {
  id: string;
  title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical: string;
  robots: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface AiSeoInfoFields
  extends Omit<AiSeoInfo, "id" | "created_at" | "updated_at"> {
  id?: string;
  type?: "collection" | "category";
}
