import { FC, PropsWithChildren } from "react";
import { NoDataIcon } from "../../icons";
import { NoDataProps } from "./interface";
import { strings } from "@/constants";

const NoData: FC<PropsWithChildren<NoDataProps>> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        {icon || <NoDataIcon />}
      </div>

      <div className="flex items-center text-center">
        {title ? (
          <p className="text-sm text-zinc-600">{title}</p>
        ) : (
          <p className="text-sm font-normal text-zinc-600">
            {strings.noSubject}
          </p>
        )}
      </div>

      {description && (
        <p className="max-w-md text-justify text-sm font-normal text-zinc-500">
          {description}
        </p>
      )}

      {children && <div className="mt-2 w-fit">{children}</div>}
    </div>
  );
};
export default NoData;
