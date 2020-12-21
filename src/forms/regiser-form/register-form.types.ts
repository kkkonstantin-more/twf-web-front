export interface RegisterFormInputs {
  login: string;
  email: string;
  password: string;
  locale: "rus" | "eng";
  name?: string;
  fullName?: string;
  additional?: string;
}
