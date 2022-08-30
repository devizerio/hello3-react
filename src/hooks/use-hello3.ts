import { useContext } from "react";
import { Hello3Context } from "../contexts/hello3";
import { DID } from "../utils/did";

export const useHello3 = () => {
  const ctx = useContext(Hello3Context);
  return {
    isShowingSignInModal: ctx.showSignInModal,
    showSignInModal: () => ctx.setShowSignInModal(true),
    hideSignInModal: () => ctx.setShowSignInModal(false),
    clearSession: () => ctx.reset(),
    user: !ctx.token
      ? undefined
      : {
          did: DID.fromAddress(ctx.issuer ?? ""),
          address: DID.toAddress(ctx.issuer ?? ""),
          token: ctx.token!,
        },
  };
};
