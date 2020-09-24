import React, { Dispatch, ReactNode, useEffect } from "react";

import ReactModal from "react-modal";

interface AppModalProps {
  isOpen: boolean;
  close: Dispatch<void>;
  children: ReactNode;
  width?: string;
  height?: string;
}

const AppModal: React.FC<AppModalProps> = ({
  isOpen,
  close,
  children,
  width,
  height,
}: AppModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      width,
      height,
    },
  };
  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={(): void => close()}
    >
      {children}
    </ReactModal>
  );
};

export default AppModal;
