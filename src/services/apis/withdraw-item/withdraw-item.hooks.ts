import { toast } from "@/components/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { WithdrawItem } from "./interface";
import { WithdrawItemServices } from "./withdraw-item.service";

const withdrawItemServices = new WithdrawItemServices();

export const useGetWithdrawItem = () =>
  useQuery({
    queryKey: ["withdrawItem"],
    queryFn: () => withdrawItemServices.getWithdrawItem(),
    select: ({ data }) => data.data.withdraw,
  });

export const useAddWithdrawItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addWithdrawItem"],
    mutationFn: (data: Partial<WithdrawItem>) =>
      withdrawItemServices.addWithdrawItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawItem"] });
      toast.success("تغییر سیکل‌های واریز وجه با موفقیت انجام شد.");
    },
  });
};
