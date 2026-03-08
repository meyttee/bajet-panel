import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import { ServersServices } from "./servers.service";
import {
  IServer,
  IServersReponsePayload,
  IServersRequestPayload,
  IStartServerRequestPayload,
} from "./interface";

const serversServices = new ServersServices();

const useGetServerList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: servers = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IServersReponsePayload, Error, IServer[]>({
    queryKey: ["useGetList", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[1] as IServersRequestPayload;
      const queryParams: IServersRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };

      const response = await serversServices.getServers(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return {
    servers,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useStopServer = () =>
  useMutation({
    mutationFn: async (id: string) => await serversServices.stopServer(id),
    mutationKey: ["useStopServer"],
  });

const useStartServer = () =>
  useMutation({
    mutationFn: async (data: IStartServerRequestPayload) =>
      await serversServices.startServer(data),
    mutationKey: ["useStopServer"],
  });

export { useGetServerList, useStopServer, useStartServer };
