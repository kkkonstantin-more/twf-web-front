const prefix = "fetchErrorMessage";

const fetchErrorMessageRu = {
  [prefix +
  ".clientMessage"]: "Что-то пошло не так при попытке получить актуальные данные...",
  [prefix + ".instruction"]:
    "Если вы хотите помочь нашей команде сделать сайт лучше, то, пожалуйста, откройте" +
    ' консоль разработчика в своем браузере (F12, Safari: cmd+option+I, Opera: ctrl+shift+I). Сделайте скриншот с текстом из консоли. Отправьте на почту vikto9494@gmail.com с темой "Website bug". Спасибо! Благодаря вашему письму мы сможем еще эффективнее продвигать математику в массы =)',
};

const fetchErrorMessageEn = {
  [prefix +
  ".clientMessage"]: 'Something went wrong when trying to get up-to-date data... If you want to help our team make the site better, please open the developer console in your browser and send a screenshot with the text from there to email vikto9494@gmail.com with the theme "Website bug".',
  [prefix +
  ".instruction"]: 'If you want to help our team make the site better, please open the developer console in your browser (F12, Safari: cmd+option+I, Opera: ctrl+shift+I). Take a screenshot with the text from the console. Send it to your email address vikto9494@gmail.com with the theme "Website bug". Thanks to your letter we will be able to promote mathematics to the masses even more effectively =)',
};

export { fetchErrorMessageEn, fetchErrorMessageRu };
