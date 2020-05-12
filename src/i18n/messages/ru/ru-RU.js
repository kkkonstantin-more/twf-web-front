import { LOCALES } from "../../locale";

import navigation from "./navigation-ru";
import homepageRu from "./homepage-ru";
import { forPlayersSectionRu } from "../home-page/for-players-section";
import { forTutorsSectionRu } from "../home-page/for-tutors-section";

export default {
  [LOCALES.RUSSIAN]: {
    "demo.languageSwitcher": "Демо смены языка",
    "demo.fetchAvatar": "Демо получения aватара пользователя",
    ...navigation,
    ...homepageRu,
    ...forPlayersSectionRu,
    ...forTutorsSectionRu,
  },
};
