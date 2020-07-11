export interface FormInput {
  labelTranslationId: string;
  name: string;
  inputType: "text" | "email" | "password" | "textarea";
  validation?: UseFormValidationProps;
}

export interface UseFormValidationProps {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}
