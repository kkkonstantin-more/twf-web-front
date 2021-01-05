// libs and hooks
import React from "react";
// icons
import Icon from "@mdi/react";
// types
import { ConstructorMenuBlockProps } from "./constructor-menu-block.types";
import AppSpinner from "../app-spinner/app-spinner";

const ConstructorMenuBlock = ({
  title,
  titleIconUrl,
  options,
  isDataFetched,
}: ConstructorMenuBlockProps) => {
  return (
    <div className="constructor-menu-block">
      <div className="constructor-menu-block__title">
        <Icon path={titleIconUrl} size={2} className="u-mr-sm" />
        <h1>{title}</h1>
      </div>
      <div className="constructor-menu-block__options">
        {isDataFetched ? (
          options.map(
            (option: { name: string; action: () => any }, i: number) => {
              return (
                <div
                  key={i}
                  className="constructor-menu-block__option"
                  onClick={(): any => option.action()}
                >
                  {option.name}
                </div>
              );
            }
          )
        ) : (
          <AppSpinner loading={!isDataFetched} />
        )}
      </div>
    </div>
  );
};

export default ConstructorMenuBlock;
