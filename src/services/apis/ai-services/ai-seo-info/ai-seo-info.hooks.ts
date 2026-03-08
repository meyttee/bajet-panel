import { toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AiSeoInfoServices } from "./ai-seo-info.service";
import { AiSeoInfoFields } from "./interface";

const aiSeoInfoServices = new AiSeoInfoServices();

export const useDeleteAiSeoInfo = () =>
  useMutation({
    mutationKey: ["deleteAiSeoInfo"],
    mutationFn: (id: string) => aiSeoInfoServices.removeAiSeoInfo(id),
    onSuccess: () => {
      toast.success("اطلاعات سئو با موفقیت حذف شد.");
    },
  });

export const useGetAiSeoInfo = (id?: string) =>
  useQuery({
    queryKey: ["aiSeoInfo", id],
    queryFn: () => aiSeoInfoServices.getAiSeoInfo(id),
    enabled: !!id,
    select: ({ data }) => data.data,
  });

export const useAddAiSeoInfo = () =>
  useMutation({
    mutationKey: ["addAiSeoInfo"],
    mutationFn: (data: AiSeoInfoFields) => aiSeoInfoServices.addAiSeoInfo(data),
    onSuccess: () => {
      toast.success("اطلاعات سئو با موفقیت اضافه شد.");
    },
  });

export const useUpdateAiSeoInfo = () =>
  useMutation({
    mutationKey: ["updateAiSeoInfo"],
    mutationFn: (data: AiSeoInfoFields) =>
      aiSeoInfoServices.updateAiSeoInfo(data),
    onSuccess: () => {
      toast.success("اطلاعات سئو با موفقیت ویرایش شد.");
    },
  });
