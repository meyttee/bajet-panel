import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AiConfigServices } from "./ai-config.service";
import { AiConfig } from "./interface";

const aiConfigServices = new AiConfigServices();

export const useGetAiConfig = () =>
  useQuery({
    queryKey: ["aiConfig"],
    queryFn: () => aiConfigServices.getAiConfig(),
    select: ({ data }) => data.data,
  });

export const useUpdateAiConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateAiConfig"],
    mutationFn: (data: Partial<AiConfig>) =>
      aiConfigServices.updateAiConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiConfig"] });
    },
  });
};
