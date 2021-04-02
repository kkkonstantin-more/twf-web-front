// libs and hooks
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// translation
import { useIntl } from "react-intl";
import translate from "../../translations/translate";
import {
  errorDuplicateEmail,
  errorDuplicateLogin,
  errorUnknown,
  googleButtonTextId,
  localizationInputLabel,
  registerButtonTextId,
  registerFormInputs,
  success,
} from "./register-form.data";
// components
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
// types
import { FormInput } from "../types";
import { RegisterFormInputs } from "./register-form.types";
// styles
import "./register-form.styles.scss";

const RegisterForm = ({ hideModal }: { hideModal: () => void }) => {
  // hooks
  const intl = useIntl();
  const { register, handleSubmit, errors, reset } = useForm();
  // state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [registered, setRegistered] = useState<boolean | null>(null);
  const [localeInput, setLocaleInput] = useState<"eng" | "rus">(
    intl.locale === "ru-ru" ? "rus" : "eng"
  );
  // local functions
  const onSubmitRegister = (data: RegisterFormInputs) => {
    // remove empty fields
    Object.keys(data).forEach((key: string) => {
      if (data[key as keyof RegisterFormInputs] === "") {
        delete data[key as keyof RegisterFormInputs];
      }
    });
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_API + "/auth/signup",
      data,
    })
      .then(({ data }) => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          setErrorMessage(null);
          setSuccessMessage(success);
          setRegistered(true);
          reset();
          hideModal();
        } else {
          console.error("No token provided by server. Fetched data: ", data);
        }
      })
      .catch((e) => {
        if (
          e.response.data &&
          e.response.data.includes("There is already a user with login")
        ) {
          setErrorMessage(errorDuplicateLogin);
        } else if (
          e.response.data &&
          e.response.data.includes("There is already a user with email")
        ) {
          setErrorMessage(errorDuplicateEmail);
        } else {
          setErrorMessage(errorUnknown);
        }
        window.localStorage.removeItem("token");
      });
  };

  const responseGoogle = (response: any) => {
    if (response.hasOwnProperty("error")) {
      setRegistered(false);
    } else {
      console.log(response);
      const idTokenString = response.tokenId;
      axios({
        method: "get",
        url: `localhost:8080/api/auth/google_sign_in`,
        params: { idTokenString },
        headers: {
          ["Access-Control-Allow-Origin"]: "*",
        },
      })
        .then((res) => {
          console.log(res);
          // setAuthorized(res.status === 200);
        })
        .catch((e) => {
          // setAuthorized(false);
          console.log(e);
          console.log(e.message);
        });
    }
  };

  if (registered) {
    return <Redirect to={"/constructor-menu"} />;
  } else {
    return (
      <form className="register-form" onSubmit={handleSubmit(onSubmitRegister)}>
        {registerFormInputs.map((input: FormInput, i: number) => {
          const { name, inputType, labelTranslationId, validation } = input;
          return (
            <div className="form-group" key={i}>
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
        {/*choose locale radio buttons*/}
        <div className="form-group">
          <label>{translate(localizationInputLabel)}</label>
          <div>
            {["eng", "rus"].map((localeText: string) => {
              return (
                <div key={localeText} className="form-check form-check-inline">
                  <input
                    ref={register}
                    name="locale"
                    id="radioRu"
                    className="form-check-input"
                    type="radio"
                    value={localeInput}
                    checked={localeInput === localeText}
                    onChange={() => {
                      setLocaleInput(localeText as "eng" | "rus");
                    }}
                  />
                  <label className="form-check-label" htmlFor="radioRu">
                    {localeText}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/*server response messages*/}
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
        {/*submit buttons*/}
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
          />
        </div>
      </form>
    );
  }
};

export default RegisterForm;
