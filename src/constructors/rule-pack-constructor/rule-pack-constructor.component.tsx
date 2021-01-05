// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uidv4 } from "uuid";
import {
  ArrayField,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
// redux
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// custom components
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
import ActionButton from "../../components/action-button/action-button.component";
import RuleConstructor from "../rule-constructor/rule-constructor.component";
// utils
import { addLastEditedConstructorItemToLocalStorage } from "../../utils/last-edited-constructor-items-local-storage";
import {
  getLastEditedCreationMode,
  getLastExampleConstructorCode,
  setLastEditedCreationMode,
  setLastExampleConstructorCode,
} from "../../utils/local-storage/last-edited-creation-type";
// types
import { RulePackConstructorInputs } from "./rule-pack-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import {
  ConstructorJSONsTypes,
  UpdateRulePackJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";
import { ConstructorCreationMode } from "../common-types";
// icons
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiClose,
  mdiContentCopy,
  mdiPlus,
} from "@mdi/js";
// styles
import "./rule-pack-constructor.scss";
import useCreationMode from "../hooks/useCreationType";
import getConstructorSubmitButtonAndTitleText from "../utiils/get-constructor-submit-button-and-title-text";

const RulePackConstructor = ({
  rulePackJSON,
  updateRulePackJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  // defining creation type and dependent vars
  const { code } = useParams();
  const creationMode: ConstructorCreationMode = useCreationMode();
  const titleAndSubmitButtonText: string = getConstructorSubmitButtonAndTitleText(
    creationMode,
    ConstructorJSONsTypes.RULE_PACK,
    code
  );
  const lastEditedMode: ConstructorCreationMode | null = getLastEditedCreationMode(
    ConstructorJSONsTypes.RULE_PACK
  );
  // all rule-packs are used as select input values
  const [allRulePacks, setAllRulPacks] = useState([]);
  // server response messages
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | string>(null);
  // react-hook-form utilities
  const formMethods = useForm<RulePackConstructorInputs>({
    mode: "onSubmit",
  });
  const {
    register,
    getValues,
    control,
    setValue,
    reset,
    handleSubmit,
    watch,
  } = formMethods;
  // react-hook-form array utilities for rules
  const { fields, append, swap, remove } = useFieldArray<RuleConstructorInputs>(
    {
      control,
      name: "rules",
    }
  );
  // set valid value due to creation mode and relevant constructor state
  useEffect(() => {
    // fetching all rule-packs
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_API + "/rule-pack",
    })
      .then((res) => {
        setAllRulPacks(res.data);
      })
      .catch((e) => {
        console.error("Fetching rule-packs failed", e.message);
      });

    const fetchRulePack = async (code: string) => {
      return axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_API + "/rule-pack/" + code,
      })
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          console.error(
            "Fetching rule-pack failed. Rule-pack code: " + code,
            e.message
          );
          throw e;
        });
    };

    if (creationMode === ConstructorCreationMode.CREATE) {
      if (lastEditedMode === ConstructorCreationMode.CREATE) {
        reset(rulePackJSON);
      } else {
        reset(CONSTRUCTOR_JSONS_INITIAL_STATE.rulePack);
        setLastEditedCreationMode(
          ConstructorJSONsTypes.RULE_PACK,
          creationMode
        );
        updateRulePackJSON(getValues());
      }
    } else if (creationMode === ConstructorCreationMode.EDIT) {
      if (
        lastEditedMode === ConstructorCreationMode.EDIT &&
        code === rulePackJSON.code
      ) {
        reset(rulePackJSON);
      } else {
        (async () => {
          const res = await fetchRulePack(code);
          await reset({
            ...res,
            rulePacks: res.rulePacks
              ? res.rulePacks.map((rulePack: any) => rulePack.rulePackCode)
              : [],
            rules: res.rules
              ? res.rules.map((rule: RuleConstructorInputs) => {
                  return {
                    ...rule,
                    matchJumbledAndNested:
                      typeof rule.matchJumbledAndNested === "boolean"
                        ? // @ts-ignore
                          rule.matchJumbledAndNested.toString()
                        : "true",
                    basedOnTaskContext:
                      typeof rule.basedOnTaskContext === "boolean"
                        ? // @ts-ignore
                          rule.basedOnTaskContext.toString()
                        : "true",
                  };
                })
              : [],
          });
          setLastEditedCreationMode(
            ConstructorJSONsTypes.RULE_PACK,
            creationMode
          );
          updateRulePackJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.CREATE_BY_EXAMPLE) {
      if (
        lastEditedMode === ConstructorCreationMode.CREATE_BY_EXAMPLE &&
        getLastExampleConstructorCode(ConstructorJSONsTypes.RULE_PACK) === code
      ) {
        console.log("AAAAAAAAA");
        reset(rulePackJSON);
      } else {
        console.log(code);
        console.log(
          getLastExampleConstructorCode(ConstructorJSONsTypes.RULE_PACK)
        );
        (async () => {
          const res = await fetchRulePack(code);
          await reset({
            ...res,
            rulePacks: res.rulePacks
              ? res.rulePacks.map((rulePack: any) => rulePack.rulePackCode)
              : [],
            rules: res.rules
              ? res.rules.map((rule: RuleConstructorInputs) => {
                  return {
                    ...rule,
                    matchJumbledAndNested:
                      typeof rule.matchJumbledAndNested === "boolean"
                        ? // @ts-ignore
                          rule.matchJumbledAndNested.toString()
                        : "true",
                    basedOnTaskContext:
                      typeof rule.basedOnTaskContext === "boolean"
                        ? // @ts-ignore
                          rule.basedOnTaskContext.toString()
                        : "true",
                  };
                })
              : [],
          });
          setLastEditedCreationMode(
            ConstructorJSONsTypes.RULE_PACK,
            creationMode
          );
          setLastExampleConstructorCode(ConstructorJSONsTypes.RULE_PACK, code);
          updateRulePackJSON(getValues());
        })();
      }
    }
  }, []);

  const actionButtonsLeft: ActionButtonProps[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      action(index: number) {
        // append({
        //   ...getValues().rules[index],
        // });
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
        // if (index !== getValues().rules.length - 1) {
        //   swap(index, index + 1);
        // }
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

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "namespaceCode",
      label: "Namespace",
      type: "text",
      options: [{ label: "test_namespace_code", value: "test_namespace_code" }],
      defaultValue: "",
      isMulti: false,
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      defaultValue: "____test_namespace_code" + uidv4().slice(0, 5),
      disabled: creationMode === ConstructorCreationMode.EDIT,
      onChange: () => setUserCodeChange(true),
    },
    {
      name: "nameEn",
      label: "Название  En",
      type: "text",
      defaultValue: "",
    },
    {
      name: "nameRu",
      label: "Название Ru",
      type: "text",
      defaultValue: "",
    },
    {
      name: "rulePacks",
      label: "Добавить существующие пакеты",
      isMulti: true,
      options: allRulePacks.map((rulePack: any) => {
        return {
          value: rulePack.code,
          label: rulePack.code,
        };
      }),
    },
  ];

  const submitRulePack = (
    data: RulePackConstructorInputs,
    requestType: "post" | "patch"
  ) => {
    setSuccessMsg(null);
    setErrorMsg(null);
    // delete empty fields
    Object.keys(data).forEach((key: string) => {
      if (data[key as keyof RulePackConstructorInputs] === "") {
        delete data[key as keyof RulePackConstructorInputs];
      }
    });
    if (data.rulePacks) {
      // @ts-ignore
      data.rulePacks = data.rulePacks.split(",").map((code: string) => ({
        rulePackCode: code,
      }));
    }
    // convert string booleans ("true", "false") to booleans
    if (data.rules) {
      // @ts-ignore
      data.rules = data.rules.map((rule: RuleConstructorInputs) => {
        return {
          ...rule,
          matchJumbledAndNested: rule.matchJumbledAndNested === "true",
          basedOnTaskContext: rule.basedOnTaskContext === "true",
        };
      });
    }
    // make request
    axios({
      method: requestType,
      url: process.env.REACT_APP_SERVER_API + "/rule-pack",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
      data,
    })
      .then((res) => {
        setErrorMsg(null);
        setSuccessMsg("Успешно!");
        addLastEditedConstructorItemToLocalStorage(
          "last-edited-rule-packs",
          data.code
        );
      })
      .catch((e) => {
        console.error("Error after posting rule-pack", e.message);
        console.log(e.response);
        setSuccessMsg(null);
        setErrorMsg("Ошибка! Проверьте правильность введенных данных");
      });
  };

  // setup unique code
  const [userCodeChange, setUserCodeChange] = useState<boolean>(false);
  const nameEnChange = watch("nameEn");
  const namespaceChange = watch("namespaceCode");
  useEffect(() => {
    (async () => {
      if (
        creationMode !== ConstructorCreationMode.EDIT &&
        !userCodeChange &&
        namespaceChange &&
        rulePackJSON.code
      ) {
        await setValue("code", nameEnChange + "____" + namespaceChange);
        updateRulePackJSON(getValues());
      } else {
        if (
          namespaceChange &&
          !getValues().code.includes("____" + namespaceChange)
        ) {
          await setValue("code", getValues().code + "____" + namespaceChange);
          updateRulePackJSON(getValues());
        }
      }
    })();
  }, [nameEnChange, namespaceChange]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((data: RulePackConstructorInputs) => {
          submitRulePack(
            data,
            creationMode === ConstructorCreationMode.EDIT ? "patch" : "post"
          );
        })}
        className="rule-pack-constructor"
      >
        <h2>{titleAndSubmitButtonText}</h2>
        <ConstructorForm
          inputs={inputs}
          register={register}
          updateJSON={() => updateRulePackJSON(getValues())}
          constructorType={ConstructorJSONsTypes.RULE_PACK}
        />
        <h3>Правила:</h3>
        <div className="rule-pack-constructor__rules">
          {fields.map(
            (
              field: Partial<ArrayField<RuleConstructorInputs, "id">>,
              fieldIdx: number
            ) => {
              return (
                <div className="rule-pack-constructor__rule" key={fieldIdx}>
                  <b>{fieldIdx + 1}.</b>
                  {actionButtonsLeft.map(
                    (button: ActionButtonProps, buttonIdx: number) => {
                      return (
                        <ActionButton
                          key={buttonIdx}
                          mdiIconPath={button.mdiIconPath}
                          size={1.5}
                          action={() => {
                            button.action(fieldIdx);
                          }}
                          margin="0 1rem 0 0"
                        />
                      );
                    }
                  )}
                  <RuleConstructor
                    key={field.id}
                    index={fieldIdx}
                    defaultValue={fields[fieldIdx]}
                  />
                  {actionButtonsRight.map(
                    (button: ActionButtonProps, buttonIdx: number) => {
                      return (
                        <ActionButton
                          key={buttonIdx}
                          mdiIconPath={button.mdiIconPath}
                          size={2}
                          action={() => {
                            button.action(fieldIdx);
                          }}
                          margin="0"
                        />
                      );
                    }
                  )}
                </div>
              );
            }
          )}
          <div className="rule-pack-constructor__action-buttons">
            <button
              type="button"
              className="btn u-mr-sm"
              onClick={async () => {
                await append({
                  left: "",
                  right: "",
                  matchJumbledAndNested: "true",
                  basedOnTaskContext: "true",
                });
                updateRulePackJSON(getValues());
              }}
            >
              <Icon path={mdiPlus} size={1.2} />
              <span>правило</span>
            </button>
          </div>
        </div>
        {/*server response messages*/}
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}
        <button type="submit" className="btn u-mt-sm">
          {titleAndSubmitButtonText}
        </button>
      </form>
    </FormProvider>
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

export default connector(RulePackConstructor);
