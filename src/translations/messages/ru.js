import { LOCALES } from "../locale";

import { forPlayersSectionRu } from "./pages/home-page/sections/for-players-section";
import { forTutorsSectionRu } from "./pages/home-page/sections/for-tutors-section";
import { heroSectionRu } from "./pages/home-page/sections/hero-section";
import { navigationBarRu } from "./layouts/navigation-bar";
import { ratingsSectionRu } from "./pages/home-page/sections/ratings-section";
import { workFieldsGraphRu } from "./components/work-fields-graph";
import { workFieldsSectionRu } from "./pages/home-page/sections/work-fields-section";
import { ranksSectionRu } from "./pages/home-page/sections/ranks-section";
import { aboutUsSectionRu } from "./pages/home-page/sections/about-us-section";
import { registerFormRu } from "./forms/register-form";
import { loginFormRu } from "./forms/login-form";
import { loginRegisterModalRu } from "./modals/login-register-modal";
import { footerRu } from "./layouts/footer";
import { gameInfoPageRu } from "./pages/game-info-page/game-info-page";
import { playedGameUsersListRu } from "./pages/game-info-page/components/played-game-users-list";
import { gamesPageRu } from "./pages/games-page/games-page";
import { gameTabRu } from "./pages/games-page/components/game-tab";
import { playersPageRu } from "./pages/players-page/players-page";
import { playerTabRu } from "./pages/players-page/components/player-tab";
import { sorterRu } from "./components/sorter";
import { appTabRu } from "./components/app-tab";
import { playerInfoPageRu } from "./pages/player-info-page";
import { levelInfoPageRu } from "./pages/level-info-page";
import { filterRu } from "./components/filter";
import { appTabHeaderRu } from "./components/app-tab-header";

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
    ...gamesPageRu,
    ...gameTabRu,
    ...playersPageRu,
    ...playerTabRu,
    ...sorterRu,
    ...appTabRu,
    ...playerInfoPageRu,
    ...levelInfoPageRu,
    ...filterRu,
    ...appTabHeaderRu,
  },
};
