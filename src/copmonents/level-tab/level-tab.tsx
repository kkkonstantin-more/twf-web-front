import React from "react";
import translate from "../../translations/translate";

import "./level-tab.scss";

export interface LevelTabProps {
  name: string;
  code: string;
  difficulty: number;
  completesAmount: number;
}

const LevelTab: React.FC<LevelTabProps> = ({
  name,
  code,
  difficulty,
  completesAmount,
}) => {
  // translation vars
  const translationPrefix: string = "levelTab";
  const codeId: string = translationPrefix + ".code";
  const difficultyId: string = translationPrefix + ".difficulty";
  const completesAmountId: string = translationPrefix + ".completesAmount";
  // other

  return (
    <div className="level-tab">
      <div className="level-tab__name">{name}</div>
      <div className="level-tab__code">
        <b>{translate(codeId)}: </b>
        {code}
      </div>
      <div className="level-tab__difficulty">
        <b>{translate(difficultyId)}: </b>
        {difficulty}
      </div>
      <div className="level-tab__completes-amount">
        <b>{translate(completesAmountId)}: </b>
        {completesAmount}
      </div>
    </div>
  );
};

export default LevelTab;
