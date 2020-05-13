import { LOCALES } from "../locale";

import { forPlayersSectionRu } from "./home-page/sections/for-players-section";
import { forTutorsSectionRu } from "./home-page/sections/for-tutors-section";
import { heroSectionRu } from "./home-page/sections/hero-section";
import { navigationBarRu } from "./layouts/navigation-bar";
import { ratingsSectionRu } from "./home-page/sections/ratings-section";

export default {
  [LOCALES.RUSSIAN]: {
    "demo.languageSwitcher": "Демо смены языка",
    "demo.fetchAvatar": "Демо получения aватара пользователя",
    ...forPlayersSectionRu,
    ...forTutorsSectionRu,
    ...heroSectionRu,
    ...navigationBarRu,
    ...ratingsSectionRu,
  },
};
