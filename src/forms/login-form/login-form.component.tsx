// libs and hooks
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// components
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
// translation
import { useIntl } from "react-intl";
import translate from "../../translations/translate";
import {
  googleButtonTextId,
  loginButtonText,
  loginErrorText,
  loginFormInputs,
  successText,
} from "./login-form.data";
// types
import { FormInput } from "../types";
// styles
import "./login-form.styles.scss";

const LoginForm = ({ hideModal }: { hideModal: () => void }) => {
  // hooks
  const intl = useIntl();
  const { register, handleSubmit, errors } = useForm();
  // state
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/auth/signin`,
      data,
    })
      .then(({ data }) => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          setErrorMessage(false);
          setAuthorized(true);
          hideModal();
        } else {
          console.error("No token provided by server. Fetched data: ", data);
        }
      })
      .catch(() => {
        window.localStorage.removeItem("token");
        setErrorMessage(true);
        setAuthorized(false);
      });
  };

  const responseGoogle = (response: any) => {
    if (response.hasOwnProperty("error")) {
      setAuthorized(false);
    } else {
      // setAuthorized(true);
      // hideModal();
      // send google's token to server
      const idTokenString = response.tokenId;
      console.log(response.tokenId);
      axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_API + "/google_sing_in",
        params: { idTokenString },
      })
        .then((res) => {
          console.log(res);
          setAuthorized(res.status === 200);
        })
        .catch((e) => {
          setAuthorized(false);
          console.log(e.message);
        });
    }
  };

  if (authorized) {
    return <Redirect to={"/constructor-menu"} />;
  } else {
    return (
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
        {/*server responses*/}
        {authorized && (
          <div className="alert alert-success" role="alert">
            {translate(successText)}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {translate(loginErrorText)}
          </div>
        )}
        {/*submit buttons*/}
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
  }
};

export default LoginForm;
