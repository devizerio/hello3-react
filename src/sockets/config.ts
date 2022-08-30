export const DEFAULT_PROTOCOL = "wss";
export const DEFAULT_CONNECTOR = "connector.hello3.io";

export const getDefaultDomain = () => {
  return window?.location?.hostname;
};

export type Config = {
  domain?: string;
  connector?: string;
  connectorProtocol?: string;
};
