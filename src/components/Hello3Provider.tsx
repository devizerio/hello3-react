import React, { useEffect, useState } from 'react'
import { Hello3Context, Hello3ContextType } from '../contexts/hello3'
import { useIdentity } from '../hooks'
import { log, setVerbose } from '../utils/logger'
import { SignInModal } from './SignInModal'

export type ProviderConfig = {
  domain?: string
  connectorSocketEndpoint?: string
  connectorPostEndpoint?: string
  callbackEndpoint?: string
  storageKey?: string
  onSignInError?: (error: Error) => void
  verbose?: boolean
}

export type ProviderProps = {
  children: React.ReactNode
  config?: ProviderConfig
}

export const Hello3Provider: React.FC<ProviderProps> = props => {
  const { children, config = {} } = props

  const [showSignInModal, setShowSignInModal] = useState(false)
  const { connectorUri, callbackUri, token, issuer, holder, reset } = useIdentity(config)

  useEffect(() => {
    setVerbose(!!config?.verbose)
  }, [config?.verbose])

  useEffect(() => {
    if (issuer) {
      log.debug('detected issuer from token, closing the sign in modal')
      setShowSignInModal(false)
    }
  }, [issuer, setShowSignInModal])

  const context: Hello3ContextType = {
    showSignInModal: showSignInModal,
    setShowSignInModal: setShowSignInModal,
    connectorUri,
    callbackUri,
    token: token,
    issuer: issuer,
    holder: holder,
    reset: reset,
  }

  return (
    <Hello3Context.Provider value={context}>
      {children}
      <SignInModal
        connectorUri={connectorUri}
        callbackUri={callbackUri}
        open={showSignInModal}
        isSignedIn={!!token}
        onClose={() => setShowSignInModal(false)}
      />
    </Hello3Context.Provider>
  )
}
