import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import {
  IGetPermissionedUsers,
  IGetQuestionsResponsePayload,
  IGetReportByIdResponsePayload,
  IGetReportsResponsePayload,
  IGetSessionsResponsePayload,
  IGetUsersResponsePayload,
  ILineChart,
  ILogiPayload,
  IPermissionedUser,
  IQuestion,
  IGetResources,
  IGetResourcesRequestPayload,
} from "./interface";
import { api } from "../interceptor";

const useGetReports = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetReportsResponsePayload>(
        "/bajet/v1/report",
        {
          params,
        },
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
    queryKey: ["useGetReports", params],
  });
};

const useGetReportById = (id: string) =>
  useQuery({
    queryFn: async () => {
      const res = await api.get<IGetReportByIdResponsePayload>(
        `/bajet/v1/${id}`,
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
    queryKey: ["useGetReportById", id],
  });

const useGetManageSessions = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetSessionsResponsePayload>("/bajet/v1/", {
        params,
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
    queryKey: ["useGetManageSessions", params],
  });
};

const useGetQuestions = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetQuestionsResponsePayload>(
        "/bajet/v1/questions",
        { params },
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
    queryKey: ["useGetQuestions", params],
  });
};

const useGetQuestionById = (id: string) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IQuestion>(`/bajet/v1/questions/${id}/`);
      return res.data;
    },
    queryKey: ["useGetQuestionById", id],
    placeholderData: keepPreviousData,
  });
};

const useGetUsers = () => {
  const params = useQueryParams();

  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetUsersResponsePayload>("/bajet/v1/users", {
        params,
      });
      return res.data;
    },
    queryKey: ["useGetUsers", params],
    placeholderData: keepPreviousData,
  });
};

const useLoginMutation = () =>
  useMutation({
    mutationFn: async (data: ILogiPayload) => await api.post("/token/", data),
    mutationKey: [`useLoginMutation`],
  });

const useGetPermissionedUsers = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetPermissionedUsers>("/user/v1/", {
        params,
      });
      return res.data;
    },
    queryKey: ["useGetPermissionedUsers", params],
    placeholderData: keepPreviousData,
  });
};

const useGetPermissionedUser = (id?: number) =>
  useQuery({
    queryKey: ["useGetPermissionedUser", id],
    queryFn: async () => await api.get<IPermissionedUser>(`/user/v1/${id}`),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

const useGetPermissionedUserMutation = () =>
  useMutation({
    mutationKey: ["useGetPermissionedUserMutation"],
    mutationFn: async (id?: number) =>
      await api.get<IPermissionedUser>(`/user/v1/${id}`),
  });

const useDeletePermissionedUser = () =>
  useMutation({
    mutationKey: ["useDeletePermissionedUser"],
    mutationFn: async (id?: number) =>
      await api.delete<IPermissionedUser>(`/user/v1/${id}`),
  });

const usePostPermissionedUser = () =>
  useMutation({
    mutationKey: ["useGetPermissionedUser"],
    mutationFn: async ({
      data,
    }: {
      data: Omit<IPermissionedUser, "id" | "last_login">;
    }) => await api.post(`/user/v1/`, data),
  });

const usePutPermissionedUser = () =>
  useMutation({
    mutationKey: ["useGetPermissionedUser"],
    mutationFn: async ({
      data,
      id,
    }: {
      data: Omit<IPermissionedUser, "id" | "last_login">;
      id?: number | string;
    }) => await api.put(`/user/v1/${id}`, data),
  });

const useGetDashboardCardsData = (filter: string) =>
  useQuery({
    queryKey: ["useGetDashboardCardsData", filter],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await api.get(`/bajet/v1/dashboard/card?filter=${filter}`),
  });

const useGetMessageCounts = (filter: string) =>
  useQuery({
    queryKey: ["useGetMessageCounts", filter],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await api.get<{ name: string; y: string }[]>(
        `/bajet/v1/dashboard/messages?filter=${filter}`,
      ),
  });

const useGetAreaChartData = (filter: string) =>
  useQuery({
    queryKey: ["useGetAreaChartData", filter],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await api.get<ILineChart>(
        `/bajet/v1/dashboard/word-cloud?chart_type=line&filter=${filter}&role=all`,
      ),
  });

const useGetBarChartData = (filter: string) =>
  useQuery({
    queryKey: ["useGetBarChartData", filter],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await api.get<ILineChart>(
        `/bajet/v1/dashboard/word-cloud?chart_type=bar&&filter=${filter}&role=all`,
      ),
  });

const useGetFeedbacks = (filter: string) =>
  useQuery({
    queryKey: ["useGetFeedbacks", filter],
    placeholderData: keepPreviousData,
    queryFn: async () =>
      await api.get<{ name: string; y: string }[]>(
        `/bajet/v1/dashboard/feedback?filter=${filter}`,
      ),
  });

const usePutFeedback = () =>
  useMutation({
    mutationKey: ["usePutFeedback"],
    mutationFn: async ({
      data,
      id,
    }: {
      data: { admin_feedback: string };
      id?: number | string;
    }) => await api.put(`/bajet/v1/questions/${id}/feedback`, data),
  });

const useGetResources = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetResourcesRequestPayload>(
        "/bajet/v1/resource/",
        {
          params,
        },
      );
      return res.data;
    },
    queryKey: ["useGetResources", params],
    placeholderData: keepPreviousData,
  });
};

const useGetProducts = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<{
        count: number;
        all_page: number;
        page: number;
        page_size: number;
        results: [
          {
            id: string;
            name: string;
          },
          {
            id: string;
            name: string;
          },
        ];
      }>("/bajet/v1/product", {
        params,
      });
      return res.data;
    },
    queryKey: ["useGetProducts", params],
    placeholderData: keepPreviousData,
  });
};
const usePostProduct = () =>
  useMutation({
    mutationKey: ["usePostProduct"],
    mutationFn: async ({
      data,
    }: {
      data: {
        product: string;
        question: string;
        answer: string;
      };
    }) => await api.post(`/bajet/v1/resource/`, data),
  });
const usePutProduct = () =>
  useMutation({
    mutationKey: ["usePutProduct"],
    mutationFn: async ({
      data,
      id,
    }: {
      id: string;
      data: {
        product: string;
        question: string;
        answer: string;
      };
    }) => await api.post(`/bajet/v1/resource/${id}`, data),
  });

const useUploadProductList = () =>
  useMutation({
    mutationKey: ["usePostProduct"],
    mutationFn: async ({ data }: { data: FormData }) =>
      await api.post(`/bajet/v1/resource/import`, data),
  });

const useGetResourceById = (id: string) =>
  useQuery({
    queryFn: async () => {
      const res = await api.get<{
        product: string;
        question: string;
        answer: string;
      }>(`/bajet/v1/resource/${id}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
    queryKey: ["useGetReportById", id],
    enabled: !!id,
  });

export {
  useGetReports,
  useGetReportById,
  useGetManageSessions,
  useGetQuestions,
  useGetUsers,
  useLoginMutation,
  useGetPermissionedUsers,
  useGetPermissionedUser,
  usePostPermissionedUser,
  useGetPermissionedUserMutation,
  usePutPermissionedUser,
  useGetDashboardCardsData,
  useGetMessageCounts,
  useGetFeedbacks,
  usePutFeedback,
  useGetAreaChartData,
  useGetQuestionById,
  useGetBarChartData,
  useDeletePermissionedUser,
  useGetResources,
  useGetProducts,
  useGetResourceById,
  usePostProduct,
  useUploadProductList,
  usePutProduct,
};
