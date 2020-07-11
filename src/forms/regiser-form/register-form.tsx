import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// translation
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";
// types
import { FormInput } from "../types";
// data
import { registerFormInputs } from "./register-form.data";
// components
import GoogleLogin from "react-google-login";
// styles
import "./register-form.scss";

const RegisterForm: React.FC<{ intl: any }> = ({ intl }) => {
  // translation vars
  const translationPrefix: string = "forms";
  const registerButtonTextId: string =
    translationPrefix + ".registerButtonText";
  const googleButtonTextId: string = translationPrefix + ".googleButtonText";
  const errorText: string = translationPrefix + ".errorText";
  const successText: string = translationPrefix + ".successText";
  // show response status
  const [status, setStatus] = useState<boolean | null>(null);
  // react-hook-form properties
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/auth/signup`,
      data,
    })
      .then((res) => {
        console.log(res);
        setStatus(true);
      })
      .catch((e) => {
        console.log(e);
        setStatus(false);
      });
  };

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      {registerFormInputs.map((input: FormInput) => {
        const { name, inputType, labelTranslationId, validation } = input;
        return (
          <div className="form-group">
            <label htmlFor={labelTranslationId}>
              {translate(labelTranslationId)}
            </label>
            {validation?.required && <span>*</span>}
            {inputType !== "textarea" ? (
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
            ) : (
              <textarea
                name={name}
                ref={register()}
                className="form-control"
                id={labelTranslationId}
                rows={3}
              />
            )}
          </div>
        );
      })}
      {status === false ? (
        <div className="alert alert-error" role="alert">
          {translate(errorText)}
        </div>
      ) : status === true ? (
        <div className="alert alert-success" role="alert">
          {translate(successText)}
        </div>
      ) : (
        ""
      )}
      <div className="register-form__buttons">
        <button type="submit" className="btn">
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
