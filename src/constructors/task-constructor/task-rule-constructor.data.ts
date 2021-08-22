import { MathInputFormat } from "../../utils/kotlin-lib-functions";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";

export const taskRuleConstructorDefaultValues: RuleConstructorInputs = {
    nameRu: "",
    nameEn: "",
    code: "",
    basedOnTaskContext: "true",
    descriptionEn: "",
    descriptionRu: "",
    descriptionShortEn: "",
    descriptionShortRu: "",
    normalizationType: "",
    isExtending: "true",
    weight: 0,
    matchJumbledAndNested: "false",
    right: {
        expression: "",
        format: MathInputFormat.TEX,
    },
    left: {
        expression: "",
        format: MathInputFormat.TEX,
    },
    priority: 0,
    simpleAdditional: "false",
};