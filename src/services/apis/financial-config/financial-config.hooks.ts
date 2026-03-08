import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FinancialConfigServices } from "./financial-config.service";
import { FinacialConfig } from "./interface";
import { toast } from "@/components";

const financialConfigServices = new FinancialConfigServices();

export const useGetFinancialConfig = () =>
  useQuery({
    queryKey: ["financialConfig"],
    queryFn: () => financialConfigServices.getFinancialConfig(),
    select: ({ data }) => data.data,
  });

export const useAddFinancialConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addFinancialConfig"],
    mutationFn: (data: Partial<FinacialConfig>) =>
      financialConfigServices.addFinancialConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financialConfig"] });
      toast.success("تغییر میزان پردازش با موفقیت انجام شد.");
    },
  });
};
