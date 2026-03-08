import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ICreateNotifMessage,
  ICreateNotifMessageResponse,
  INotifMessage,
} from "./interface";
import NotifMessageService from "./message-content.service";

const notifMessageService = new NotifMessageService();

export const useGetContentMessages = (notif_type?: string) => {
  const {
    data: notifMessages = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<INotifMessage[], Error>({
    queryKey: ["notifMessages", notif_type],
    queryFn: async () => {
      const response = await notifMessageService.getNotifMessages(notif_type);
      return response.data.data.notif_message;
    },
    placeholderData: [],
  });

  return {
    notifMessages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetNotifMessageById = (id: string, enabled = true) => {
  const {
    data: notifMessage,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery<ICreateNotifMessageResponse, Error>({
    queryKey: ["notifMessage", id],
    queryFn: async () => {
      const response = await notifMessageService.getNotifMessageById(id);
      return response.data.data;
    },
    enabled: enabled && !!id,
  });

  return {
    notifMessage,
    isLoading,
    isFetching,
    refetch,
    error,
  };
};

export const useCreateNotifMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateNotifMessage) => {
      const response = await notifMessageService.createNotifMessage(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifMessages"] });
    },
  });
};

export const useUpdateNotifMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ICreateNotifMessage;
    }) => {
      const response = await notifMessageService.updateNotifMessage(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notifMessages"] });
      queryClient.invalidateQueries({
        queryKey: ["notifMessage", variables.id],
      });
    },
  });
};

export const useDeleteNotifMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await notifMessageService.deleteNotifMessage(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifMessages"] });
    },
  });
};
