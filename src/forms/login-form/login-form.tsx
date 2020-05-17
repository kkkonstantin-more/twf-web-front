import React from "react";
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";

import GoogleLogin from "react-google-login";

import "./login-form.scss";

const LoginForm: React.FC<{ intl: any }> = ({ intl }) => {
  // translation vars
  const translationPrefix: string = "loginForm";
  const emailLabelId: string = translationPrefix + ".emailLabel";
  const passwordLabelId: string = translationPrefix + ".passwordLabel";
  const loginButtonTextId: string = translationPrefix + ".loginButtonText";
  const googleButtonTextId: string = translationPrefix + ".googleButtonText";

  const responseGoogle = (response: any) => {
    alert("Ссылка на аватар пользователя: " + response.profileObj.imageUrl);
  };

  return (
    <form className="login-form">
      <div className="form-group">
        <label>{translate(emailLabelId)}</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label>{translate(passwordLabelId)}</label>
        <input type="password" className="form-control" />
      </div>
      <div className="login-form__buttons">
        <button type="submit" className="btn btn-primary">
          {translate(loginButtonTextId)}
        </button>
        <GoogleLogin
          // this is demo client id
          clientId="739547301958-dgfpc93t5q1t3tqd4oe7cscfh491876o.apps.googleusercontent.com"
          buttonText={intl.formatMessage({ id: googleButtonTextId })}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </form>
  );
};

export default injectIntl(LoginForm);
