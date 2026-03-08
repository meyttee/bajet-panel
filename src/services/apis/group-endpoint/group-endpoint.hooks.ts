import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import { GroupEndpointServices } from "./group-endpoint.service";
import {
  EndpointLog,
  GroupEndpointChartParams,
  GroupEndpointLogParams,
  GroupEndpointLogResponse,
} from "./interface";

const groupEndpointServices = new GroupEndpointServices();

export const useGetEndpointChartById = (
  id: string,
  params: GroupEndpointChartParams,
) =>
  useQuery({
    queryKey: ["endpointChart", id, params],
    queryFn: () => groupEndpointServices.getGroupEndpointChartById(id, params),
    enabled: !!id,
    select: ({ data }) => data.data,
  });

export const useGetEndpointListById = (id: string) =>
  useQuery({
    queryKey: ["endpointList", id],
    queryFn: () => groupEndpointServices.getGroupEndpointListById(id),
    enabled: !!id,
    select: ({ data }) => data.data.data,
  });

export const useGetGroupEndpointLogsById = (id: string) => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: groupEndpointLogs = [],
    isLoading,
    isFetching,
  } = useQuery<GroupEndpointLogResponse, Error, EndpointLog[]>({
    queryKey: ["groupEndpointLogs", id, allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[2] as GroupEndpointLogParams;

      const queryParams: GroupEndpointLogParams = {
        page_size: page_size || 10,
        ...params,
      };

      const response = await groupEndpointServices.getGroupEndpointLogsById(
        id,
        queryParams,
      );
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.endpoint_log;
    },
    placeholderData: keepPreviousData,
  });

  return {
    groupEndpointLogs,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
  };
};
