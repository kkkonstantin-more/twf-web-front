import React, { useEffect, useState } from "react";
import translate from "../../../../translations/translate";
import axios from "axios";

import Icon from "@mdi/react";
import { mdiVk, mdiGmail, mdiFacebook } from "@mdi/js";

import "./about-us-section.scss";

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
  const shuffleArray = (arr: string[]): string[] => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const fillArray = (value: boolean, length: number) => {
    const arr = [];
    for (let i: number = 0; i < length; i++) {
      arr.push(value);
    }
    return arr;
  };

  const allHorizontalPhotosUrls = [
    require("../../../../assets/about-us-section/horizontal-images/horizontal-1.jpg"),
    require("../../../../assets/about-us-section/horizontal-images/horizontal-2.jpg"),
    require("../../../../assets/about-us-section/horizontal-images/horizontal-3.jpg"),
    require("../../../../assets/about-us-section/horizontal-images/horizontal-4.jpg"),
    require("../../../../assets/about-us-section/horizontal-images/horizontal-5.jpg"),
    require("../../../../assets/about-us-section/horizontal-images/horizontal-6.jpg"),
  ];
  const allVerticalPhotosUrls = [
    require("../../../../assets/about-us-section/vertical-images/vertical-1.jpg"),
    require("../../../../assets/about-us-section/vertical-images/vertical-2.jpg"),
    require("../../../../assets/about-us-section/vertical-images/vertical-3.jpg"),
    require("../../../../assets/about-us-section/vertical-images/vertical-4.jpg"),
    require("../../../../assets/about-us-section/vertical-images/vertical-5.jpg"),
    require("../../../../assets/about-us-section/vertical-images/vertical-6.jpg"),
  ];
  const [allStandardPhotosUrls, setAllStandardPhotosUrls] = useState<string[]>(
    []
  );

  const [photosSides, setPhotosSides] = useState<boolean[]>([
    ...fillArray(true, 29),
  ]);

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=24").then((res) => {
      const photoUrls: string[] = [];
      res.data.results.forEach((user: any) => {
        photoUrls.push(user.picture.large);
      });
      setAllStandardPhotosUrls(photoUrls);
      setInterval(() => {
        const randomIdx = Math.floor(
          Math.random() * Math.floor(photosSides.length)
        );
        setPhotosSides([
          ...photosSides.slice(0, randomIdx),
          !photosSides[randomIdx],
          ...photosSides.slice(randomIdx),
        ]);
      }, 3000);
    });
  }, []);

  // other
  const linksIcons: string[] = [mdiGmail, mdiFacebook, mdiVk];

  return (
    <div className="about-us-section" id="aboutUsSection">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="about-us-section__text">
        <img src="" alt="" />
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
        {[
          ...allHorizontalPhotosUrls,
          ...allVerticalPhotosUrls,
          ...allStandardPhotosUrls,
        ].map((photoUrl: string, i: number, arr: string[]) => {
          if (i % 2 === 1 && i < arr.length) {
            return (
              <div className="about-us-section__photo-3d-container">
                <div
                  className={`about-us-section__photo-container ${
                    photosSides[i]
                      ? "about-us-section__photo-container--is-flipped"
                      : ""
                  }`}
                >
                  {/*{photosSides[i] ? (*/}
                  <div
                    style={{ backgroundImage: `url(${arr[i]})` }}
                    className="about-us-section__photo about-us-section__photo--front"
                  />
                  {/*) : (*/}
                  <div
                    style={{
                      backgroundImage: `url(${arr[i - 1]})`,
                    }}
                    className="about-us-section__photo about-us-section__photo--back"
                  />
                  {/*)}*/}
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
