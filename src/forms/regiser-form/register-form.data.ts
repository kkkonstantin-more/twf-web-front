import { FormInput } from "../types";

const translationPrefix: string = "forms";

const registerFormInputs: FormInput[] = [
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

export { registerFormInputs };
