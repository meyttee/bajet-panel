import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ICreateFaqRequestPayload,
  IGetFaqCategoryListRequestPayload,
  IGetFaqCategoryListResponsePayload,
} from "./interface";
import FaqCategoryService from "./faq.service";
import { toast } from "@/components";

const faqCategoryService = new FaqCategoryService();

export const useGetFaqCategoryList = (
  params: Partial<IGetFaqCategoryListRequestPayload> = {},
) => {
  const query = useQuery<IGetFaqCategoryListResponsePayload, Error>({
    queryKey: ["faqCategoryList", params],
    queryFn: () =>
      faqCategoryService.getFaqCategoryList(params).then((res) => {
        const topLevelData = res.data;
        return topLevelData.data as IGetFaqCategoryListResponsePayload;
      }),
    placeholderData: keepPreviousData,
  });

  return {
    categories: query.data?.results ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};

export const useCreateFaq = () =>
  useMutation({
    mutationFn: async (data: ICreateFaqRequestPayload) =>
      faqCategoryService.createFaq(data),
    mutationKey: ["useCreateFaq"],
  });

export const useUpdateFaq = () =>
  useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: ICreateFaqRequestPayload;
      id: string;
    }) => faqCategoryService.updateFaq(data, id),
    mutationKey: ["useCreateFaq"],
  });

export const useGetFaqData = (id: string) =>
  useQuery({
    queryKey: ["useGetFaqData"],
    queryFn: async () => await faqCategoryService.getFaqData(id),
    enabled: !!id,
  });

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => faqCategoryService.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqCategoryList"] });
      toast.success("سؤال مورد نظر با موفقیت حذف شد.");
    },
  });
};
