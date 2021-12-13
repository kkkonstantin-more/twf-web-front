import React from "react";
import {RulesInputProps} from "./rules-input.types";
import Icon from "@mdi/react";
import {mdiClose, mdiNumericPositive1} from "@mdi/js";
import "./rules-input.styles.scss";
import MixedInput from "../mixed-input/mixed-input.component";
import {MathInputFormat} from "../../utils/kotlin-lib-functions";
import {ArrayField, useFieldArray, useFormContext} from "react-hook-form";
import {RuleConstructorInputs} from "../../constructors/rule-constructor/rule-constructor.types";
import {taskRuleConstructorDefaultValues} from "../../constructors/task-constructor/task-rule-constructor.data";

const RulesInput = (
  {
    onChangeInputValue,
    constructorType,
    name,
    style,
    label,
    isRendered = true,
    isVisible = true,
    width = 100,
  }: RulesInputProps
) => {

  // react-hook-form core functions from parent component's context
  // TaskConstructor should be wrapped inside FormProvider component
  const { control } = useFormContext();

  // react-hook-form's fieldArray initialization and getting its needed tools
  // in order to manage rule constructors
  const { fields: fieldsRules, append: appendRule, remove: removeRule } = useFieldArray<RuleConstructorInputs>(
    {
      control,
      name: name,
    }
  );

  return (
    <div
      className="multiple-mixed-input"
      style={
        style
          ? { ...style, display: isVisible ? "block" : "hidden" }
          : { display: isVisible ? "block" : "hidden", flexBasis: `${width - 1}%`, marginRight: '1%' }
      }>
      {label && <div className="label">{label}</div>}
      {fieldsRules.map(
        (
          field: Partial<ArrayField<RuleConstructorInputs>>,
          fieldIdx: number
        ) => {
          return (
            <div key={field.id}>
              <div style={{display: 'inline-block', width: '40%'}}>
                <MixedInput
                  style={style}
                  isRendered={isRendered}
                  isVisible={isVisible}
                  width={width}
                  format={field.left!.format}
                  expression={field.left!.expression}
                  onChangeExpression={(value: string) => {
                    onChangeInputValue(
                      `${name}[${fieldIdx}].left.expression`,
                      field.left!.expression,
                      value,
                      constructorType
                    );
                  }}
                  onChangeFormat={(value: MathInputFormat) => {
                    onChangeInputValue(
                      `${name}[${fieldIdx}].left.format`,
                      field.left!.format,
                      value,
                      constructorType
                    );
                  }}
                />
              </div>
              <div style={{display: 'inline-block', width: '1%'}}>
                =
              </div>
              <div style={{display: 'inline-block', width: '40%'}}>
                <MixedInput
                  style={style}
                  isRendered={isRendered}
                  isVisible={isVisible}
                  width={width}
                  format={field.right!.format}
                  expression={field.right!.expression}
                  onChangeExpression={(value: string) => {
                    onChangeInputValue(
                      `${name}[${fieldIdx}].right.expression`,
                      field.right!.expression,
                      value,
                      constructorType
                    );
                  }}
                  onChangeFormat={(value: MathInputFormat) => {
                    onChangeInputValue(
                      `${name}[${fieldIdx}].right.format`,
                      field.right!.format,
                      value,
                      constructorType
                    );
                  }}
                />
              </div>

              <button
                className="btn"
                style={{padding: 0, marginBottom: 5}}
                type="button"
                onClick={() => {if(fieldsRules.length > 1) removeRule(fieldIdx)}}
              >
                <Icon path={mdiClose} size={1}/>
              </button>
              {fieldIdx == fieldsRules.length - 1 &&
              <button
                  className="btn"
                  style={{padding: 0, marginBottom: 5, marginLeft: 5}}
                  type="button"
                  onClick={() => {if(fieldsRules.length < 5) appendRule({ ...taskRuleConstructorDefaultValues })}}
              >
                  <Icon path={mdiNumericPositive1} size={1}/>
              </button>}
            </div>
          )
        })}
    </div>
  );
};

export default RulesInput;
