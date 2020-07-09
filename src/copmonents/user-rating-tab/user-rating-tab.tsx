import React from "react";

import Icon from "@mdi/react";
import { mdiStar, mdiTrophy } from "@mdi/js";

import "./user-rating-tab.scss";
import {UserData} from "../../pages/home-page/sections/ratings-section/ratings-section";

export interface UserRatingTabProps {
  avatarUrl: string;
  name: string;
  place: number;
  points: number;
  currentUser?: boolean;
}

const UserRatingTab: React.FC<UserData> = ({
//  avatarUrl,
  name,
  place,
  points,
//  currentUser,
}) => {
  const color = () => {
    switch (place) {
      case 1:
        return "gold";
      case 2:
        return "orange";
      case 3:
        return "silver";
      default:
        return "yellow";
    }
  };
  const iconPath: string =
    [1, 2, 3].indexOf(place) === -1 ? mdiStar : mdiTrophy;
  return (
    <div
      // className={`user-rating-tab ${
      //   currentUser ? "user-rating-tab--current-user" : ""
      // }`}
      className="user-rating-tab"
    >
      <div className="user-rating-tab__place">#{place}</div>
      {/*<div*/}
        {/*className="user-rating-tab__avatar"*/}
        {/*style={{ backgroundImage: `url(${avatarUrl})` }}*/}
      {/*/>*/}
      <div className="user-rating-tab__name">{name}</div>
      <div className="user-rating-tab__points">
        <span>{points}</span>
        <Icon path={iconPath} color={color()} size={2} />
      </div>
    </div>
  );
};

export default UserRatingTab;
