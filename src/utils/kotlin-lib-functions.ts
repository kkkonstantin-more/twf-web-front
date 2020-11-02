// @ts-nocheck
// disable ts checks to be able to work with window obj

// LIB API FUNCTIONS
// format -> expression
const stringToExpression = window.twfKotlinLibrary.stringToExpression;
const structureStringToExpression =
  window.twfKotlinLibrary.api.structureStringToExpression_69c2cy$;
const texToExpression = window.twfKotlinLibrary.api.stringToExpression_y630ta$;

// expression -> format
const expressionToTexString =
  window.twfKotlinLibrary.api.expressionToTexString_tvfpvg$;
const expressionToStructureString =
  window.twfKotlinLibrary.api.expressionToStructureString_6718cy$;
const expressionToString =
  window.twfKotlinLibrary.api.expressionToString_tvfpvg$;

class MathInputConvertingError extends Error {
  constructor(message) {
    super(message);
    this.name = "MathInputConvertingError";
  }
}

export enum MathInputFormat {
  TEX = "TEX",
  STRUCTURE_STRING = "STRUCTURE_STRING",
  PLAIN_TEXT = "PLAIN_TEXT",
}

export const convertMathInput = (
  from: MathInputFormat,
  to: MathInputFormat,
  expression: string
): string => {
  const expressionInLibFormat: any = (() => {
    if (from === MathInputFormat.PLAIN_TEXT) {
      return stringToExpression(expression);
    } else if (from === MathInputFormat.STRUCTURE_STRING) {
      return structureStringToExpression(expression);
    } else if (from === MathInputFormat.TEX) {
      // lib understands '//' as '/' in classic TEX
      return texToExpression(expression.replace(/\//g, "//"));
    }
  })();
  if (expressionInLibFormat.nodeType.name$ === "ERROR") {
    throw new MathInputConvertingError(expressionInLibFormat.value);
  }
  if (to === MathInputFormat.PLAIN_TEXT) {
    return expressionToString(expressionInLibFormat);
  } else if (to === MathInputFormat.STRUCTURE_STRING) {
    return expressionToStructureString(expressionInLibFormat);
  } else if (to === MathInputFormat.TEX) {
    return expressionToTexString(expressionInLibFormat);
  }
};

export const getErrorFromMathInput = (
  format: MathInputFormat,
  expression: string
): string | null => {
  const expressionInLibFormat: any = (() => {
    if (format === MathInputFormat.PLAIN_TEXT) {
      return stringToExpression(expression);
    } else if (format === MathInputFormat.STRUCTURE_STRING) {
      return structureStringToExpression(expression);
    } else if (format === MathInputFormat.TEX) {
      // lib understands '//' as '/' in classic TEX
      return texToExpression(expression.replace(/\//g, "//"));
    }
  })();
  return expressionInLibFormat.nodeType.name$ === "ERROR"
    ? expressionInLibFormat.value
    : null;
};
