import { LOCALES } from "../../locale";

import navigation from "./navigation-en";
import homepageEn from "./homepage-en";
import { forPlayersSectionEn } from "../home-page/for-players-section";
import { forTutorsSectionEn } from "../home-page/for-tutors-section";

export default {
  [LOCALES.ENGLISH]: {
    "demo.languageSwitcher": "Language switch demo",
    "demo.fetchAvatar": "Fetch user's avatar",
    ...navigation,
    ...homepageEn,
    ...forPlayersSectionEn,
    ...forTutorsSectionEn,
  },
};
