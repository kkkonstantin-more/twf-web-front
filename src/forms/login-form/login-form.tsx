import React from "react";
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";
import { useForm } from "react-hook-form";

import GoogleLogin from "react-google-login";

import "./login-form.scss";

const LoginForm: React.FC<{ intl: any }> = ({ intl }) => {
  // translation var
  const googleButtonTextId: string = "loginForm.googleButtonText";
  // react-hook-form properties
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <form className="login-form">
      {/*<div className="form-group">*/}
      {/*  <label>{translate(emailLabelId)}</label>*/}
      {/*  <input type="email" className="form-control" />*/}
      {/*</div>*/}
      {/*<div className="form-group">*/}
      {/*  <label>{translate(passwordLabelId)}</label>*/}
      {/*  <input type="password" className="form-control" />*/}
      {/*</div>*/}
      <div className="login-form__buttons">
        <button type="submit" className="btn">
          {translate(googleButtonTextId)}
        </button>
        <GoogleLogin
          // this is demo client id
          clientId="977771799310-42c14i973bbuo8nnquld6houe6mfa2t1.apps.googleusercontent.com"
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
