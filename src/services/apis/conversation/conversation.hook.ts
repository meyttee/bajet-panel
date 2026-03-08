import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DiscussionServices } from "./conversation.service";
import type {
  DeleteDiscussionPayload,
  IDiscussionVersionParams,
} from "./interface";
import { toast } from "@/components";
import { strings } from "@/constants";

const discussionServices = new DiscussionServices();

export const useGetDiscussionVersion = (
  id: string,
  params?: IDiscussionVersionParams,
) =>
  useQuery({
    queryFn: async () => {
      const response = await discussionServices.getDiscussionVersion(
        id,
        params,
      );
      return response.data.data;
    },
    queryKey: [`useGetDiscussionVersion`, id, params],
    enabled: Boolean(id),
  });
export const useGetDiscussionCategory = () =>
  useQuery({
    queryFn: async () => {
      const response = await discussionServices.getDiscussionCategory();
      return response.data.data;
    },
    queryKey: [`useGetDiscussionCategory`],
  });

export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, description }: DeleteDiscussionPayload) =>
      discussionServices.deleteDiscussion(id, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteDiscussion"] });
      toast.success(strings.delete_converse_success);
    },
  });
};
export const useGetDiscussionDetail = (id: string) =>
  useQuery({
    queryFn: async () => {
      const response = await discussionServices.getDiscussionDetail(id);
      return response.data.data;
    },
    queryKey: [`useGetDiscussionDetail`, id],
    enabled: Boolean(id),
  });

export const useApproveDiscussion = () =>
  useMutation({
    mutationFn: async (id: string) =>
      await discussionServices.postApproveDiscussion(id),
    mutationKey: ["usePostApproveDiscussion"],
  });

export const useGetDiscussionMessages = (
  id: string,
  params?: IDiscussionVersionParams,
) =>
  useQuery({
    queryFn: async () => {
      const response = await discussionServices.getDiscussionMessages(
        id,
        params,
      );
      return response.data.data;
    },
    queryKey: [`useGetDiscussionMessages`, id, params],
    enabled: Boolean(id),
  });
