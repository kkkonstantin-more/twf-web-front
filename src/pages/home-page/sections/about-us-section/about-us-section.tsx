import React, { useEffect, useState } from "react";
import translate from "../../../../translations/translate";
// our contacts icons
import Icon from "@mdi/react";
import { mdiVk, mdiGmail, mdiFacebook, mdiTelegram } from "@mdi/js";

import { createArrayWithOneValue, shuffleArray } from "../../../../utils";

import {
  horizontalPhotosUrls,
  verticalPhotosUrls,
  standardPhotosUrls,
} from "./images-urls";

import "./about-us-section.scss";

const AboutUsSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "aboutUsSection";
  const titleId: string = translationPrefix + ".title";
  const paragraphIds: string[] = [
    translationPrefix + ".paragraph1",
    translationPrefix + ".paragraph2",
    translationPrefix + ".paragraph3",
  ];
  // other
  const linksIcons: string[] = [mdiFacebook, mdiVk, mdiTelegram, mdiGmail];
  const linksURLs: string[] = [
    "https://vk.com/club195826752",
    "https://vk.com/club195826752",
    "https://vk.com/club195826752",
    "https://vk.com/club195826752",
  ];

  const [currentImagesUrls, setCurrentImagesUrls] = useState([
    ...shuffleArray(horizontalPhotosUrls).slice(0, 3),
    ...shuffleArray(verticalPhotosUrls).slice(0, 3),
    ...shuffleArray(standardPhotosUrls).slice(0, 12),
  ]);

  const [photosSides, setPhotosSides] = useState<boolean[]>(
    createArrayWithOneValue(true, currentImagesUrls.length)
  );

  useEffect(() => {
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * photosSides.length);
      setPhotosSides((prevState) => {
        return prevState.map((side, i) => (i === randomIdx ? !side : side));
      });
    }, 3000);
  }, [photosSides]);

  return (
    <div className="about-us-section" id="aboutUsSection">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="about-us-section__text">
        {paragraphIds.map((p: string, i: number) => (
          <p key={i}>{translate(p)}</p>
        ))}
        <div className="about-us-section__links">
          {linksIcons.map((iconUrl: string, i: number) => (
            <a key={iconUrl} href={linksURLs[i]}>
              <Icon path={iconUrl} className="about-us-section__link" />
            </a>
          ))}
        </div>
      </div>
      <div className="about-us-section__photos-grid">
        {photosSides.map((_: boolean, i: number) => {
          return (
            <div key={i} className="about-us-section__photo-3d-container">
              <div
                className={`about-us-section__photo-container
                  ${
                    photosSides[i]
                      ? ""
                      : "about-us-section__photo-container--is-flipped"
                  }`}
              >
                <div
                  style={{ backgroundImage: `url(${currentImagesUrls[i]})` }}
                  className="about-us-section__photo about-us-section__photo--front"
                />
                <div
                  style={{
                    backgroundImage: `url(${currentImagesUrls[i]})`,
                  }}
                  className="about-us-section__photo about-us-section__photo--back"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutUsSection;
