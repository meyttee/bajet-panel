import { toast } from "@/components";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import { useQueryParams } from "@/hooks/useQueryParams";

import { CollectionServices } from "./collection.service";
import {
  Collection,
  CollectionInfo,
  CollectionParams,
  CollectionResponse,
} from "./interface";

const collectionServices = new CollectionServices();

export const useGetCollections = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: collections = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<CollectionResponse, Error, Collection[]>({
    queryKey: ["collections", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as CollectionParams;
      const queryParams: CollectionParams = {
        page: page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await collectionServices.getCollections(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.list;
    },
    placeholderData: keepPreviousData,
  });

  return {
    collections,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCollection"],
    mutationFn: (id: string) => collectionServices.deleteCollection(id),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت حذف شد.");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useAddCollectionInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addCollectionInfo"],
    mutationFn: (collection: CollectionInfo) =>
      collectionServices.addCollectionInfo(collection),
    onSuccess: () => {
      toast.success("مجموعه جدید با موفقیت اضافه شد.");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.error);
    },
  });
};

export const useUpdateCollectionInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCollectionInfo"],
    mutationFn: (collection: CollectionInfo) =>
      collectionServices.updateCollectionInfo(collection),
    onSuccess: ({ data }) => {
      toast.success("اطلاعات مجموعه با موفقیت ویرایش شد.");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collectionInfo", data.data.id],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) toast.error(error.response?.data?.error);
    },
  });
};

export const useGetCollectionInfo = (collectionId?: string) =>
  useQuery({
    queryKey: ["collectionInfo", collectionId],
    queryFn: () => collectionServices.getCollectionInfo(collectionId),
    select: ({ data }) => data.data,
    enabled: !!collectionId,
  });

export const useGetCollectionNames = () =>
  useQuery({
    queryKey: ["collectionNames"],
    queryFn: () => collectionServices.getCollectionNames(),
    select: ({ data }) => data.data.name,
  });
