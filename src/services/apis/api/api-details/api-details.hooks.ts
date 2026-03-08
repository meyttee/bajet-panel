import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiDetailServices } from "./api-details.service";
import {
  CreateSeoInfoPayload,
  UpdateApiDetailSettingPayload,
  UpdateSeoInfoPayload,
} from "@/services/apis/api/api-details/interface";
import { useQueryParams } from "@/hooks";

const apiDetailServices = new ApiDetailServices();

const useGetApiBaseInfo = (apiId: string) =>
  useQuery({
    queryFn: async () => await apiDetailServices.getApiBaseInfo(apiId),
    queryKey: ["useGetApiBaseInfo", apiId],
    select: (data) => data.data.data,
  });

const useGetApiEndpoints = (versionId: string) => {
  const { search } = useQueryParams();
  return useQuery({
    queryKey: [`useGetApiEndpoints`, versionId, search],
    queryFn: async () =>
      await apiDetailServices.getApiEndpoints(versionId, search),
    select: (data) => data.data.data,
  });
};

const useChangeAccuracy = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { preference: number };
    }) => await apiDetailServices.changeEndpointAccuracy(id, data),
    mutationKey: [`useChangeAccuracy`],
  });

const useGetApiDetailSetting = (apiId: string) =>
  useQuery({
    queryKey: ["useGetApiDetailSetting", apiId],
    queryFn: async () => {
      const response = await apiDetailServices.getApiDetailSetting(apiId);
      return response.data.data;
    },
    enabled: Boolean(apiId),
  });

const useUpdateApiDetailSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      apiId,
      payload,
    }: {
      apiId: string;
      payload: UpdateApiDetailSettingPayload;
    }) => apiDetailServices.updateApiDetailSetting(apiId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["useGetApiDetailSetting", variables.apiId],
      });
    },
  });
};

const useGetApiDetailBaseVersion = (apiId: string) =>
  useQuery({
    queryKey: ["useGetApiDetailBaseVersion", apiId],
    queryFn: async () => {
      const res = await apiDetailServices.getApiDetailBaseVersion(apiId);
      return res.data.data;
    },
    enabled: Boolean(apiId),
  });

const useUpdateSeoInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      seoInfoId,
      payload,
    }: {
      seoInfoId: string;
      payload: UpdateSeoInfoPayload;
    }) => apiDetailServices.updateSeoInfo(seoInfoId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["useGetApiDetailBaseVersion"],
      });
    },
  });
};
const useCreateSeoInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSeoInfoPayload) =>
      apiDetailServices.createSeoInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetApiDetailBaseVersion"],
      });
    },
  });
};

const useGetApiVersionInfo = (versionId: string) =>
  useQuery({
    queryKey: ["apiVersionInfo", versionId],
    queryFn: () => apiDetailServices.getApiVersionInfo(versionId),
    select: ({ data }) => data.data,
  });

export {
  useGetApiEndpoints,
  useChangeAccuracy,
  useGetApiBaseInfo,
  useGetApiDetailSetting,
  useUpdateApiDetailSetting,
  useGetApiDetailBaseVersion,
  useUpdateSeoInfo,
  useCreateSeoInfo,
  useGetApiVersionInfo,
};
