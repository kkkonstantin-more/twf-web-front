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
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
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
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";

const RulePackConstructor = ({
  rulePackJSON,
  updateRulePackJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  const rulePackToEdit = useMockConstructorToEdit<RulePackConstructorInputs>(
    mockRulePacks
  );

  const defaultValues: RulePackConstructorInputs =
    rulePackToEdit && rulePackJSON === CONSTRUCTOR_JSONS_INITIAL_STATE.rulePack
      ? rulePackToEdit
      : rulePackJSON;

  updateRulePackJSON(defaultValues);

  const useFormMethods = useForm<RulePackConstructorInputs>({
    mode: "onSubmit",
    defaultValues,
  });
  const { register, getValues, control } = useFormMethods;

  const { fields, append, swap, remove } = useFieldArray<RuleConstructorInputs>(
    {
      control,
      name: "rules",
    }
  );

  const actionButtonsLeft: ActionButtonProps[] = [
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

  const actionButtonsRight: ActionButtonProps[] = [
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

  // const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
  //   {
  //     name: "nameEn",
  //     label: "Название  En",
  //     type: "text",
  //   },
  //   {
  //     name: "nameRu",
  //     label: "Название Ru",
  //     type: "text",
  //   },
  //   {
  //     name: "rulePacks",
  //     label: "Добавить существующие пакеты",
  //     isMulti: true,
  //     options: Object.keys(mockRulePacks).map((key: string) => {
  //       return {
  //         value: key,
  //         label: mockRulePacks[key].nameRu,
  //       };
  //     }),
  //     defaultValue: rulePackToEdit?.rulePacks || rulePackJSON.rulePacks,
  //   },
  // ];

  return (
    <FormProvider {...useFormMethods}>
      <div className="rule-pack-constructor">
        <h2>Создать RulePack</h2>
        {/*<ConstructorForm*/}
        {/*  inputs={inputs}*/}
        {/*  register={register}*/}
        {/*  control={control}*/}
        {/*  onBlur={() => {*/}
        {/*    updateRulePackJSON(getValues());*/}
        {/*  }}*/}
        {/*/>*/}
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
                append({
                  right: "",
                  left: "",
                  matchJumbledAndNested: {
                    value: true,
                    label: "да",
                  },
                  basedOnTaskContext: {
                    value: true,
                    label: "да",
                  },
                });
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
