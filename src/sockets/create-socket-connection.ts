import { io, Socket } from "socket.io-client";
import { Config, DEFAULT_CONNECTOR_SOCKET_ENDPOINT } from "./config";

export const createSocketConnection = (config?: Config): Socket => {
  const connector =
    config?.connectorSocketEndpoint ?? DEFAULT_CONNECTOR_SOCKET_ENDPOINT;
  const socket = io(connector);
  // @ts-ignore: we need this config to construct deep link later
  socket._verifiableIdentityConfig = config;
  return socket;
};
