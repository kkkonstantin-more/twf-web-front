const twf_js = (window as any)['twf_js'];

// LIB API FUNCTIONS
// format -> expression
export const stringToExpression = twf_js.stringToExpression;
const structureStringToExpression = twf_js.structureStringToExpression;
const texToExpression = twf_js.stringToExpression;

// expression -> format
const expressionToTexString = twf_js.expressionToTexString;
const expressionToStructureString = twf_js.expressionToStructureString;
const expressionToString = twf_js.expressionToString;

class MathInputConvertingError extends Error {
  constructor(message: any) {
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
): string | any => {
  try {
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
  } catch (e: any) {
    console.error("ERROR WHILE DOING MATH CONVERTING", e.message, e);
    return "ERROR WHILE GETTING ERROR FROM MATH INPUT: " + e.message
  }
};

export const getErrorFromMathInput = (
  format: MathInputFormat,
  expression: string
): string | null => {
  try {
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
  } catch (e: any) {
    console.error("ERROR WHILE GETTING ERROR FROM MATH INPUT", e.message, e);
    return "ERROR WHILE GETTING ERROR FROM MATH INPUT: " + e.message
  }
};

// @ts-ignore
export const checkTex = (
  fullExpression?: string,
  start?: string,
  end?: string
) => {
  try {
        return twf_js.checkSolutionInTex(
      fullExpression,
      start,
      undefined,
      "",
      end,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  } catch (e: any) {
    console.error("ERROR WHILE CHECKING TEX", e.message, e);
  }
};
