// libs and hooks
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// lib components
import Select from "react-select";
// custom components
import ActionButton from "../../copmonents/action-button/action-button.component";
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

const RulePackConstructor = (): JSX.Element => {
  const rulePackToEdit = useMockConstructorToEdit<RulePackConstructorInputs>(
    mockRulePacks
  );

  const useFormMethods = useForm<RulePackConstructorInputs>({
    defaultValues: rulePackToEdit,
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
      action(index) {
        if (window.confirm(`Вы точно хотите удалить правило ${index + 1}?`)) {
          remove(index);
        }
      },
    },
  ];

  return (
    <FormProvider {...useFormMethods}>
      <div className="rule-pack-constructor">
        <h2>Создать RulePack</h2>
        <div className="form-group">
          <label>Название En</label>
          <input
            name="nameEn"
            type="text"
            className="form-control"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label>Название Ru</label>
          <input
            name="nameRu"
            type="text"
            className="form-control"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label>Добавить существующие пакеты</label>
          <Select
            name="rulePacks"
            placeholder=""
            isMulti
            options={Object.keys(mockRulePacks).map((key: string) => {
              return {
                value: key,
                label: mockRulePacks[key].nameRu,
              };
            })}
          />
        </div>
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

export default RulePackConstructor;
