"use client";

import nookies from "nookies";
import { toast } from "@/components";
import { strings } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { API_PLATFORM_ROUTES, GPU_ROUTES, SUPPORT_ROUTES } from "@/routes";

const useWebSocket = () => {
  const { push, refresh } = useRouter();
  const pathName = usePathname();
  const { token } = nookies.get();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(
        `${process.env["NEXT_PUBLIC_WEBSOCKET_URL"]}?token=${token}`,
      );

      wsRef.current.onopen = () => {};

      wsRef.current.onmessage = (event: MessageEvent<any>) => {
        const message = JSON.parse(event.data);
        toast.info(message.message, {
          action: {
            label: strings.show,
            onClick: () => {
              if (
                pathName === GPU_ROUTES.SERVERS &&
                message.notif_type === "server_request"
              ) {
                refresh();
              } else if (
                pathName === SUPPORT_ROUTES.TICKET &&
                message.notif_type === "ticket"
              ) {
                refresh();
              } else if (
                pathName === API_PLATFORM_ROUTES.APIS &&
                message.notif_type === "api"
              ) {
                refresh();
              } else {
                push(
                  message.notif_type === "server_request"
                    ? GPU_ROUTES.SERVERS
                    : message.notif_type === "api"
                      ? API_PLATFORM_ROUTES.APIS
                      : SUPPORT_ROUTES.TICKET,
                );
              }
            },
          },
        });
      };

      wsRef.current.onerror = () => {
        toast.error(strings.anErrorOccurred, {
          action: {
            label: strings.reloadPage,
            onClick: () => window.location.reload(),
          },
        });
      };

      wsRef.current.onclose = () => {
        console.warn("WebSocket disconnected");
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [pathName, push, token]);

  return wsRef.current;
};

export default useWebSocket;
