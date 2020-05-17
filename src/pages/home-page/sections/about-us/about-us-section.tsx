import React, { useEffect, useState } from "react";

import "./about-us-section.scss";
import translate from "../../../../translations/translate";
import axios from "axios";

import Icon from "@mdi/react";
import { mdiVk, mdiGmail, mdiFacebook } from "@mdi/js";

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
  const bigPhotoUrl: string = require("../../../../assets/about-us-demo.jpg");
  const [participantPhotosUrls, setParticipantPhotosUrls] = useState<string[]>(
    []
  );
  const linksIcons: string[] = [mdiGmail, mdiFacebook, mdiVk];
  // DEMO getting random participants photos
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=8").then((res) => {
      const photoUrls: string[] = [];
      console.log(res.data.results);
      res.data.results.forEach((user: any) => {
        photoUrls.push(user.picture.large);
      });
      setParticipantPhotosUrls(photoUrls);
    });
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
            <Icon path={iconUrl} key={i} className="about-us-section__link" />
          ))}
        </div>
      </div>
      <div className="about-us-section__photos-grid">
        <div
          className="about-us-section__photo--big"
          style={{ backgroundImage: `url(${bigPhotoUrl}` }}
        />
        {participantPhotosUrls.map((photoUrl: string, i: number) => (
          <div
            key={i}
            className="about-us-section__photo"
            style={{ backgroundImage: `url(${photoUrl})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUsSection;
