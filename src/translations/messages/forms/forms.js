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
  ".registerErrorDuplicateEmail"]: "Пользователь с данным email уже существует!",
  [prefix +
  ".registerErrorDuplicateLogin"]: "Пользователь с данным логином уже существует!",
  [prefix +
  ".registerInvalidForm"]: "Что-то пошло не так, проверьте корректность введенных данных",
  [prefix + ".registerSuccess"]: "Успешная регистрация!",
  [prefix + ".loginSuccess"]: "Успешно!",
  [prefix + ".loginError"]: "Неправильный логин/email или пароль",
  [prefix + ".localizationInputLabel"]: "Локализация",
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
  ".registerErrorDuplicateEmail"]: "User with such email is already exists",
  [prefix +
  ".registerErrorDuplicateLogin"]: "User with such login is already exists",
  [prefix +
  ".registerInvalidForm"]: "Something went wrong. Check correctness of your inputs",
  [prefix + ".registerSuccess"]: "Registered successfully!",
  [prefix + ".loginSuccess"]: "Success!",
  [prefix + ".loginError"]: "Wrong login/email or password",
  [prefix + ".localizationInputLabel"]: "Localization",
};

export { formsEn, formsRu };
