import React from "react";

import {Modal, ModalBody,} from "react-bootstrap";

import "./unauthorized-modal.scss";
import {useIntl} from "react-intl";

interface UnauthorizedModalProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  setShowAuthModal: (status: boolean) => void;
}

const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({
  showModal,
  setShowModal,
  setShowAuthModal,
}) => {
  // translation vars
  const translationPrefix: string = "unauthorizedModal";
  const intl = useIntl();
  const unauthorizedText = translationPrefix + ".unauthorizedText";
  const yesButtonText = translationPrefix + ".yesButtonText";
  const noButtonText = translationPrefix + ".noButtonText";
  return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <ModalBody>
              <div className="text-center">
                  {intl.formatMessage({id: unauthorizedText})}
              </div>
              <div className="text-center mt-3">
                  <button className="btn mr-3" onClick={() => {setShowModal(false); setShowAuthModal(true)}}>{intl.formatMessage({id: yesButtonText})}</button>
                  <button className="btn ml-3" onClick={() => {setShowModal(false)}}>{intl.formatMessage({id: noButtonText})}</button>
              </div>
          </ModalBody>
      </Modal>
  );
};

export default UnauthorizedModal;
