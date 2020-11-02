// libs and hooks
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
// components
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
// types
import { RuleConstructorProps } from "./rule-constructor.types";
import { RulePackConstructorInputs } from "../rule-pack-constructor/rule-pack-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { UpdateRulePackJSONAction } from "../../redux/constructor-jsons/constructor-jsons.types";
import { ConnectedProps } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { Dispatch } from "react";
// styles
import "./rule-constructor.styles.scss";

const RuleConstructor = ({
  index,
  defaultValue,
  rulePackJSON,
  updateRulePackJSON,
}: RuleConstructorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { register, getValues, setValue } = useFormContext();

  useEffect(() => {
    setValue(`rules[${index}]`, {
      left: defaultValue?.left,
      right: defaultValue?.right,
      basedOnTaskContext: defaultValue?.basedOnTaskContext,
      matchJumbledAndNested: defaultValue?.matchJumbledAndNested,
    });
    // @ts-ignore
    updateRulePackJSON(getValues());
  }, []);

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: `rules[${index}].left`,
      label: "Левая часть",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue?.left,
    },
    {
      name: `rules[${index}].right`,
      label: "Правая часть",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue?.right,
    },
    {
      name: `rules[${index}].basedOnTaskContext`,
      label: "Based on task context",
      type: "text",
      options: [
        { value: "true", label: "да" },
        { value: "false", label: "нет" },
      ],
      defaultValue: defaultValue?.basedOnTaskContext,
    },
    {
      name: `rules[${index}].matchJumbledAndNested`,
      label: "Match jumbled and nested",
      type: "text",
      options: [
        { value: "true", label: "да" },
        { value: "false", label: "нет" },
      ],
      defaultValue: defaultValue?.matchJumbledAndNested,
    },
  ];

  return (
    <div className="rule-constructor">
      <ConstructorForm
        inputs={inputs}
        register={register}
        // @ts-ignore
        updateJSON={() => updateRulePackJSON(getValues())}
      />
    </div>
  );
};

// connecting redux props
const mapState = createStructuredSelector<
  RootState,
  { rulePackJSON: RulePackConstructorInputs }
>({
  rulePackJSON: selectRulePackJSON,
});

const mapDispatch = (dispatch: Dispatch<UpdateRulePackJSONAction>) => ({
  updateRulePackJSON: (rulePackJSON: RulePackConstructorInputs) =>
    dispatch(updateRulePackJSON(rulePackJSON)),
});

const connector = connect(mapState, mapDispatch);

export default connector(RuleConstructor);
