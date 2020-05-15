import { LOCALES } from "../locale";

import { forPlayersSectionRu } from "./home-page/sections/for-players-section";
import { forTutorsSectionRu } from "./home-page/sections/for-tutors-section";
import { heroSectionRu } from "./home-page/sections/hero-section";
import { navigationBarRu } from "./layouts/navigation-bar";
import { ratingsSectionRu } from "./home-page/sections/ratings-section";
import { workFieldsGraphRu } from "./components/work-fields-graph";
import { workFieldsSectionRu } from "./home-page/sections/work-fields-section";
import { ranksSectionRu } from "./home-page/sections/ranks-section";

export default {
  [LOCALES.RUSSIAN]: {
    "demo.languageSwitcher": "Демо смены языка",
    "demo.fetchAvatar": "Демо получения aватара пользователя",
    ...forPlayersSectionRu,
    ...forTutorsSectionRu,
    ...heroSectionRu,
    ...navigationBarRu,
    ...ratingsSectionRu,
    ...workFieldsGraphRu,
    ...workFieldsSectionRu,
    ...ranksSectionRu,
  },
};
