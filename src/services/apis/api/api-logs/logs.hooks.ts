import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import ApisLogsServices from "./logs.service";
import {
  IApiItem,
  IGetApisLogsRequestPayload,
  IGetApisLogsResponsePayload,
  IGetUserApis,
  ILogData,
} from "./interface";

const logsServices = new ApisLogsServices();

export const useGetApisLogs = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: logs = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetApisLogsResponsePayload, Error, ILogData[]>({
    queryKey: ["useGetApisLogs", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as IGetApisLogsRequestPayload;
      const queryParams: IGetApisLogsRequestPayload = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await logsServices.getApisLogs(queryParams);
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
    logs,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetAPIS = (userId: string) => {
  const allQueryParams = useQueryParams();

  const {
    data: apis,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetUserApis, Error, IGetUserApis>({
    queryKey: ["getUserApis", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as IGetApisLogsRequestPayload;
      const queryParams: IGetApisLogsRequestPayload = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await logsServices.getAPIS(userId, queryParams);
      return response.data.data;
    },

    placeholderData: keepPreviousData,
  });

  return {
    apis,
    isLoading,
    isFetching,
  };
};
