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
  const linksURLs: string[] = ["https://vk.com/club195826752", "https://vk.com/club195826752", "https://vk.com/club195826752", "https://vk.com/club195826752"];
  const allImagesUrls: string[] = [
    ...horizontalPhotosUrls.slice(0, 3),
    ...verticalPhotosUrls.slice(0, 3),
    ...standardPhotosUrls.slice(0, 12),
  ];
  const [currentImagesUrls, setCurrentImagesUrls] = useState<string[]>([
    ...horizontalPhotosUrls.slice(0, 3),
    ...verticalPhotosUrls.slice(0, 3),
    ...standardPhotosUrls.slice(0, 13),
  ]);
  const [photosSides, setPhotosSides] = useState<boolean[]>(
    createArrayWithOneValue(true, Math.floor(allImagesUrls.length))
  );

  // const changeRandomImage = () => {
  //
  // }

  useEffect(() => {
    setInterval(() => {
      const randomIdx = Math.floor(
        Math.random() * Math.floor(photosSides.length)
      );
      setPhotosSides((prevState) => {
        const newSides: boolean[] = [...prevState];
        prevState[randomIdx] = !prevState[randomIdx];
        return newSides;
      });
      // setCurrentImagesUrls((prevState) => {
      //   const newSides: string[] = [...prevState];
      //   prevState[randomIdx] = standardPhotosUrls[randomIdx];
      //   return newSides;
      // });
    }, 1000);
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
              <a href={linksURLs[i]}>
                <Icon path={iconUrl} key={i} className={`about-us-section__link`} />
              </a>
          ))}
        </div>
      </div>
      <div className="about-us-section__photos-grid">
        {photosSides.map((side: boolean, i: number) => {
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
                    backgroundImage: `url(${currentImagesUrls[(i+1) % photosSides.length]})`,
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
