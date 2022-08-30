import React, { useEffect, useState } from "react";
import { Hello3Context, Hello3ContextType } from "../contexts/hello3";
import { useIdentity } from "../hooks";
import { SignInModal } from "./SignInModal";

export type ProviderProps = {
  children: React.ReactNode;
  domain?: string;
  connector?: string;
  connectorProtocol?: string;
  storageKey?: string;
};

export const Hello3Provider: React.FC<ProviderProps> = (props) => {
  const { children, ...params } = props;

  const [showSignInModal, setShowSignInModal] = useState(false);
  const { uri, token, issuer, holder, reset } = useIdentity(params);

  useEffect(() => {
    if (token) {
      setShowSignInModal(false);
    }
  }, [token, setShowSignInModal]);

  const context: Hello3ContextType = {
    showSignInModal: showSignInModal,
    setShowSignInModal: setShowSignInModal,
    uri: uri,
    token: token,
    issuer: issuer,
    holder: holder,
    reset: reset,
  };

  return (
    <Hello3Context.Provider value={context}>
      {children}
      <SignInModal
        uri={uri ?? "invalid-hello3-uri"}
        open={showSignInModal}
        isSignedIn={!!token}
        onClose={() => setShowSignInModal(false)}
      />
    </Hello3Context.Provider>
  );
};
