import { Socket } from "socket.io-client";
import {
  Config,
  DEFAULT_CONNECTOR_POST_ENDPOINT,
  getDefaultDomain,
} from "./config";

export const getConnectorDeepLinkFromSocket = (session: Socket): string => {
  // @ts-ignore: we saved the config of createSession on the socket as tmp hack
  const config: Config = session._verifiableIdentityConfig ?? {};
  const connector =
    config?.connectorPostEndpoint ?? DEFAULT_CONNECTOR_POST_ENDPOINT;
  const domain = config?.domain ?? getDefaultDomain();
  return `hello3://auth?connector=${connector}&domain=${domain}&session=${session.id}`;
};

export const getCallbackDeepLinkFromSocket = (session: Socket): string => {
  // @ts-ignore: we saved the config of createSession on the socket as tmp hack
  const config: Config = session._verifiableIdentityConfig ?? {};
  if (!config.callbackEndpoint) {
    throw new Error("No callback url supplied.");
  }
  const connector = config.callbackEndpoint;
  const domain = config?.domain ?? getDefaultDomain();
  return `hello3://auth?callback=${connector}&domain=${domain}&session=${session.id}`;
};
