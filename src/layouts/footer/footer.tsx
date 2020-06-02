import React from "react";
import translate from "../../translations/translate";
// hash links are used to being able to make anchor link
import { HashLink as Link } from "react-router-hash-link";

// icons for contacts
import Icon from "@mdi/react";
import { mdiVk, mdiFacebook, mdiTelegram, mdiGmail } from "@mdi/js";

import navigationLinks, {
  LinkInterface,
} from "../navigation-bar/navigation-links";

import "./footer.scss";

const Footer: React.FC = () => {
  // translation vars
  const translationPrefix = "footer";
  const contactsTitleId = translationPrefix + ".contactsTitle";
  const landingNavigationTitleId =
    translationPrefix + ".landingNavigationTitle";
  const aboutTWFWebSiteLinkId = translationPrefix + ".aboutTWFWebSiteLink";

  // other
  const iconsUrls: string[] = [mdiFacebook, mdiVk, mdiTelegram, mdiGmail];
  const linksURLs: string[] = ["https://vk.com/club195826752", "https://vk.com/club195826752", "https://vk.com/club195826752", "https://vk.com/club195826752"];
  const TWFWebSiteUrl: string =
    "https://www.mathhelper.space/twf/prototype/demo.html";

  return (
    // app prefix used to avoid conflict with bootstrap classes
    <div className="app-footer">
      <div className="app-footer__contacts">
        <h1 className="app-footer__title">{translate(contactsTitleId)}:</h1>
        {iconsUrls.map((iconUrl: string, i: number) => (
            <a href={linksURLs[i]}>
              <Icon key={i} path={iconUrl} className="app-footer__contact-icon" />
            </a>
        ))}
      </div>
      <div className="app-footer__landing-navigation">
        <h1 className="app-footer__title">
          {translate(landingNavigationTitleId)}:
        </h1>
        {navigationLinks.map((link: LinkInterface, i: number) => {
          // excluding links that are not connected to landing
          if (link.linkNameId !== "navigationBar.link.login") {
            return (
              <Link
                key={i}
                to={link.path}
                className="app-footer__landing-navigation-link"
              >
                -{translate(link.linkNameId)}
              </Link>
            );
          }
        })}
      </div>
      <a
        href={TWFWebSiteUrl}
        rel="noopener noreferrer"
        target="_blank"
        className="app-footer__web-site-link"
      >
        {translate(aboutTWFWebSiteLinkId)}
      </a>
    </div>
  );
};

export default Footer;
