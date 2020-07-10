const translationPrefix: string = "loginForm";

export interface LoginFormInput {
  labelTranslationId: string;
  inputType: "text" | "email" | "password";
  required: boolean;
}

const loginFormInputs: LoginFormInput[] = [
  {
    labelTranslationId: translationPrefix + ".loginLabel",
    inputType: "text",
    required: true,
  },
  {
    labelTranslationId: translationPrefix + ".emailLabel",
    inputType: "email",
    required: true,
  },
  {
    labelTranslationId: translationPrefix + ".passwordLabel",
    inputType: "password",
    required: true,
  },
  {
    labelTranslationId: translationPrefix + ".name",
    inputType: "text",
    required: false,
  },
  {
    labelTranslationId: translationPrefix + ".emailLabel",
    inputType: "email",
    required: true,
  },
  {
    labelTranslationId: translationPrefix + ".loginLabel",
    inputType: "text",
    required: true,
  },
  {
    labelTranslationId: translationPrefix + ".emailLabel",
    inputType: "email",
    required: true,
  },
];

export { loginFormInputs };
