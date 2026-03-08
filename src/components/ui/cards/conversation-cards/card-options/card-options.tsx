"use client";

import { FC } from "react";
import { MoreHorizontal, Trash, TriangleAlert } from "lucide-react";
import { OptionItem, CardOptionsProps } from "./interface";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";
import clsx from "clsx";

const CardOptions: FC<CardOptionsProps> = ({ options, onOptionSelect }) => {
  if (!options || options.length === 0) return null;

  const handleClick = (value: string) => {
    onOptionSelect?.(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal strokeWidth={1.5} className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col hover:bg-gray-100"
        align="end"
      >
        {options.map((o: OptionItem, i) => (
          <p
            key={i}
            className={clsx("converse-card__popover-item")}
            onClick={() => handleClick(o.value)}
          >
            {o.label}
            <span className="pr-8">{o.icon}</span>
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CardOptions;
