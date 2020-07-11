import { FormInput } from "../types";

const translationPrefix: string = "forms";

const loginFormInputs: FormInput[] = [
  {
    name: "login",
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
