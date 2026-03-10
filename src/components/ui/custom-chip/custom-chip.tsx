import { FC } from "react";
import { CircleX as CloseIcon } from "lucide-react";

import { ToolbarChipProps } from "./interface";
import { Badge } from "../badges/badge";

const CustomChip: FC<ToolbarChipProps> = ({ label, onIconClick }) => {
  return (
    <Badge className="flex h-7 items-center justify-between gap-2 rounded-[20px] border-none bg-[#1E40AF] py-px text-white">
      <span className="mt-1 text-sm font-normal">{label}</span>
      <button
        className="!size-5 cursor-pointer !border-[#1E40AF] bg-[#1E40AF] text-white [&_svg]:!size-5"
        onClick={onIconClick}
      >
        <CloseIcon />
      </button>
    </Badge>
  );
};
