import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
// translation
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";
// types
import { loginFormInputs } from "./login-form.data";
import { FormInput } from "../types";
// components
import GoogleLogin from "react-google-login";
// styles
import "./login-form.scss";

const LoginForm: React.FC<{ intl: any; hideModal: () => void }> = ({
  intl,
  hideModal,
}) => {
  // translation vars
  const translationPrefix: string = "forms";
  const googleButtonTextId: string = translationPrefix + ".googleButtonText";
  const loginButtonText: string = translationPrefix + ".loginButtonText";
  const errorText: string = translationPrefix + ".loginError";
  const successText: string = translationPrefix + ".loginSuccess";
  // react-hook-form properties
  const { register, handleSubmit, errors } = useForm();

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/auth/signin`,
      data,
    })
      .then((res) => {
        console.log(res);
        setAuthorized(true);
        hideModal();
      })
      .catch((e) => {
        console.log(e);
        setAuthorized(false);
      });
  };

  const responseGoogle = (response: any) => {
    if (response.hasOwnProperty("error")) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
      hideModal();
      // // send google's token to server
      // const idTokenString = response.tokenId;
      // console.log(response.tokenId);
      // axios({
      //   method: "get",
      //   url: `${process.env.REACT_APP_SERVER_API}/api/auth/google_sing_in`,
      //   params: { idTokenString },
      // })
      //   .then((res) => {
      //     setAuthorized(res.status === 200);
      //   })
      //   .catch((e) => {
      //     setAuthorized(false);
      //     console.log(e.message);
      //   });
    }
  };

  return authorized === true ? (
    <Redirect to={"/constructor-menu"} />
  ) : (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      {loginFormInputs.map((input: FormInput, i) => {
        const { name, inputType, labelTranslationId, validation } = input;
        return (
          <div key={i} className="form-group">
            <label htmlFor={labelTranslationId}>
              {translate(labelTranslationId)}
            </label>
            {validation?.required && <span>*</span>}
            <input
              className={`form-control ${
                errors.hasOwnProperty(name) && "is-invalid"
              }`}
              name={name}
              ref={register({
                ...validation,
              })}
              type={inputType}
              id={labelTranslationId}
            />
          </div>
        );
      })}
      {authorized !== null &&
        (authorized ? (
          <div className="alert alert-success" role="alert">
            {translate(successText)}
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            {translate(errorText)}
          </div>
        ))}
      <div className="login-form__buttons">
        <button type="submit" className="btn">
          {translate(loginButtonText)}
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
