import React from "react";
import { injectIntl } from "react-intl";

import LoginForm from "../forms/login-form/login-form";
import RegisterForm from "../forms/regiser-form/register-form";

import "./login-register-modal.scss";
import { Modal, Tab, Tabs } from "react-bootstrap";

interface LoginRegisterModalProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  intl: any;
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  showModal,
  setShowModal,
  intl,
}) => {
  // translation vars
  const translationPrefix: string = "loginRegisterModal";
  const loginTabId: string = translationPrefix + ".loginTab";
  const registerTabId: string = translationPrefix + ".registerTab";

  return (
    <div className="login-register-modal">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Tabs defaultActiveKey="login" id="login-register-tabs">
          <Tab
            eventKey="login"
            title={intl.formatMessage({ id: loginTabId })}
            className="login-register-modal__form"
          >
            <LoginForm />
          </Tab>
          <Tab
            eventKey="register"
            title={intl.formatMessage({ id: registerTabId })}
            className="login-register-modal__form"
          >
            <RegisterForm />
          </Tab>
        </Tabs>
      </Modal>
    </div>
  );
};

export default injectIntl(LoginRegisterModal);
