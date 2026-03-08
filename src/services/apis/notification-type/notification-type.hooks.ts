import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useQueryParams } from "@/hooks/useQueryParams";

import {
  NotificationType,
  NotificationTypeForm,
  NotificationTypeParams,
  NotificationTypeResponse,
} from "./interface";
import { NotificationTypeServices } from "./notification-type.service";
import { toast } from "@/components/ui";

const notificationTypeServices = new NotificationTypeServices();

export const useGetNotificationTypes = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: notificationTypes = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<NotificationTypeResponse, Error, NotificationType[]>({
    queryKey: ["notificationTypes", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as NotificationTypeParams;
      const queryParams: NotificationTypeParams = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response =
        await notificationTypeServices.getNotificationTypes(queryParams);
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
    notificationTypes,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetNotificationType = (id?: string) =>
  useQuery({
    queryKey: ["notificationType", id],
    queryFn: () => notificationTypeServices.getNotificationType(id),
    enabled: !!id,
    select: ({ data }) => data.data,
  });

export const useUpdateNotificationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NotificationTypeForm) =>
      notificationTypeServices.updateNotificationType(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["notificationTypes"] });
      queryClient.invalidateQueries({
        queryKey: ["notificationType", data.data.id],
      });
    },
  });
};

export const useAddNotificationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NotificationTypeForm) =>
      notificationTypeServices.addNotificationType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationTypes"] });
      toast.success("اعلان جدید با موفقیت ایجاد شد.");
    },
  });
};
