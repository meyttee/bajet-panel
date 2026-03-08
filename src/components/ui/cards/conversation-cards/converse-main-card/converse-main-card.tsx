import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { AlertTriangle, CheckCheck, MessageCircle } from "lucide-react";
import { ConverseMainCardProps } from "./interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HintBadge,
  CardOptions,
} from "@/components";
import "../converse-card-style.css";
import { strings } from "@/constants";
import Image from "next/image";

const ConverseMainCard: FC<PropsWithChildren<ConverseMainCardProps>> = ({
  imgUrl,
  user_name,
  created_at,
  category,
  title,
  description,
  nested_avatar,
  detail_count,
  status,
  is_answered,
  options,
  onOptionSelect,
  onDetail,
  children,
}) => {
  return (
    <div className="converse-card">
      <div className="converse-card__header">
        <div className="converse-card__user-info flex-wrap sm:flex-nowrap">
          <div className="flex items-center">
            <Image
              src={imgUrl}
              width={24}
              height={24}
              alt={user_name}
              className="size-6 rounded-full border-1 border-teal-600 object-cover"
            />
            <p dir="ltr" className="converse-card__username">
              {user_name}
            </p>
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-start text-xs sm:mt-0 sm:justify-center">
            <div className="flex items-center">
              <div className="converse-card__divider" />
              <p className="converse-card__created-at">{created_at}</p>
            </div>
            <div className="flex items-center">
              <div className="converse-card__divider" />
              <p className="converse-card__category">{category}</p>
            </div>

            {(status === "NOT_ACCEPTED" || status === "REPORTED") && (
              <div className="converse-card__hint-wrapper">
                <div className="converse-card__divider" />
                <HintBadge
                  icon={
                    <AlertTriangle
                      strokeWidth={1.5}
                      className={clsx("size-4 text-orange-500", {
                        "text-red-500": status === "REPORTED",
                      })}
                    />
                  }
                  title={
                    status === "NOT_ACCEPTED"
                      ? strings.not_approved_message
                      : strings.reported
                  }
                  title_color={
                    status === "NOT_ACCEPTED"
                      ? "text-red-500"
                      : "text-orange-500"
                  }
                  bg_color={
                    status === "NOT_ACCEPTED" ? "bg-red-100" : "bg-orange-100"
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center sm:items-start">
          {is_answered ? (
            <div className="converse-card__answered">
              <HintBadge
                icon={<CheckCheck strokeWidth={2} className="size-4" />}
                title={strings.is_answered}
                bg_color="bg-green-100"
                title_color="text-teal-600"
              />
              <CardOptions options={options} onOptionSelect={onOptionSelect} />
            </div>
          ) : (
            <div className="flex items-center">
              <CardOptions options={options} onOptionSelect={onOptionSelect} />
            </div>
          )}
        </div>
      </div>

      <div className="converse-card__body">
        <p className="converse-card__title">{title}</p>
        <p className="converse-card__description">{description}</p>
      </div>

      <div className="converse-card__footer">
        <div className="flex items-center justify-between gap-2">
          <p onClick={onDetail} className="converse-card__details">
            {detail_count}
            <MessageCircle strokeWidth={1.5} className="size-5 text-zinc-700" />
          </p>
          {Array.isArray(nested_avatar) && (
            <div className="converse-card__avatars flex items-center">
              {nested_avatar.slice(0, 4).map((avatar, index) => (
                <Avatar key={index} className="converse-card__avatar">
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className="converse-card__avatar-fallback">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              {nested_avatar.length > 4 && (
                <div className="mr-2 flex h-6 w-6 items-center justify-center text-xs font-normal text-zinc-700">
                  {nested_avatar.length - 4}+
                </div>
              )}
            </div>
          )}
        </div>
        <div className="converse-card__likes">{children}</div>
      </div>
    </div>
  );
};

export default ConverseMainCard;
