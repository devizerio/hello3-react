import { useCallback, useEffect, useState } from "react";
import { getDeepLinkFromSocket, createSocketConnection } from "../sockets";
import { Config, DEFAULT_STORAGE_KEY } from "./config";
import { useLocalStorage } from "./use-local-storage";

type VerifiableIdentityTokenData = {
  issuer: string;
  holder: string;
};

const verifyToken = async (_: any): Promise<VerifiableIdentityTokenData> => ({
  issuer: "did:ethr:issuer",
  holder: "did:ethr:holder",
});

export const useIdentity = (config?: Config) => {
  const [issuer, setIssuer] = useState<string | null>(null);
  const [holder, setHolder] = useState<string | null>(null);

  const storageKey = config?.storageKey ?? DEFAULT_STORAGE_KEY;
  const [token, setToken] = useLocalStorage(storageKey);

  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      verifyToken(token)
        .then((payload) => {
          setIssuer(payload.issuer);
          setHolder(payload.holder);
        })
        .catch(console.error);
    } else {
      setIssuer(null);
      setHolder(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setUri(null);
      return undefined;
    }
    const socket = createSocketConnection(config);
    socket.on("connect", () => setUri(getDeepLinkFromSocket(socket)));
    socket.on("token", (token) => setToken(token));
    socket.on("disconnect", () => setUri(null));
    return () => {
      socket.off("connect");
      socket.off("token");
      socket.off("disconnect");
    };
  }, [token]);

  const reset = useCallback(() => setToken(null), [setToken]);

  return { uri, token, issuer, holder, reset };
};
