// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useMergedRef from "@react-hook/merged-ref";
// components
import Select from "react-select";
import MixedInput from "../../components/mixed-input/mixed-input";
// types
import {
  RuleConstructorInputs,
  RuleConstructorProps,
} from "./rule-constructor.types";
// styles
import "./rule-constructor.styles.scss";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { NamespaceConstructorInputs } from "../namespace-constructor/namespace-constructor.types";
import {
  selectNamespaceJSON,
  selectRulePackJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  UpdateNamespaceJSONAction,
  UpdateRulePackJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import {
  updateNamespaceJSON,
  updateRulePackJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import { RulePackConstructorInputs } from "../rule-pack-constructor/rule-pack-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";

const RuleConstructor = ({
  index,
  defaultValue,
  rulePackJSON,
  updateRulePackJSON,
}: RuleConstructorProps & ConnectedProps<typeof connector>) => {
  // const [mixedInputWidth, setMixedInputWidth] = useState<number>(0);
  const { register, getValues, control } = useFormContext();

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: `rules[${index}].left`,
      label: "Левая часть",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue.left,
    },
    {
      name: `rules[${index}].right`,
      label: "Правая часть",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue.right,
    },
    {
      name: `rules[${index}].basedOnTaskContext`,
      label: "Based on task context",
      type: "text",
      options: [
        { value: true, label: "да" },
        { value: false, label: "нет" },
      ],
      defaultValue: defaultValue.basedOnTaskContext,
    },
    {
      name: `rules[${index}].matchJumbledAndNested`,
      label: "Match jumbled and nested",
      type: "text",
      options: [
        { value: true, label: "да" },
        { value: false, label: "нет" },
      ],
      defaultValue: defaultValue.matchJumbledAndNested,
    },
  ];

  // useEffect(() => {
  //   if (leftInputRef.current) {
  //     const width = window.getComputedStyle(leftInputRef.current, null);
  //     setMixedInputWidth(
  //       parseFloat(width.getPropertyValue("width").slice(0, -2))
  //     );
  //   }
  // }, [leftInputRef]);

  return (
    <div className="rule-constructor">
      <ConstructorForm
        inputs={inputs}
        // @ts-ignore
        register={register}
        onBlur={() => {
          // @ts-ignore
          updateRulePackJSON(getValues());
        }}
        control={control}
      />
    </div>
  );
};

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
