import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useQueryParams } from "@/hooks";
import {
  IApproveVersionResponsePayload,
  IDeprecateVersionRequestPayload,
  IDeprecateVersionResponsePayload,
  IDisapproveVersionRequestPayload,
  IDisapproveVersionResponsePayload,
  IGetVersionListRequestPayload,
  IGetVersionListResponsePayload,
  IResolveProxyErrorRequestPayload,
  IResolveProxyErrorResponsePayload,
} from "./interface";
import VersionListServices from "./user-api.service";

const versionListServices = new VersionListServices();

export const useGetVersionList = (userId?: string) => {
  const allQueryParams = useQueryParams();

  const { data, isLoading, isFetching, refetch } = useQuery<
    IGetVersionListResponsePayload,
    Error
  >({
    queryKey: ["versionList", userId, allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[2] as IGetVersionListRequestPayload;
      const queryParams: IGetVersionListRequestPayload = {
        page: page,
        page_size: 10,
        user: userId,
        ...params,
      };

      const response = await versionListServices.getVersionList(queryParams);
      return response.data.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  const versions = data?.list || [];
  const totalPages = data?.page_count || 0;
  const totalItems = data?.total_count || 0;

  return { versions, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useGetVersion = (versionId: string) =>
  useQuery({
    queryKey: ["version", versionId],
    queryFn: () => versionListServices.getVersion(versionId),
    select: ({ data }) => data.data,
  });

export const useDeprecateVersion = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IDeprecateVersionResponsePayload,
    Error,
    { versionId: string; payload: IDeprecateVersionRequestPayload }
  >({
    mutationFn: async ({ versionId, payload }) => {
      const response = await versionListServices.deprecateVersion(
        versionId,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["versionList"] });
      queryClient.invalidateQueries({
        queryKey: ["version", variables.versionId],
      });
    },
  });
};

export const useApproveVersion = () => {
  const queryClient = useQueryClient();

  return useMutation<IApproveVersionResponsePayload, Error, string>({
    mutationFn: async (versionId: string) => {
      const response = await versionListServices.approveVersion(versionId);
      return response.data.data;
    },
    onSuccess: (versionId) => {
      queryClient.invalidateQueries({ queryKey: ["versionList"] });
      queryClient.invalidateQueries({ queryKey: ["version", versionId] });
    },
  });
};

export const useDisapproveVersion = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IDisapproveVersionResponsePayload,
    Error,
    { versionId: string; payload: IDisapproveVersionRequestPayload }
  >({
    mutationFn: async ({ versionId, payload }) => {
      const response = await versionListServices.disapproveVersion(
        versionId,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["versionList"] });
      queryClient.invalidateQueries({
        queryKey: ["version", variables.versionId],
      });
    },
  });
};

export const useResolveProxyError = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IResolveProxyErrorResponsePayload,
    Error,
    {
      versionId: string;
      payload?: IResolveProxyErrorRequestPayload;
    }
  >({
    mutationFn: async ({ versionId, payload }) => {
      const response = await versionListServices.resolveProxyError(
        versionId,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["versionList"] });
      queryClient.invalidateQueries({
        queryKey: ["version", variables.versionId],
      });
    },
  });
};
