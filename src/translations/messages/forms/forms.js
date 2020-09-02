const prefix = "forms";

const formsRu = {
  [prefix + ".emailLabel"]: "Email",
  [prefix + ".loginOrEmailLabel"]: "Логин или email",
  [prefix + ".loginLabel"]: "Логин",
  [prefix + ".nameLabel"]: "Имя",
  [prefix + ".fullNameLabel"]: "ФИО",
  [prefix + ".additionalInfoLabel"]: "Дополнительная информация",
  [prefix + ".passwordLabel"]: "Пароль",
  [prefix + ".loginButtonText"]: "Войти",
  [prefix + ".registerButtonText"]: "Зарегистрироваться",
  [prefix + ".googleButtonText"]: "Через Google",
  [prefix +
  ".registerErrorDuplicate"]: "Пользователь с данным логином или email уже существует!",
  [prefix +
  ".registerInvalidForm"]: "Что-то пошло не так, проверьте корректность введенных данных",
  [prefix + ".registerSuccess"]: "Успешная регистрация!",
};

const formsEn = {
  [prefix + ".emailLabel"]: "Email",
  [prefix + ".loginOrEmailLabel"]: "Login or email",
  [prefix + ".passwordLabel"]: "Password",
  [prefix + ".loginButtonText"]: "Sign in",
  [prefix + ".googleButtonText"]: "With Google",
  [prefix + ".loginLabel"]: "Login",
  [prefix + ".nameLabel"]: "Name",
  [prefix + ".fullNameLabel"]: "Full name",
  [prefix + ".additionalInfoLabel"]: "Additional info",
  [prefix + ".registerButtonText"]: "Sign Up",
  [prefix +
  ".registerErrorDuplicate"]: "User with such email or login is already exists",
  [prefix +
  ".registerInvalidForm"]: "Something went wrong. Check correctness of your inputs",
  [prefix + ".registerSuccess"]: "Registered successfully!",
};

export { formsEn, formsRu };
