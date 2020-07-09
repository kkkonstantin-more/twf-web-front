import React from "react";

import UserRatingTab from "../user-rating-tab/user-rating-tab";

//import { UserRatingTabProps } from "../user-rating-tab/user-rating-tab";

import "./ratings-table.scss";
import {UserData} from "../../pages/home-page/sections/ratings-section/ratings-section";


interface RatingTableProps {
  data: Array<UserData>;
//  currentUserData: UserData;
}

const RatingsTable: React.FC<RatingTableProps> = ({
  data,
//  currentUserData,
}) => {
  return (
    <div className={"ratings-table"}>
      {data.map((user) => (
        <UserRatingTab
          key={user.place}
//          avatarUrl={user.avatarUrl}
          name={user.name}
          place={user.place}
          points={user.points}
        />
      ))}
      {/*<UserRatingTab*/}
        {/*key={currentUserData.place}*/}
        {/*avatarUrl={currentUserData.avatarUrl}*/}
        {/*name={currentUserData.name}*/}
        {/*place={currentUserData.place}*/}
        {/*points={currentUserData.points}*/}
        {/*currentUser={true}*/}
      {/*/>*/}
    </div>
  );
};

export default RatingsTable;
