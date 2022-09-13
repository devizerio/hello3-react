import React, { useEffect } from "react";
import Modal from "react-modal";
import QRCode from "react-qr-code";

import icon from "../assets/icon.png";
import { Spinner } from "./LoadingSpinner";

type Props = {
  connectorUri?: string;
  callbackUri?: string;
  open: boolean;
  isSignedIn?: boolean;
  onClose: () => void;
};

export const SignInModal: React.FC<Props> = (props) => {
  const { open, onClose, isSignedIn, connectorUri, callbackUri } = props;

  useEffect(() => {
    if (isSignedIn) {
      onClose();
    }
  }, [isSignedIn, onClose]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          backgroundColor: "white",
          borderRadius: "4px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          padding: "24px",
          paddingLeft: "56px",
          paddingRight: "56px",
          bottom: "auto",
          right: "auto",
          border: "0px",
          maxWidth: "90%",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 12,
        }}
      >
        <div style={{ width: 74, height: 94 }}>
          <img
            style={{ margin: 12, marginBottom: 32 }}
            width={50}
            src={icon}
            alt="Hello3"
          />
        </div>
        {(connectorUri || callbackUri) && (
          <>
            <a href={callbackUri ?? connectorUri}>
              <QRCode
                size={256}
                value={connectorUri ?? callbackUri ?? "invalid"}
              />
            </a>
            <div
              style={{
                textAlign: "center",
                marginBottom: 24,
                marginTop: 32,
                fontSize: 12,
                lineHeight: 1.5,
                width: 256,
              }}
            >
              Scan this QR code with the Hello3 app or tap it if you have Hello3
              installed on this device.
            </div>
          </>
        )}
        {!connectorUri && !callbackUri && (
          <div
            style={{
              display: "flex",
              height: 256,
              width: 256,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  );
};
