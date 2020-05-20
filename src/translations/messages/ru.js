import { LOCALES } from "../locale";

import { forPlayersSectionRu } from "./home-page/sections/for-players-section";
import { forTutorsSectionRu } from "./home-page/sections/for-tutors-section";
import { heroSectionRu } from "./home-page/sections/hero-section";
import { navigationBarRu } from "./layouts/navigation-bar";
import { ratingsSectionRu } from "./home-page/sections/ratings-section";
import { workFieldsGraphRu } from "./components/work-fields-graph";
import { workFieldsSectionRu } from "./home-page/sections/work-fields-section";
import { ranksSectionRu } from "./home-page/sections/ranks-section";
import { aboutUsSectionRu } from "./home-page/sections/about-us-section";
import { registerFormRu } from "./forms/register-form";
import { loginFormRu } from "./forms/login-form";
import { loginRegisterModalRu } from "./modals/login-register-modal";
import { footerRu } from "./layouts/footer";
import { gameInfoPageRu } from "./game-info-page/game-info-page";
import { playedGameUsersListRu } from "./game-info-page/components/played-game-users-list";

export default {
  [LOCALES.RUSSIAN]: {
    ...forPlayersSectionRu,
    ...forTutorsSectionRu,
    ...heroSectionRu,
    ...navigationBarRu,
    ...ratingsSectionRu,
    ...workFieldsGraphRu,
    ...workFieldsSectionRu,
    ...ranksSectionRu,
    ...aboutUsSectionRu,
    ...registerFormRu,
    ...loginFormRu,
    ...loginRegisterModalRu,
    ...footerRu,
    ...gameInfoPageRu,
    ...playedGameUsersListRu,
  },
};
