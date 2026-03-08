import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import { useQueryParams } from "@/hooks/useQueryParams";

import { toast } from "@/components";
import { CategoryServices } from "./category.service";

import {
  Category,
  CategoryInfo,
  CategoryParams,
  CategoryResponse,
} from "./interface";

const categoryServices = new CategoryServices();

export const useGetAiCategories = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: categories = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<CategoryResponse, Error, Category[]>({
    queryKey: ["categories", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as CategoryParams;
      const queryParams: CategoryParams = {
        page: page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await categoryServices.getCategories(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    categories,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetCategoryNames = () =>
  useQuery({
    queryKey: ["categoryNames"],
    queryFn: () => categoryServices.getCategoryNames(),
    select: ({ data }) => data.data.names,
  });

export const useAddCategoryInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addCategoryInfo"],
    mutationFn: (category: CategoryInfo) =>
      categoryServices.addCategoryInfo(category),
    onSuccess: () => {
      toast.success("دسته‌بندی جدید با موفقیت اضافه شد.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.error);
    },
  });
};

export const useUpdateCategoryInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCollectionInfo"],
    mutationFn: (category: CategoryInfo) =>
      categoryServices.updateCategoryInfo(category),
    onSuccess: ({ data }) => {
      toast.success("اطلاعات دسته‌بندی با موفقیت ویرایش شد.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({
        queryKey: ["categoryInfo", data.data.id],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.error);
    },
  });
};

export const useGetCategoryInfo = (categoryId?: string) =>
  useQuery({
    queryKey: ["categoryInfo", categoryId],
    queryFn: () => categoryServices.getCategoryInfo(categoryId),
    select: ({ data }) => data.data,
    enabled: !!categoryId,
  });
