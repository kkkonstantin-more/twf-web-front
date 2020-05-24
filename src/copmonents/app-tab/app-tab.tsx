import React from "react";
import { Link } from "react-router-dom";
import translate from "../../translations/translate";

import "./app-tab.scss";

export interface AppTabProps {
  [key: string]: {
    value: string;
    prefixTranslationId?: string;
    hidden?: boolean;
  };
}

const AppTab: React.FC<AppTabProps> = (tab) => {
  const itemWidth: string = 100 / (Object.keys(tab).length - 1) + "%";
  const { link } = tab;

  return (
    <Link to={link.value} target="_blank" className="app-tab">
      {Object.keys(tab).map((key) => {
        const { value, prefixTranslationId, hidden } = tab[key];
        if (key !== "link" && !hidden) {
          return (
            <div
              className="app-tab__item"
              style={{ width: itemWidth, maxWidth: itemWidth }}
            >
              {prefixTranslationId ? (
                <b>{translate(prefixTranslationId)}: </b>
              ) : (
                ""
              )}{" "}
              {
                <span style={{ fontWeight: prefixTranslationId ? 400 : 700 }}>
                  {value}
                </span>
              }
            </div>
          );
        }
      })}
    </Link>
  );
};

export default AppTab;
