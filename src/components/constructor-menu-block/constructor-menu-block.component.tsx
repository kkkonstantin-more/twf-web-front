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
  const createFromScratchBlock = (() => {
    if (options[0].name === "С нуля") {
      return options.shift();
    } else {
      return null;
    }
  })();

  return (
    <div className="constructor-menu-block">
      <div className="constructor-menu-block__title">
        <Icon path={titleIconUrl} size={2} className="u-mr-sm" />
        <h1>{title}</h1>
      </div>
      <div className="constructor-menu-block__options">
        {createFromScratchBlock && (
          <div
            className="constructor-menu-block__option"
            onClick={(): any => createFromScratchBlock.action()}
          >
            <div className="constructor-menu-block__option__text">{createFromScratchBlock.name}</div>
          </div>
        )}
        {isDataFetched &&
          options.map(
            (option: { name: string; action: () => any }, i: number) => {
              return (
                <div
                  key={i}
                  className="constructor-menu-block__option"
                  onClick={(): any => option.action()}
                >
                  <div className="constructor-menu-block__option__text">{option.name}</div>
                </div>
              );
            }
          )}
        {!isDataFetched && <AppSpinner loading={!isDataFetched} />}
      </div>
    </div>
  );
};

export default ConstructorMenuBlock;
