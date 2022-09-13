export const DEFAULT_STORAGE_KEY = "hello3-token";

export type Config = {
  domain?: string;
  connectorSocketEndpoint?: string;
  connectorPostEndpoint?: string;
  callbackEndpoint?: string;
  storageKey?: string;
  onSignInError?: (error: Error) => void;
};
