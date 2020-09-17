import React, { useEffect, useState } from "react";
import Select from "react-select";

import "./rule-pack-constructor.scss";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiClose,
  mdiContentCopy,
  mdiPlus,
} from "@mdi/js";
import MixedInput from "../mixed-input/mixed-input";
import useMergedRef from "@react-hook/merged-ref";
import { ActionButton } from "../custom-forms/level-form";
import AppModal from "../app-modal/app-modal";
import {
  AllItemsList,
  demoList,
} from "../../pages/constructor-menu-page/constructor-menu-page";

interface RuleFormProps {
  index: number;
  defaultValue?: any;
}

const RuleForm: React.FC<RuleFormProps> = ({
  index,
  defaultValue,
}: RuleFormProps) => {
  const { register } = useFormContext();
  const [mixedInputWidth, setMixedInputWidth] = useState<number>(0);
  const leftInputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const rightInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [basedOnTaskContext, setBasedOnTaskContext] = useState<{
    label: string;
    value: boolean;
  }>(
    defaultValue.basedOnTaskContext !== undefined
      ? {
          label: defaultValue.basedOnTaskContext ? "да" : "нет",
          value: defaultValue.basedOnTaskContext,
        }
      : {
          label: "да",
          value: true,
        }
  );

  const [matchJumbledAndNested, setMatchJumbledAndNested] = useState<{
    label: string;
    value: boolean;
  }>(
    defaultValue.basedOnTaskContext !== undefined
      ? {
          label: defaultValue.matchJumbledAndNested ? "да" : "нет",
          value: defaultValue.matchJumbledAndNested,
        }
      : {
          label: "да",
          value: true,
        }
  );

  useEffect(() => {
    if (leftInputRef.current) {
      const width = window.getComputedStyle(leftInputRef.current, null);
      setMixedInputWidth(
        parseFloat(width.getPropertyValue("width").slice(0, -2))
      );
    }
  }, [leftInputRef]);

  return (
    <div className="rule-form">
      <div className="form-group">
        <label>Левая часть</label>
        <input
          type="text"
          name={`rules[${index}].left`}
          ref={useMergedRef(register(), leftInputRef)}
          defaultValue={defaultValue.left}
        />
        <MixedInput
          value={defaultValue.left}
          inputRef={leftInputRef}
          width={mixedInputWidth + "px"}
        />
      </div>
      <div className="form-group">
        <label>Правая часть</label>
        <input
          type="text"
          name={`rules[${index}].right`}
          ref={useMergedRef(register(), rightInputRef)}
          defaultValue={defaultValue.left}
        />
        <MixedInput
          value={defaultValue.right}
          inputRef={rightInputRef}
          width={mixedInputWidth + "px"}
        />
      </div>
      <div className="form-group">
        <label>Based on task context</label>
        <Select
          value={basedOnTaskContext}
          name="basedOnTaskContext"
          options={[
            { value: true, label: "да" },
            { value: false, label: "нет" },
          ]}
          onChange={() => {
            setBasedOnTaskContext({
              value: !basedOnTaskContext.value,
              label: basedOnTaskContext.label === "да" ? "нет" : "да",
            });
          }}
        />
      </div>
      <div className="form-group">
        <label>Based on task context</label>
        <Select
          value={matchJumbledAndNested}
          name="matchJumbledAndNested"
          options={[
            { value: true, label: "да" },
            { value: false, label: "нет" },
          ]}
          onChange={() => {
            setMatchJumbledAndNested({
              value: !matchJumbledAndNested.value,
              label: matchJumbledAndNested.label === "да" ? "нет" : "да",
            });
          }}
        />
      </div>
    </div>
  );
};

const RulePackConstructor: React.FC = () => {
  const methods = useForm();
  const { register, getValues, control } = methods;
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "rules", // unique name for your Field Array
    }
  );

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
    <FormProvider {...methods}>
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
            options={demoList.map((item) => {
              return {
                label: item,
                value: item,
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
                <RuleForm key={field.id} index={i} defaultValue={fields[i]} />
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
