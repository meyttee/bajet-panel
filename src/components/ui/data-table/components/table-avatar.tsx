"use client";

import Image from "next/image";
import { useState } from "react";

type TableAvatarProps = {
  src?: string;
  alt: string;
};

function TableAvatar({ src, alt }: TableAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src || "/images/default-avatar.svg");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={32}
      height={32}
      onError={() => setImgSrc("/images/default-avatar.svg")}
      className="rounded-full border-1 border-[#262261] object-cover"
    />
  );
}
