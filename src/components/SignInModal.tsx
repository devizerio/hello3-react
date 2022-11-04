import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { QRCode } from 'react-qrcode-logo'

import icon from '../assets/icon.png'
import { log } from '../utils/logger'
import { Spinner } from './LoadingSpinner'

type Props = {
  connectorUri?: string
  callbackUri?: string
  open: boolean
  isSignedIn?: boolean
  onClose: () => void
}

export const SignInModal: React.FC<Props> = props => {
  const { open, onClose, isSignedIn, connectorUri, callbackUri } = props

  useEffect(() => {
    if (isSignedIn) {
      log.debug('User detected, calling onClose().')
      onClose()
    }
  }, [isSignedIn, onClose])

  useEffect(() => {
    if (open) {
      log.debug('Opening the modal (open prop change).')
    } else {
      log.debug('Making sure the modal is closed.')
    }
  }, [open])

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          backgroundColor: 'white',
          borderRadius: '8px',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          padding: '6px',
          bottom: 'auto',
          right: 'auto',
          border: '0px',
          maxWidth: '90%',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {(connectorUri || callbackUri) && (
          <>
            <a href={callbackUri ?? connectorUri}>
              <QRCode
                size={256}
                removeQrCodeBehindLogo
                eyeRadius={12}
                eyeColor="#012b73"
                fgColor="#060606"
                ecLevel="L"
                qrStyle="dots"
                logoImage={icon}
                value={connectorUri ?? callbackUri ?? 'invalid'}
              />
            </a>
          </>
        )}
        {!connectorUri && !callbackUri && (
          <div
            style={{
              display: 'flex',
              height: 256,
              width: 256,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  )
}
