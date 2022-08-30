import { Socket } from "socket.io-client";
import { Config, DEFAULT_CONNECTOR, getDefaultDomain } from "./config";

export const getDeepLinkFromSocket = (session: Socket): string => {
  // @ts-ignore: we saved the config of createSession on the socket as tmp hack
  const config: Config = session._verifiableIdentityConfig ?? {};
  const connector = config?.connector ?? DEFAULT_CONNECTOR;
  const domain = config?.domain ?? getDefaultDomain();
  return `deth://auth?connector=${connector}&domain=${domain}&session=${session.id}`;
};
