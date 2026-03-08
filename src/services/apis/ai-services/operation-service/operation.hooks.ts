import { useQueryParams } from "@/hooks/useQueryParams";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  IDeploymentResponse,
  IDeploymentRequest,
  IDeploymentResult,
  IDeployPayload,
  UpdateApiParkSetting,
  ApiQueue,
  ApiQueueParams,
  ApiQueueResponse,
  Log,
  LogsParams,
  LogsResponse,
  Problem,
  ProblemsParams,
  ProblemsResponse,
  StopImagePayload,
  CommandResponse,
  CommandPayload,
} from "./interface";
import OperationService from "./operation.service";
import { toast } from "@/components/ui";

const operationService = new OperationService();

export const useDeploymentList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: servers = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IDeploymentResponse, Error, IDeploymentResult[]>({
    queryKey: ["deploymentList", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IDeploymentRequest;
      const queryParams: IDeploymentRequest = {
        page: page,
        page_size: 10,
        ...params,
      };
      const resp = await operationService.getDeployList(queryParams);
      return resp.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { servers, totalItems, totalPages, isLoading, refetch, isFetching };
};

export const useDeployServer = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeploymentResult, Error, IDeployPayload>({
    mutationFn: (newUserPayload: IDeployPayload) =>
      operationService.deploy(newUserPayload).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deploymentList"] });
      toast.success("عملیات مورد نظر با موفقیت اجرا شد.");
    },
  });
};

export const useDeleteDeploy = () =>
  useMutation({
    mutationFn: (id: string) => operationService.stopDeploy(id),
    onSuccess: () => {
      toast.success("سرور مورد نظر با موفقیت خاموش شد.");
    },
    mutationKey: [`deleteDeployment`],
  });

export const useGetApiParkSetting = () =>
  useQuery({
    queryKey: ["apiParkSetting"],
    queryFn: () => operationService.getApiParkSetting(),
    select: ({ data }) => data.data,
  });

export const useUpdateApiParkSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateApiParkSetting) =>
      operationService.updateApiParkSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiParkSetting"] });
      toast.success("تغییر تنظیمات با موفقیت انجام شد");
    },
  });
};

export const useGetLogs = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: logs = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<LogsResponse, Error, Log[]>({
    queryKey: ["logs", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as LogsParams;
      const queryParams: LogsParams = {
        page: page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await operationService.getLogs(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.logs;
    },
    placeholderData: keepPreviousData,
  });

  return { logs, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useGetProblems = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: problems = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ProblemsResponse, Error, Problem[]>({
    queryKey: ["problems", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as ProblemsParams;
      const queryParams: ProblemsParams = {
        page: page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await operationService.getProblems(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { problems, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const usePostSolveProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postSolveProblem"],
    mutationFn: (versionId: string) =>
      operationService.postSolveProblem(versionId),
    onSuccess: () => {
      toast.success("وضعیت مشکل به «حل شده» تغییر یافت.");
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      queryClient.invalidateQueries({ queryKey: ["apisQueue"] });
    },
  });
};

export const useGetApisQueue = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: apisQueue = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ApiQueueResponse, Error, ApiQueue[]>({
    queryKey: ["apisQueue", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as ApiQueueParams;
      const queryParams: ApiQueueParams = {
        page: page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await operationService.getApisQueue(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { apisQueue, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useGetDeploymentLabels = () =>
  useQuery({
    queryKey: ["deploymenyLabels"],
    queryFn: () => operationService.getDeploymentLabels(),
    select: ({ data }) => data.data.labels,
  });

export const useGetAllApis = () =>
  useQuery({
    queryKey: ["apis"],
    queryFn: () => operationService.getAllApis(),
    select: ({ data }) => data.data.all_api,
  });

export const useGetDeployment = (deploymentName?: string) =>
  useQuery({
    queryKey: ["get-deployment", deploymentName],
    queryFn: () => operationService.getDeployment(deploymentName),
    select: ({ data }) => data.data.admin_logs,
    enabled: !!deploymentName,
  });

export const useGetImage = (deploymentName?: string) =>
  useQuery({
    queryKey: ["get-image-log", deploymentName],
    queryFn: () => operationService.getImage(deploymentName),
    select: ({ data }) => data.data.logs,
    enabled: !!deploymentName,
  });
export const useGetDeployLog = (deploymentName?: string) =>
  useQuery({
    queryKey: ["get-deploy-log", deploymentName],
    queryFn: () => operationService.getDeployLog(deploymentName),
    select: ({ data }) => data.data,
    enabled: !!deploymentName,
  });

export const usePostImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUserPayload: IDeployPayload) =>
      operationService.postImage(newUserPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deploymentList"] });
      toast.success("عملیات مورد نظر با موفقیت اجرا شد.");
    },
  });
};

export const usePostImageStop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUserPayload: StopImagePayload) =>
      operationService.postImageStop(newUserPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deploymentList"] });
      toast.success("عملیات مورد نظر با موفقیت اجرا شد.");
    },
  });
};
export const usePostCommand = () => {
  const queryClient = useQueryClient();

  return useMutation<CommandResponse, Error, CommandPayload>({
    mutationKey: ["postCommand"],
    mutationFn: (payload: CommandPayload) =>
      operationService.postCommand(payload).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deploymentList"] });
    },
  });
};
