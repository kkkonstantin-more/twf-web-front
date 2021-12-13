import React from "react";
import {ConstructorJSONType} from "../../redux/constructor-jsons/constructor-jsons.types";

export interface RulesInputProps {
  name: string;
  label?: string;
  style?: React.CSSProperties;
  isRendered?: boolean;
  isVisible?: boolean;
  width?: number;
  onChangeInputValue: any;
  constructorType: ConstructorJSONType;
}