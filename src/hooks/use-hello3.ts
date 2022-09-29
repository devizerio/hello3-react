import { useContext } from 'react'
import { Hello3Context } from '../contexts/hello3'
import { DID } from '../utils/did'
import { log } from '../utils/logger'

export const useHello3 = () => {
  const ctx = useContext(Hello3Context)
  const isShowingSignInModal = ctx.showSignInModal
  const user = !ctx.token
    ? undefined
    : {
        did: DID.fromAddress(ctx.issuer ?? ''),
        address: DID.toAddress(ctx.issuer ?? ''),
        token: ctx.token!,
      }
  log.debug('Rerender of useHello3', { isShowingSignInModal, user })
  return {
    showSignInModal: () => ctx.setShowSignInModal(true),
    hideSignInModal: () => ctx.setShowSignInModal(false),
    clearSession: () => ctx.reset(),
    isShowingSignInModal,
    user,
  }
}
