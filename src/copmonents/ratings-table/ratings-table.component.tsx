import React from "react";

import UserRatingTab from "../user-rating-tab/user-rating-tab.component";

import { UserRatingTabProps } from "../user-rating-tab/user-rating-tab.component";

import "./ratings-table.styles.scss";

interface RatingTableProps {
    data: Array<UserRatingTabProps>,
    currentUserData: UserRatingTabProps
}

const RatingsTable: React.FC<RatingTableProps> = ({
    data,
    currentUserData
}) => {
    return (
        <div className={"ratings-table"}>
            { data.map(user => (
                <UserRatingTab
                    key={user.place}
                    avatarUrl={user.avatarUrl}
                    name={user.name}
                    place={user.place}
                    points={user.points}
                />
            )) }
            <UserRatingTab
                key={currentUserData.place}
                avatarUrl={currentUserData.avatarUrl}
                name={currentUserData.name}
                place={currentUserData.place}
                points={currentUserData.points}
                currentUser={true}
            />
        </div>
    )
};

export default RatingsTable;