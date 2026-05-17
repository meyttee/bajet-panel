import { useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks";

import {
  IGetPermissionedUsers,
  IGetQuestionsResponsePayload,
  IGetReportByIdResponsePayload,
  IGetReportsResponsePayload,
  IGetSessionsResponsePayload,
  IGetUsersResponsePayload,
  ILogiPayload,
  IPermissionedUser,
} from "./interface";
import { api } from "../interceptor";

const useGetReports = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetReportsResponsePayload>(
        "/cyra_reg/v1/report",
        {
          params,
        },
      );
      return res.data;
    },
    queryKey: ["useGetReports", params],
  });
};

const useGetReportById = (id: string) =>
  useQuery({
    queryFn: async () => {
      const res = await api.get<IGetReportByIdResponsePayload>(
        `/cyra_reg/v1/${id}`,
      );
      return res.data;
    },
    queryKey: ["useGetReportById", id],
  });

const useGetManageSessions = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetSessionsResponsePayload>("/cyra_reg/v1/", {
        params,
      });
      return res.data;
    },
    queryKey: ["useGetManageSessions", params],
  });
};

const useGetQuestions = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetQuestionsResponsePayload>(
        "/cyra_reg/v1/questions",
        {
          params,
        },
      );
      return res.data;
    },
    queryKey: ["useGetQuestions", params],
  });
};

const useGetUsers = () => {
  const params = useQueryParams();
  return useQuery({
    queryFn: async () => {
      const res = await api.get<IGetUsersResponsePayload>(
        "/cyra_reg/v1/users",
        {
          params,
        },
      );
      return res.data;
    },
    queryKey: ["useGetUsers", params],
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
  });
};

const useGetPermissionedUser = (id?: number) =>
  useQuery({
    queryKey: ["useGetPermissionedUser", id],
    queryFn: async () => await api.get<IPermissionedUser>(`/user/v1/${id}`),
    enabled: !!id,
  });

const useGetPermissionedUserMutation = () =>
  useMutation({
    mutationKey: ["useGetPermissionedUserMutation"],
    mutationFn: async (id?: number) =>
      await api.get<IPermissionedUser>(`/user/v1/${id}`),
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
    queryFn: async () =>
      await api.get(`/cyra_reg/v1/dashboard/card?filter=${filter}`),
  });

const useGetMessageCounts = (filter: string) =>
  useQuery({
    queryKey: ["useGetMessageCounts", filter],
    queryFn: async () =>
      await api.get<{ name: string; y: string }[]>(
        `/cyra_reg/v1/dashboard/messages?filter=${filter}`,
      ),
  });

const useGetFeedbacks = (filter: string) =>
  useQuery({
    queryKey: ["useGetFeedbacks", filter],
    queryFn: async () =>
      await api.get<{ name: string; y: string }[]>(
        `/cyra_reg/v1/dashboard/feedback?filter=${filter}`,
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
    }) => await api.put(`/cyra_reg/v1/questions/${id}/feedback`, data),
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
};
