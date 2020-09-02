import React, { useState } from "react";
import axios from "axios";
// hooks
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
  const errorDuplicate = translationPrefix + ".registerErrorDuplicate";
  const errorUnknown = translationPrefix + ".registerInvalidForm";
  const success = translationPrefix + ".registerSuccess";
  const { register, handleSubmit, errors, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/auth/signup`,
      data,
    })
      .then((res) => {
        console.log(res);
        setErrorMessage(null);
        setSuccessMessage(success);
        reset();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.data.includes("already in use")) {
          setErrorMessage(errorDuplicate);
        } else {
          setErrorMessage(errorUnknown);
        }
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
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {translate(errorMessage)}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {translate(successMessage)}
        </div>
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
