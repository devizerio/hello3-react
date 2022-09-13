import { useCallback, useEffect, useState } from "react";
import { verifyToken } from "@hello3/core";
import { createSocketConnection } from "../sockets";
import { Config, DEFAULT_STORAGE_KEY } from "./config";
import { useLocalStorage } from "./use-local-storage";
import {
  getCallbackDeepLinkFromSocket,
  getConnectorDeepLinkFromSocket,
} from "../sockets/get-deep-link-from-socket";

export const useIdentity = (config?: Config) => {
  const [issuer, setIssuer] = useState<string | null>(null);
  const [holder, setHolder] = useState<string | null>(null);

  const storageKey = config?.storageKey ?? DEFAULT_STORAGE_KEY;
  const [token, setToken] = useLocalStorage(storageKey);

  const [connectorUri, setConnectorUri] = useState<string | undefined>(
    undefined
  );
  const [callbackUri, setCallbackUri] = useState<string | undefined>(undefined);

  const onTokenReceived = async (token: string) => {
    try {
      const payload = await verifyToken(token, { domain: config?.domain });
      setIssuer(payload.issuer);
      setHolder(payload.holder);
    } catch (e) {
      setToken(null);
      if (config?.onSignInError) {
        config.onSignInError(e);
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const hello3token = queryParams.get("hello3token");

    if (hello3token) {
      setToken(hello3token);
      queryParams.delete("hello3token");
      window.history.replaceState(null, "", "?" + queryParams);
    }
  }, [window.location.search]);

  useEffect(() => {
    if (token) {
      onTokenReceived(token);
    } else {
      setIssuer(null);
      setHolder(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setConnectorUri(undefined);
      setCallbackUri(undefined);
      return undefined;
    }
    const socket = createSocketConnection(config);
    socket.on("connect", () => {
      setConnectorUri(getConnectorDeepLinkFromSocket(socket));
      try {
        setCallbackUri(getCallbackDeepLinkFromSocket(socket));
      } catch (e) {}
    });
    socket.on("token", (token) => setToken(token));
    socket.on("disconnect", () => {
      setConnectorUri(undefined);
      setCallbackUri(undefined);
    });
    return () => {
      socket.off("connect");
      socket.off("token");
      socket.off("disconnect");
    };
  }, [token]);

  const reset = useCallback(() => setToken(null), [setToken]);

  return { connectorUri, callbackUri, token, issuer, holder, reset };
};
