import { createContext } from "react";

export type Hello3ContextType = {
  showSignInModal: boolean;
  setShowSignInModal: (show: boolean) => void;
  connectorUri?: string | null;
  callbackUri?: string | null;
  token?: string | null;
  issuer?: string | null;
  holder?: string | null;
  reset: () => void;
};

export const Hello3Context = createContext<Hello3ContextType>({
  showSignInModal: false,
  setShowSignInModal: () => {},
  reset: () => {},
});
