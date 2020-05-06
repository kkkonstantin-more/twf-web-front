import { LOCALES } from "../../locale";

import navigation from "./navigation-ru";

export default {
  [LOCALES.RUSSIAN]: {
    "demo.languageSwitcher": "Демо смены языка",
    "demo.fetchAvatar": "Демо получения aватара пользователя",
    ...navigation,
  },
};
