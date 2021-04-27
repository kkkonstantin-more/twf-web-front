// @ts-nocheck
import twfKotlinLibrary from "../local-libs/twf-kotlin-lib";

// LIB API FUNCTIONS
// format -> expression
export const stringToExpression =
  twfKotlinLibrary.api.stringToExpression_y630ta$;
const structureStringToExpression =
  twfKotlinLibrary.api.structureStringToExpression_69c2cy$;
const texToExpression = twfKotlinLibrary.api.stringToExpression_y630ta$;

// expression -> format
const expressionToTexString =
  twfKotlinLibrary.api.expressionToTexString_tvfpvg$;
const expressionToStructureString =
  twfKotlinLibrary.api.expressionToStructureString_6718cy$;
const expressionToString = twfKotlinLibrary.api.expressionToString_tvfpvg$;

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
): string => {
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
  } catch (e) {
    console.error("ERROR WHILE DOING MATH CONVERTING", e.message, e);
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
  } catch (e) {
    console.error("ERROR WHILE GETTING ERROR FROM MATH INPUT", e.message, e);
  }
};

export const checkTex = (
  fullExpression?: string,
  start: string,
  end: string
) => {
  try {
    const wellKnownFunctionsString = `
    ;;;0;;;
    ;;;1;;;
    +;;;-1;;;
    -;;;-1;;;
    *;;;-1;;;
    /;;;-1;;;
    ^;;;-1
    `;
    const expressionTransformationRulesString =
      "sin(x)^2;;;1 - cos(x)^2;;;" +
      "cos(x)^2;;;1 - sin(x)^2;;;" +
      "cos(x)^2+sin(x)^2;;;1;;;" +
      "tg(x);;;sin(x)/cos(x);;;" +
      "ctg(x);;;cos(x)/sin(x);;;" +
      "ctg(x)tg(x);;;1;;;" +
      "tg(x)^2+1;;;1/cos(x)^2;;;" +
      "ctg(x)^2+1;;;1/sin(x)^2;;;" +
      "sin(x+y);;;sin(x)cos(y)+sin(y)cos(x);;;" +
      "sin(x-y);;;sin(x)cos(y)-sin(y)cos(x);;;" +
      "cos(x+y);;;cos(x)cos(y)-sin(x)sin(y);;;" +
      "cos(x-y);;;cos(x)cos(y)+sin(x)sin(y);;;" +
      "tg(x+y);;;(tg(x)+tg(y))/(1-tg(x)tg(y));;;" +
      "tg(x-y);;;(tg(x)-tg(y))/(1+tg(x)tg(y));;;" +
      "ctg(x+y);;;(ctg(x)ctg(y)-1)/(ctg(x)+ctg(y));;;" +
      "ctg(x-y);;;(ctg(x)ctg(y)+1)/(ctg(x)-ctg(y));;;" +
      "sin(2*x);;;2*sin(x)cos(x);;;" +
      "sin(2*x);;;2*tg(x)/(1+(tg(x))^2);;;" +
      "cos(2*x);;;cos(x)^2 - sin(x)^2;;;" +
      "cos(2*x);;;2*cos(x)^2 - 1;;;" +
      "cos(2*x);;;1 - 2*sin(x)^2;;;" +
      "cos(2*x);;;(1-(tg(x))^2)/(1+(tg(x))^2);;;" +
      "sin(x)^2;;;(1 - cos(2*x))/2;;;" +
      "cos(x)^2;;;(1 + cos(2*x))/2;;;" +
      "sin(x)+sin(y);;;2*sin((x+y)/2)*cos((x-y)/2);;;" +
      "sin(x)-sin(y);;;2*sin((x-y)/2)*cos((x+y)/2);;;" +
      "cos(x)+cos(y);;;2*cos((x+y)/2)*cos((x-y)/2);;;" +
      "cos(x)-cos(y);;;2*sin((x+y)/2)*sin((x-y)/2);;;" +
      "sin(x)sin(y);;;(cos(x-y)-cos(x+y))/2;;;" +
      "sin(x)cos(y);;;(sin(x-y)+sin(x+y))/2;;;" +
      "cos(x)cos(y);;;(cos(x-y)+cos(x+y))/2;;;" +
      "sin(0);;;0;;;" +
      "sin(pi/2);;;1;;;" +
      "cos(0);;;1;;;" +
      "cos(pi/2);;;0;;;" +
      "sin(pi/6);;;1/2;;;" +
      "sin(pi/4);;;2^0.5/2;;;" +
      "sin(pi/3);;;3^0.5/2;;;" +
      "cos(pi/3);;;1/2;;;" +
      "cos(pi/4);;;2^0.5/2;;;" +
      "cos(pi/6);;;3^0.5/2;;;" +
      "cos(pi/6);;;3^0.5/2;;;" +
      "cos(-x);;;cos(x);;;" +
      "sin(-x);;;-sin(x);;;" +
      "sin(pi-x);;;sin(x);;;" +
      "cos(pi-x);;;-cos(x);;;" +
      "sin(x+2*pi);;;sin(x);;;" +
      "cos(x+2*pi);;;cos(x);;;" +
      "cos(pi/2-x);;;sin(x);;;" +
      "sin(pi/2-x);;;cos(x)";

    return twfKotlinLibrary.api.checkSolutionInTex_1yhbkg$(
      fullExpression,
      start,
      undefined,
      "",
      end,
      undefined,
      undefined,
      wellKnownFunctionsString,
      undefined,
      undefined,
      undefined,
      expressionTransformationRulesString,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  } catch (e) {
    console.error("ERROR WHILE CHECKING TEX", e.message, e);
  }
};
