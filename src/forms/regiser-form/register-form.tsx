import React from "react";
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";

import GoogleLogin from "react-google-login";

import "./register-form.scss";

const RegisterForm: React.FC<{ intl: any }> = ({ intl }) => {
  // translation vars
  const translationPrefix: string = "registerForm";
  const emailLabelId: string = translationPrefix + ".emailLabel";
  const passwordLabelId: string = translationPrefix + ".passwordLabel";
  const registerButtonTextId: string =
    translationPrefix + ".registerButtonText";
  const googleButtonTextId: string = translationPrefix + ".googleButtonText";

  const responseGoogle = (response: any) => {
    alert("Ссылка на аватар пользователя: " + response.profileObj.imageUrl);
  };

  return (
    <form className="register-form">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">{translate(emailLabelId)}</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">
          {translate(passwordLabelId)}
        </label>
        <input type="password" className="form-control" />
      </div>
      <div className="register-form__buttons">
        <button type="submit" className="btn btn-primary">
          {translate(registerButtonTextId)}
        </button>
        <GoogleLogin
          // this is demo client id
          clientId="977771799310-42c14i973bbuo8nnquld6houe6mfa2t1.apps.googleusercontent.com"
          buttonText={intl.formatMessage({ id: googleButtonTextId })}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ fontSize: "10rem" }}
        />
      </div>
    </form>
  );
};

export default injectIntl(RegisterForm);
