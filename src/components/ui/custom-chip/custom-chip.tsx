import { FC } from "react";
import { CircleX as CloseIcon } from "lucide-react";

import { ToolbarChipProps } from "./interface";
import { Badge } from "../badges/badge";

const CustomChip: FC<ToolbarChipProps> = ({ label, onIconClick }) => {
  return (
    <Badge className="flex h-7 items-center justify-between gap-2 rounded-[20px] border-none bg-[#2F6FB5] py-px text-white">
      <span className="mt-1 text-sm font-normal">{label}</span>
      <button
        className="!size-5 cursor-pointer !border-[#2F6FB5] bg-[#2F6FB5] text-white [&_svg]:!size-5"
        onClick={onIconClick}
      >
        <CloseIcon />
      </button>
    </Badge>
  );
};
