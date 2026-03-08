import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import {
  IGetVolumeListResponsePayload,
  IGetVolumeListRequestPayload,
  IBackupDetails,
  IPostExtendVolume,
  ICreateVolumeRequestPayload,
  IMountVolumeResponsePayload,
  ICheckPermissionResponsePayload,
  IBackupDetailsRequesPayload,
} from "./interface";
import VolumeListServices from "./volume-list.service";
import { INetworkResponse } from "@/services/interceptor";

const volumeServices = new VolumeListServices();

const useGetVolumeList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const { data, isLoading, isFetching, refetch } = useQuery<
    IGetVolumeListResponsePayload,
    Error
  >({
    queryKey: ["useGetVolumeList", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as IGetVolumeListRequestPayload;
      const queryParams: IGetVolumeListRequestPayload = {
        ...params,
        page,
        page_size: page_size || 10,
      };

      const response = await volumeServices.getVolumelist(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  return {
    volumes: data,
    totalPages,
    totalItems,
    isLoading: isLoading,
    isFetching: isFetching,
    refetch: refetch,
  };
};

const useGetVolumeData = (id: string) =>
  useQuery({
    queryKey: ["useGetVolumeData"],
    queryFn: async () => await volumeServices.getVolumeData(id),
  });

const useExtendVolume = () =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: IPostExtendVolume }) =>
      await volumeServices.extendVolume(id, data),
    mutationKey: ["useExtendVolume"],
  });

const useDeleteVolume = () =>
  useMutation({
    mutationFn: async (id: string) => await volumeServices.deleteVolume(id),
    mutationKey: ["useDeleteVolume"],
  });

const useGetDestinations = (user_id: string) =>
  useQuery({
    queryKey: ["useGetDestinations"],
    queryFn: async () => await volumeServices.getDestinations(user_id),
    enabled: !!user_id,
  });

const useCreateVolume = () =>
  useMutation({
    mutationFn: async (data: ICreateVolumeRequestPayload) =>
      await volumeServices.createVolume(data),
    mutationKey: ["useCreateVolume"],
  });

const useMountVolume = () =>
  useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      id: string;
      data: IMountVolumeResponsePayload;
    }) => await volumeServices.mountVolume(id, data),
    mutationKey: ["useMountVolume"],
  });

const useUnmountvolume = () =>
  useMutation({
    mutationFn: async (id: string) => await volumeServices.unmountVolume(id),
    mutationKey: ["useUnmountvolume"],
  });

const useBackupVolume = () =>
  useMutation({
    mutationFn: async (id: string) => await volumeServices.backupVolume(id),
    mutationKey: ["useUnmountvolume"],
  });

const useCheckPermission = () =>
  useMutation({
    mutationFn: async ({ data }: { data: ICheckPermissionResponsePayload }) =>
      await volumeServices.checkPremission(data),
    mutationKey: ["useCheckPermission"],
  });

const useBackupDetails = (id: string) => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const { data, isLoading, isFetching, refetch } = useQuery<
    IBackupDetails,
    Error
  >({
    queryKey: ["useBackupDetails", allQueryParams, id],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as IBackupDetailsRequesPayload;
      const queryParams: IBackupDetailsRequesPayload = {
        ...params,
        page,
        page_size: page_size || 10,
      };

      const response = await volumeServices.backupReport(id, queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  return {
    details: data,
    totalPages,
    totalItems,
    isLoading: isLoading,
    isFetching: isFetching,
    refetch: refetch,
  };
};

const useFixInitializing = () =>
  useMutation({
    mutationFn: async (id: string) => volumeServices.fixInitializing(id),
    mutationKey: ["useFixInitializing"],
  });

export {
  useGetVolumeList,
  useGetVolumeData,
  useExtendVolume,
  useDeleteVolume,
  useGetDestinations,
  useCreateVolume,
  useMountVolume,
  useUnmountvolume,
  useCheckPermission,
  useBackupVolume,
  useBackupDetails,
  useFixInitializing,
};
