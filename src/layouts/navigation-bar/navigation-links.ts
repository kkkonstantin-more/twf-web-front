export interface LinkInterface {
  linkNameId: string;
  path: string;
}

const translationPrefix = "navigationBar.link";

const navigationLinks: Array<LinkInterface> = [
  {
    linkNameId: translationPrefix + ".forPlayers",
    path: "/#forPlayersSection",
  },
  {
    linkNameId: translationPrefix + ".forTutors",
    path: "/#forTutorsSection",
  },
  {
    linkNameId: translationPrefix + ".rating",
    path: "/#ratingsSection",
  },
  {
    linkNameId: translationPrefix + ".ranks",
    path: "/#ranksSection",
  },
  {
    linkNameId: translationPrefix + ".aboutUs",
    path: "/#aboutUsSection",
  },
  {
    linkNameId: translationPrefix + ".constructor",
    path: "/constructor-menu",
  },
  // {
  //   linkNameId: translationPrefix + ".login",
  //   path: "/",
  // },
];

export default navigationLinks;
