"use client";
import { FC, PropsWithChildren } from "react";
import { ConverseDetailCardProps } from "@/components/ui/cards/conversation-cards/converse-detail-card/interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CardOptions,
  HintBadge,
  LikeAndDislike,
} from "@/components";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCheck,
  Trash,
} from "lucide-react";
import clsx from "clsx";
import { strings } from "@/constants";
import { useRouter } from "next/navigation";
import "../converse-card-style.css";
import Image from "next/image";

const ConverseDetailCard: FC<PropsWithChildren<ConverseDetailCardProps>> = ({
  imgUrl,
  user_name,
  created_at,
  category,
  title,
  description,
  group_avatar,
  options,
  onOptionSelect,
  is_answered,
  message_status,
  children,
  onDelete,
  onApprove,
  onBack,
}) => {
  return (
    <div className="converse-card__detail__main">
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

            {(message_status === "NOT_ACCEPTED" ||
              message_status === "REPORTED") && (
              <div className="converse-card__hint-wrapper">
                <div className="converse-card__divider" />
                <HintBadge
                  icon={
                    <AlertTriangle
                      strokeWidth={1.5}
                      className={clsx("size-4 text-orange-500", {
                        "text-red-500": message_status === "NOT_ACCEPTED",
                      })}
                    />
                  }
                  title={
                    message_status === "NOT_ACCEPTED"
                      ? strings.not_approved_message
                      : strings.reported
                  }
                  title_color={
                    message_status === "NOT_ACCEPTED"
                      ? "text-red-500"
                      : "text-orange-500"
                  }
                  bg_color={
                    message_status === "NOT_ACCEPTED"
                      ? "bg-red-100"
                      : "bg-orange-100"
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center sm:items-start">
          <div className="converse-card__answered">
            <CardOptions options={options} onOptionSelect={onOptionSelect} />
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft strokeWidth={1.5} className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="converse-card__body__detail">
        <p className="converse-card__title__detail">{title}</p>
        <p className="converse-card__description__detail">{description}</p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center sm:px-4">
        <div className="flex min-w-[50%] flex-1 flex-col space-y-3 p-2 text-start sm:min-w-0">
          <p className="text-sm font-normal text-zinc-600">
            {strings.category}
          </p>
          <p className="converse-card__category">{category}</p>
        </div>

        <div className="converse-card__divider__main hidden sm:block" />
        <div className="flex min-w-[50%] flex-1 flex-col space-y-3 p-2 text-start sm:min-w-0">
          <p className="text-sm font-normal text-zinc-600">{strings.status}</p>
          {is_answered ? (
            <HintBadge
              icon={<CheckCheck strokeWidth={2} className="size-4" />}
              title={strings.is_answered}
              bg_color="bg-green-100"
              title_color="text-teal-600"
            />
          ) : (
            <HintBadge
              title={strings.wait_answer}
              bg_color="bg-gray-100"
              title_color="text-gray-500"
            />
          )}
        </div>
        <div className="converse-card__divider__main hidden sm:block" />
        <div className="ml-0 flex min-w-[50%] flex-1 flex-col space-y-3 p-2 text-start sm:min-w-0 md:ml-6">
          <p className="text-sm font-normal text-zinc-600">
            {strings.feedback}
          </p>
          {children}
        </div>

        <div className="converse-card__divider__main hidden sm:block" />
        <div className="flex min-w-[50%] flex-1 flex-col space-y-3 p-2 text-start sm:min-w-0">
          <p className="text-sm font-normal text-zinc-600">
            {strings.contribute}
          </p>

          {Array.isArray(group_avatar) ? (
            <div className="converse-card__group__avatars flex items-center">
              {group_avatar.slice(0, 4).map((avatar, index) => (
                <Avatar key={index} className="converse-card__avatar">
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className="converse-card__avatar-fallback">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              {group_avatar.length > 4 && (
                <div className="px-2 py-1 text-sm font-normal text-zinc-700">
                  {group_avatar.length - 4}+
                </div>
              )}
            </div>
          ) : (
            "0"
          )}
        </div>
      </div>
      {message_status === "NOT_ACCEPTED" && (
        <div className="mt-8 flex w-full items-center justify-center gap-5">
          <Button variant="outline" isFilled onClick={onApprove}>
            <Check strokeWidth={1.5} className="size-5" />
            {strings.approve_converse}
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash strokeWidth={1.5} className="size-5" />
            {strings.delete_message}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConverseDetailCard;
