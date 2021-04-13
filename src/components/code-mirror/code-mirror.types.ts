import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { Position } from "codemirror";

export interface CodeMirrorProps {
  constructorType: ConstructorJSONType;
}

export interface CodeMirrorWordPosition {
  from: Position;
  to: Position;
}

export enum CMErrorType {
  EXCESSIVE_PROP = "excessive prop",
  INVALID_EXP = "invalid expression",
  WRONG_EXP_FORMAT = "wrong expression format",
}

export interface CMError {
  type: CMErrorType;
  invalidValue: string;
  gutterId: string;
}

export interface Bracket {
  char: "{" | "[" | "}" | "]";
  position: CodeMirrorWordPosition;
}
