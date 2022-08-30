import { io, Socket } from "socket.io-client";
import { Config, DEFAULT_CONNECTOR, DEFAULT_PROTOCOL } from "./config";

export const createSocketConnection = (config?: Config): Socket => {
  const connector = config?.connector ?? DEFAULT_CONNECTOR;
  const protocol = config?.connectorProtocol ?? DEFAULT_PROTOCOL;
  const socket = io(`${protocol}://${connector}`);
  // @ts-ignore: we need this config to construct deep link later
  socket._verifiableIdentityConfig = config;
  return socket;
};
