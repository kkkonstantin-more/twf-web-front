import React from "react";
import { Link } from "react-router-dom";

import "./ratings-section.styles.scss";

import RatingsTablePreview from "../../../copmonents/ratings-table/ratings-table.component";

import { demoRatingsTop5Users, demoUserRating } from "../../../data/demo-data";

const RatingsSection: React.FC = () => {
    return (
        <div className={`ratings-section__wrapper`}>
            <div className={`ratings-section u-container`}>
                <div className="ratings-section__description">
                    <h1>Играй и поднимайся наверх в рейтинге игроков!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto aut autem beatae dicta dolores in inventore minima numquam odio officia qui quia quis repellendus similique sit, ut veritatis voluptates.</p>
                </div>
                <div className="ratings-section__table">
                    <h1 className={"ratings-section__table-header"}>
                        Рейтинг игроков
                    </h1>
                    <RatingsTablePreview
                        data={demoRatingsTop5Users}
                        currentUserData={demoUserRating}
                    />
                    <Link
                        to={"/ratings"}
                        className={"ratings-section__table-link"}
                    >
                        Подробный рейтинг игроков
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default RatingsSection;