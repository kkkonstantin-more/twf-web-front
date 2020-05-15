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
    linkNameId: translationPrefix + ".aboutUs",
    path: "/#work-fields-section",
  },
  {
    linkNameId: translationPrefix + ".constructor",
    path: "/constructor",
  },
  {
    linkNameId: translationPrefix + ".login",
    path: "/login",
  },
];

export default navigationLinks;
