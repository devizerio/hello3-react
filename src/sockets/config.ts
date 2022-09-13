export const DEFAULT_CONNECTOR_POST_ENDPOINT = "https://connector.hello3.io";
export const DEFAULT_CONNECTOR_SOCKET_ENDPOINT = "wss://connector.hello3.io";

export const getDefaultDomain = () => {
  return window?.location?.hostname;
};

export type Config = {
  domain?: string;
  connectorSocketEndpoint?: string;
  connectorPostEndpoint?: string;
  callbackEndpoint?: string;
};
