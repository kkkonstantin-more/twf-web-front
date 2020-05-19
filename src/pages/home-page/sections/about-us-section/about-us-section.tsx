import React, { useEffect, useState } from "react";
import translate from "../../../../translations/translate";

import Icon from "@mdi/react";
import { mdiVk, mdiGmail, mdiFacebook, mdiTelegram } from "@mdi/js";

import "./about-us-section.scss";

import { createArrayWithOneValue } from "../../../../utils";
import {
  horizontalPhotosUrls,
  verticalPhotosUrls,
  standardPhotosUrls,
} from "./images-urls";

const AboutUsSection: React.FC = () => {
  // translate vars
  const translationPrefix: string = "aboutUsSection";
  const titleId: string = translationPrefix + ".title";
  const paragraphIds: string[] = [
    translationPrefix + ".paragraph1",
    translationPrefix + ".paragraph2",
    translationPrefix + ".paragraph3",
  ];
  // other
  const linksIcons: string[] = [mdiFacebook, mdiVk, mdiTelegram, mdiGmail];
  const allImagesUrls: string[] = [
    ...horizontalPhotosUrls,
    ...verticalPhotosUrls,
    ...standardPhotosUrls,
  ];
  const [photosSides, setPhotosSides] = useState<boolean[]>(
    createArrayWithOneValue(true, Math.floor(allImagesUrls.length / 2))
  );

  useEffect(() => {
    setInterval(() => {
      const randomIdx = Math.floor(
        Math.random() * Math.floor(photosSides.length)
      );
      setPhotosSides([
        ...photosSides.slice(0, randomIdx),
        !photosSides[randomIdx],
        ...photosSides.slice(randomIdx),
      ]);
    }, 2000);
  }, []);

  return (
    <div className="about-us-section" id="aboutUsSection">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="about-us-section__text">
        {paragraphIds.map((p: string, i: number) => (
          <p key={i}>{translate(p)}</p>
        ))}
        <div className="about-us-section__links">
          {linksIcons.map((iconUrl: string, i: number) => (
            <Icon path={iconUrl} key={i} className={`about-us-section__link`} />
          ))}
        </div>
      </div>
      <div className="about-us-section__photos-grid">
        {allImagesUrls.map((photoUrl: string, i: number, arr: string[]) => {
          if (i % 2 === 1 && i < arr.length) {
            return (
              <div className="about-us-section__photo-3d-container">
                <div
                  className={`about-us-section__photo-container
                  ${
                    photosSides[Math.floor(i / 2)]
                      ? "about-us-section__photo-container--is-flipped"
                      : ""
                  }`}
                >
                  <div
                    style={{ backgroundImage: `url(${arr[i]})` }}
                    className="about-us-section__photo about-us-section__photo--front"
                  />
                  <div
                    style={{
                      backgroundImage: `url(${arr[i - 1]})`,
                    }}
                    className="about-us-section__photo about-us-section__photo--back"
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AboutUsSection;
