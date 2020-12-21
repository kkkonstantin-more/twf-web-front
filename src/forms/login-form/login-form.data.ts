// types
import { FormInput } from "../types";

// translation vars
const translationPrefix = "forms";
export const googleButtonTextId = translationPrefix + ".googleButtonText";
export const loginButtonText = translationPrefix + ".loginButtonText";
export const loginErrorText = translationPrefix + ".loginError";
export const successText = translationPrefix + ".loginSuccess";

const loginFormInputs: FormInput[] = [
  {
    name: "loginOrEmail",
    labelTranslationId: translationPrefix + ".loginOrEmailLabel",
    inputType: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 64,
    },
  },
  {
    name: "password",
    labelTranslationId: translationPrefix + ".passwordLabel",
    inputType: "password",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 64,
    },
  },
];

export { loginFormInputs };
