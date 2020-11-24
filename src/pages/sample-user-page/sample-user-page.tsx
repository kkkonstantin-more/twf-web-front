import React from "react";
import translate from "../../translations/translate";
import "./sample-user-page.scss";
import {GiSevenPointedStar} from "react-icons/gi";
import {FcRating} from "react-icons/fc";
import { Stage, Layer, Rect, Circle } from 'react-konva';

interface SampleUserPageProps {}

const SampleUserPage: React.FC<SampleUserPageProps> = () => {
    const translationPrefix: string = "sampleUserPage";
    const rating: string = translationPrefix + ".rating";
    const xp: string = translationPrefix + ".xp";
    const userShowLogin = "___peppa___";
    const userShowFullName = "Peppa Pig";
    const userShowPhoto = "https://lh3.googleusercontent.com/proxy/nee6LfW0HHfQIhDvMOpxseTXkrYfOBPPt1QUSxj6YFWJXqa0VotIT7Zc7T0SWn6khkgkDMLAabenRD5NBsx0Nq3tw4u36DKzY-lwrBFu-3rhMKcihvR9x-MJaBn-YswpvH-dR_aboKFoBkuaui4hils";
    const userShowRank = "https://cdn.drawception.com/images/panels/2017/4-5/x76Qd5RwcG-8.png"
    const userShowRating = "9397"
    const userShowXp = "217325"

    return (
        <div className="sample-user-page u-container">
            <ul className="user-info">
                <li>
                    <img className="user-photo" src={userShowPhoto}>
                    </img>
                </li>
                <li>
                    <h1 className="user-login">
                        {userShowLogin}
                    </h1>
                </li>
                <li>
                    <h1 className="user-name">
                        {userShowFullName}
                    </h1>
                </li>
            </ul>
            <ul className="user-rating-and-xp">
                <li>
                    <h1 className="user-rating">
                        <FcRating className="user-rating-icon"/> {translate(rating)}: {userShowRating}
                    </h1>
                </li>
                <li>
                    <h1 className="user-xp">
                        <GiSevenPointedStar className="user-xp-icon"/> {translate(xp)}: {userShowXp}
                    </h1>
                </li>
            </ul>
            <div className="arrow-progress-bar">
                720 / 1000 XP
            </div>
            <div className="user-rank">
                <img className="user-rank-image" src={userShowRank}>
                </img>
                <div className="user-rank-number-container">
                </div>
            </div>
        </div>
    );
};

export default SampleUserPage;
