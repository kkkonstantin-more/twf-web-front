// libs and hooks
import React, { Dispatch } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// lib components
import Select from "react-select";
// custom components
import ActionButton from "../../components/action-button/action-button.component";
import RuleConstructor from "../rule-constructor/rule-constructor.component";
// styles
import "./rule-pack-constructor.scss";
// icons
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiClose,
  mdiContentCopy,
  mdiPlus,
} from "@mdi/js";
// data
import { mockRulePacks } from "./rule-pack-constructor.mock-data";
import { RulePackConstructorInputs } from "./rule-pack-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { SelectInput } from "../../types/react-select";
import { isSelectInput } from "../utils";
import ConstructorInput from "../../components/constructor-input/constructor-input.component";
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

const RulePackConstructor = ({
  rulePackJSON,
  updateRulePackJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  const rulePackToEdit = useMockConstructorToEdit<RulePackConstructorInputs>(
    mockRulePacks
  );

  if (rulePackToEdit) {
    updateRulePackJSON(rulePackToEdit);
  }

  const useFormMethods = useForm<RulePackConstructorInputs>({
    defaultValues: rulePackToEdit || rulePackJSON,
  });
  const { register, getValues, control } = useFormMethods;
  const { fields, append, swap, remove } = useFieldArray({
    control,
    name: "rules",
  });

  const actionButtonsLeft: {
    mdiIconPath: string;
    action: (index: number) => any;
    size: number;
  }[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      action(index: number) {
        append({
          ...getValues().rules[index],
        });
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      action(index: number) {
        if (index !== 0) {
          swap(index, index - 1);
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      action(index: number) {
        if (index !== getValues().rules.length - 1) {
          swap(index, index + 1);
        }
      },
    },
  ];

  const actionButtonsRight: {
    mdiIconPath: string;
    action: (index: number) => any;
    size: number;
  }[] = [
    {
      mdiIconPath: mdiClose,
      size: 2,
      action(index: number) {
        if (window.confirm(`Вы точно хотите удалить правило ${index + 1}?`)) {
          remove(index);
        }
      },
    },
  ];

  const inputs: (ConstructorInputProps | SelectInput)[] = [
    {
      name: "nameEn",
      label: "Название  En",
      type: "text",
      register,
      onBlur: () => updateRulePackJSON(getValues()),
    },
    {
      name: "nameRu",
      label: "Название Ru",
      type: "text",
      register,
      onBlur: () => updateRulePackJSON(getValues()),
    },
    {
      name: "rulePacks",
      label: "Добавить существующие пакеты",
      isMulti: true,
      options: Object.keys(mockRulePacks).map((key: string) => {
        return {
          value: key,
          label: mockRulePacks[key].nameRu,
        };
      }),
      register,
      onBlur: () => updateRulePackJSON(getValues()),
    },
  ];

  return (
    <FormProvider {...useFormMethods}>
      <div className="rule-pack-constructor">
        <h2>Создать RulePack</h2>
        {inputs.map((input: ConstructorInputProps | SelectInput) => {
          if (isSelectInput(input)) {
            const { label } = input;
            const inputProps = Object.assign({}, input);
            delete inputProps.label;
            return (
              <div key={input.name}>
                <label>{label}</label>
                <Controller as={Select} control={control} {...inputProps} />
              </div>
            );
          } else {
            return <ConstructorInput key={input.name} {...input} />;
          }
        })}
        <h3>Правила:</h3>
        <div className="rule-pack-constructor__rules">
          {fields.map((field, i) => {
            return (
              <div className="rule-pack-constructor__rule">
                <b>{i + 1}.</b>
                {actionButtonsLeft.map((button, j) => {
                  return (
                    <ActionButton
                      key={j}
                      mdiIconPath={button.mdiIconPath}
                      size={1.5}
                      action={() => {
                        button.action(i);
                      }}
                      margin={"0 1rem 0 0"}
                    />
                  );
                })}
                <RuleConstructor
                  key={field.id}
                  index={i}
                  defaultValue={fields[i]}
                />
                {actionButtonsRight.map((button, j) => {
                  return (
                    <ActionButton
                      key={j}
                      mdiIconPath={button.mdiIconPath}
                      size={2}
                      action={() => {
                        button.action(i);
                      }}
                      margin={"0"}
                    />
                  );
                })}
              </div>
            );
          })}
          <div className="rule-pack-constructor__action-buttons">
            <button
              className="btn u-mr-sm"
              onClick={() => {
                append({});
              }}
            >
              <Icon path={mdiPlus} size={1.2} />
              <span>правило</span>
            </button>
            <button className="btn" onClick={() => console.log(getValues())}>
              get values
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
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

export default connector(RulePackConstructor);
