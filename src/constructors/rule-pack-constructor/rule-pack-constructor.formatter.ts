import {
  RulePackConstructorInputs,
  RulePackConstructorSendForm,
  RulePackLink,
  RulePackReceivedForm,
} from "./rule-pack-constructor.types";
import { convertInputStringListSeparatedByCommasToArray } from "../../redux/constructor-jsons/constructor-jsons.utils";

class RulePackConstructorFormatter {
  public static convertReceivedFormToConstructorInputs(
    data: RulePackReceivedForm
  ): RulePackConstructorInputs {
    return {
      ...data,
      rulePacks: data.rulePacks?.map((rp: RulePackLink) => {
        return rp.rulePackCode;
      }),
    };
  }

  public static convertConstructorInputsToSendForm(
    data: RulePackConstructorInputs
  ): RulePackConstructorSendForm {
    return {
      ...data,
      rulePacks: data.rulePacks
        ? convertInputStringListSeparatedByCommasToArray(
            data.rulePacks
          ).map((rp: string) => ({ rulePackCode: rp }))
        : [],
    };
  }
}

export default RulePackConstructorFormatter;
