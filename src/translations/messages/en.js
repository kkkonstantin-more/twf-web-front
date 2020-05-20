import { LOCALES } from "../locale";

import { forPlayersSectionEn } from "./home-page/sections/for-players-section";
import { forTutorsSectionEn } from "./home-page/sections/for-tutors-section";
import { heroSectionEn } from "./home-page/sections/hero-section";
import { navigationBarEn } from "./layouts/navigation-bar";
import { ratingsSectionEn } from "./home-page/sections/ratings-section";
import { workFieldsGraphEn } from "./components/work-fields-graph";
import { workFieldsSectionEn } from "./home-page/sections/work-fields-section";
import { ranksSectionEn } from "./home-page/sections/ranks-section";
import { aboutUsSectionEn } from "./home-page/sections/about-us-section";
import { registerFormEn } from "./forms/register-form";
import { loginFormEn } from "./forms/login-form";
import { loginRegisterModalEn } from "./modals/login-register-modal";
import { footerEn } from "./layouts/footer";
import { gameInfoPageEn } from "./game-info-page/game-info-page";
import { playedGameUsersListEn } from "./game-info-page/components/played-game-users-list";

export default {
  [LOCALES.ENGLISH]: {
    ...workFieldsGraphEn,
    ...forPlayersSectionEn,
    ...forTutorsSectionEn,
    ...heroSectionEn,
    ...navigationBarEn,
    ...ratingsSectionEn,
    ...workFieldsSectionEn,
    ...ranksSectionEn,
    ...aboutUsSectionEn,
    ...registerFormEn,
    ...loginFormEn,
    ...loginRegisterModalEn,
    ...footerEn,
    ...gameInfoPageEn,
    ...playedGameUsersListEn,
  },
};
