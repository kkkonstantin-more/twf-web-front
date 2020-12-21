// types
import { FormInput } from "../types";

// translation vars
const translationPrefix: string = "forms";
export const registerButtonTextId: string =
  translationPrefix + ".registerButtonText";
export const googleButtonTextId: string =
  translationPrefix + ".googleButtonText";
export const errorDuplicateLogin =
  translationPrefix + ".registerErrorDuplicateLogin";
export const errorDuplicateEmail =
  translationPrefix + ".registerErrorDuplicateEmail";
export const errorUnknown = translationPrefix + ".registerInvalidForm";
export const success = translationPrefix + ".registerSuccess";
export const localizationInputLabel =
  translationPrefix + ".localizationInputLabel";

export const registerFormInputs: FormInput[] = [
  {
    name: "login",
    labelTranslationId: translationPrefix + ".loginLabel",
    inputType: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 64,
    },
  },
  {
    name: "email",
    labelTranslationId: translationPrefix + ".emailLabel",
    inputType: "email",
    validation: {
      required: true,
      maxLength: 60,
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
  {
    name: "name",
    labelTranslationId: translationPrefix + ".nameLabel",
    inputType: "text",
    validation: {
      minLength: 3,
      maxLength: 50,
    },
  },
  {
    name: "fullName",
    labelTranslationId: translationPrefix + ".fullNameLabel",
    inputType: "text",
    validation: {
      minLength: 3,
      maxLength: 150,
    },
  },
  {
    name: "additional",
    labelTranslationId: translationPrefix + ".additionalInfoLabel",
    inputType: "textarea",
  },
];
