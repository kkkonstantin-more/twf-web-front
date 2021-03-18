// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uidv4 } from "uuid";
import {
  ArrayField,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
// custom hooks
import useCreationMode from "../hooks/useCreationType";
// redux
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateRulePackJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// lib components
import { ClipLoader } from "react-spinners";
// custom components
import ActionButton from "../../components/action-button/action-button.component";
import RuleConstructor from "../rule-constructor/rule-constructor.component";
// utils
import {
  getLastEditedCreationMode,
  getLastExampleConstructorCode,
  setLastEditedCreationMode,
  setLastExampleConstructorCode,
} from "../../utils/local-storage/last-edited-creation-type";
import getConstructorSubmitButtonAndTitleText from "../utiils/get-constructor-submit-button-and-title-text";
import RulePackConstructorRequestsHandler from "./rule-pack-constructor.requests-handler";
import NamespaceConstructorRequestHandler from "../namespace-constructor/namespace-constructor.requests-handler";
import RulePackConstructorFormatter from "./rule-pack-constructor.formatter";
// types
import {
  RulePackConstructorInputs,
  RulePackReceivedForm,
} from "./rule-pack-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import {
  ConstructorJSONType,
  UpdateRulePackJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";
import { ConstructorCreationMode } from "../common-types";
import { NamespaceReceivedForm } from "../namespace-constructor/namespace-constructor.types";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
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
import {
  ConstructorHistoryItem,
  RedoTaskSetHistoryAction,
  UndoTaskSetHistoryAction,
} from "../../redux/constructor-history/constructor-history.types";
import { selectCurrentRulePackHistoryChange } from "../../redux/constructor-history/constructor-history.selectors";
import {
  redoHistory,
  undoHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import ConstructorUndoRedoPanel from "../../components/constructor-undo-redo-panel/constructor-undo-redo-panel.component";
import ConstructorFormAlt from "../../components/constructor-form/constructor-form";
import { ConstructorFormInput } from "../../components/constructor-form/constructor-form.types";

const RulePackConstructor = ({
  rulePackJSON,
  updateRulePackJSON,
  currentHistoryChange,
  undo,
  redo,
}: ConnectedProps<typeof connector>): JSX.Element => {
  // defining creation type and dependent vars
  const { code } = useParams();
  const creationMode: ConstructorCreationMode = useCreationMode();
  const titleAndSubmitButtonText: string = getConstructorSubmitButtonAndTitleText(
    creationMode,
    ConstructorJSONType.RULE_PACK,
    code
  );
  const lastEditedMode: ConstructorCreationMode | null = getLastEditedCreationMode(
    ConstructorJSONType.RULE_PACK
  );
  // all rule-packs are used as select input values
  const [allRulePacks, setAllRulPacks] = useState<string[]>([]);
  const [allNamespaces, setAllNamespaces] = useState<string[]>([]);
  // server response messages
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | string>(null);
  // react-hook-form utilities
  const formMethods = useForm<RulePackConstructorInputs>({
    mode: "onSubmit",
    shouldUnregister: false,
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
  // show spinner while fetching
  const [showSpinner, setShowSpinner] = useState<boolean>(
    creationMode !== ConstructorCreationMode.CREATE
  );
  // set valid values due to creation mode and relevant constructor state
  useEffect(() => {
    // get all rulePacks for links
    NamespaceConstructorRequestHandler.getAll().then(
      (res: NamespaceReceivedForm[]) =>
        setAllNamespaces(res.map((ns: NamespaceReceivedForm) => ns.code))
    );
    RulePackConstructorRequestsHandler.getAll().then(
      (res: RulePackReceivedForm[]) =>
        setAllRulPacks(res.map((rp: RulePackReceivedForm) => rp.code))
    );
    if (creationMode === ConstructorCreationMode.CREATE) {
      if (lastEditedMode === ConstructorCreationMode.CREATE) {
        reset(rulePackJSON);
      } else {
        (async () => {
          await reset(CONSTRUCTOR_JSONS_INITIAL_STATE.rulePack);
          setLastEditedCreationMode(
            ConstructorJSONType.RULE_PACK,
            creationMode
          );
          updateRulePackJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.EDIT) {
      if (
        lastEditedMode === ConstructorCreationMode.EDIT &&
        code === rulePackJSON.code
      ) {
        reset(rulePackJSON);
        setShowSpinner(false);
      } else {
        (async () => {
          await reset(
            RulePackConstructorFormatter.convertReceivedFormToConstructorInputs(
              await RulePackConstructorRequestsHandler.getOne(code)
            )
          );
          setLastEditedCreationMode(
            ConstructorJSONType.RULE_PACK,
            creationMode
          );
          updateRulePackJSON(getValues());
          setShowSpinner(false);
        })();
      }
    } else if (creationMode === ConstructorCreationMode.CREATE_BY_EXAMPLE) {
      if (
        lastEditedMode === ConstructorCreationMode.CREATE_BY_EXAMPLE &&
        getLastExampleConstructorCode(ConstructorJSONType.RULE_PACK) === code
      ) {
        reset(rulePackJSON);
        setShowSpinner(false);
      } else {
        (async () => {
          const rulePackInputs = RulePackConstructorFormatter.convertReceivedFormToConstructorInputs(
            await RulePackConstructorRequestsHandler.getOne(code)
          );
          await reset({
            ...rulePackInputs,
            code: rulePackInputs.code + "_new",
          });
          setLastEditedCreationMode(
            ConstructorJSONType.RULE_PACK,
            creationMode
          );
          setLastExampleConstructorCode(ConstructorJSONType.RULE_PACK, code);
          updateRulePackJSON(getValues());
          setShowSpinner(false);
        })();
      }
    }
  }, []);

  const [undoOrRedoIsTriggered, setUndoOrRedoIsTriggered] = useState(false);

  useEffect(() => {
    if (undoOrRedoIsTriggered) {
      if (currentHistoryChange?.type === "ONE_LINE_CHANGE") {
        setValue(
          currentHistoryChange.item.propertyPath,
          currentHistoryChange.item.value
        );
        updateRulePackJSON(getValues());
      } else if (currentHistoryChange?.type === "MULTIPLE_LINES_CHANGE") {
        reset(currentHistoryChange.item);
        // @ts-ignore
        updateRulePackJSON(currentHistoryChange?.item);
      }
      setUndoOrRedoIsTriggered(false);
    }
  }, [undoOrRedoIsTriggered]);

  const actionButtons: ActionButtonProps[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      async action(index: number) {
        // @ts-ignore
        await append(getValues().rules[index]);
        updateRulePackJSON(getValues());
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      async action(index: number) {
        if (index !== 0) {
          await swap(index, index - 1);
          updateRulePackJSON(getValues());
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      async action(index: number) {
        // @ts-ignore
        if (index !== getValues().rules.length - 1) {
          await swap(index, index + 1);
          updateRulePackJSON(getValues());
        }
      },
    },
    {
      mdiIconPath: mdiClose,
      size: 2,
      async action(index: number) {
        if (window.confirm(`Вы точно хотите удалить правило ${index + 1}?`)) {
          await remove(index);
          updateRulePackJSON(getValues());
        }
      },
    },
  ];

  const altInputs: ConstructorFormInput[] = [
    {
      name: "namespaceCode",
      label: "Namespace",
      options: allNamespaces.map((ns: string) => ({ label: ns, value: ns })),
      isMulti: false,
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "nameEn",
      label: "Название  En",
      type: "text",
    },
    {
      name: "nameRu",
      label: "Название Ru",
      type: "text",
    },
    {
      name: "rulePacks",
      label: "Добавить существующие пакеты",
      isMulti: true,
      options: allRulePacks.map((rp: string) => ({ label: rp, value: rp })),
    },
  ];

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "namespaceCode",
      label: "Namespace",
      type: "text",
      options: allNamespaces.map((ns: string) => ({ label: ns, value: ns })),
      value: watch("namespaceCode"),
      onChange: (value: string | string[]) => setValue("namespaceCode", value),
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
      constructorType: ConstructorJSONType.RULE_PACK,
    },
    {
      name: "nameEn",
      label: "Название  En",
      type: "text",
      defaultValue: "",
      constructorType: ConstructorJSONType.RULE_PACK,
    },
    {
      name: "nameRu",
      label: "Название Ru",
      type: "text",
      defaultValue: "",
      constructorType: ConstructorJSONType.RULE_PACK,
    },
    {
      name: "rulePacks",
      label: "Добавить существующие пакеты",
      isMulti: true,
      options: allRulePacks.map((rp: string) => ({ label: rp, value: rp })),
      value: watch("rulePacks"),
      onChange: (value: string | string[]) => setValue("rulePacks", value),
    },
  ];

  const submit = (data: RulePackConstructorInputs) => {
    RulePackConstructorRequestsHandler.submitOne(
      creationMode === ConstructorCreationMode.EDIT ? "patch" : "post",
      RulePackConstructorFormatter.convertConstructorInputsToSendForm(data)
    )
      .then(() => {
        setErrorMsg(null);
        setSuccessMsg("Успех!");
      })
      .catch(() => {
        setSuccessMsg(null);
        setErrorMsg("Провал");
      });
    // setSuccessMsg(null);
    // setErrorMsg(null);
    // // delete empty fields
    // Object.keys(data).forEach((key: string) => {
    //   if (data[key as keyof RulePackConstructorInputs] === "") {
    //     delete data[key as keyof RulePackConstructorInputs];
    //   }
    // });
    // if (data.rulePacks) {
    //   // @ts-ignore
    //   data.rulePacks = data.rulePacks.split(",").map((code: string) => ({
    //     rulePackCode: code,
    //   }));
    // }
    // // convert string booleans ("true", "false") to booleans
    // if (data.rules) {
    //   // @ts-ignore
    //   data.rules = data.rules.map((rule: RuleConstructorInputs) => {
    //     return {
    //       ...rule,
    //       matchJumbledAndNested: rule.matchJumbledAndNested === "true",
    //       basedOnTaskContext: rule.basedOnTaskContext === "true",
    //     };
    //   });
    // }
    // // make request
    // axios({
    //   method: requestType,
    //   url: process.env.REACT_APP_SERVER_API + "/rule-pack",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.token,
    //   },
    //   data,
    // })
    //   .then((res) => {
    //     setErrorMsg(null);
    //     setSuccessMsg("Успешно!");
    //     addLastEditedConstructorItemToLocalStorage(
    //       "last-edited-rule-packs",
    //       data.code
    //     );
    //   })
    //   .catch((e) => {
    //     console.error("Error after posting rule-pack", e.message);
    //     console.log(e.response);
    //     setSuccessMsg(null);
    //     setErrorMsg("Ошибка! Проверьте правильность введенных данных");
    //   });
  };

  // setup unique code creation
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
          getValues().code &&
          !getValues().code.includes("____" + namespaceChange)
        ) {
          await setValue("code", getValues().code + "____" + namespaceChange);
          updateRulePackJSON(getValues());
        }
      }
    })();
  }, [nameEnChange, namespaceChange]);

  if (showSpinner) {
    return (
      <div style={{ margin: "2rem" }}>
        <ClipLoader loading={showSpinner} />
      </div>
    );
  } else {
    return (
      <FormProvider {...formMethods}>
        <div style={{ margin: "2rem" }}>
          <ConstructorUndoRedoPanel
            undo={() => {
              undo();
              setUndoOrRedoIsTriggered(true);
            }}
            redo={() => {
              redo();
              setUndoOrRedoIsTriggered(true);
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit((data: RulePackConstructorInputs) => {
            submit(data);
          })}
          onBlur={() => {
            updateRulePackJSON(getValues());
          }}
          className="rule-pack-constructor"
        >
          <h2>{titleAndSubmitButtonText}</h2>
          <ConstructorFormAlt
            inputs={altInputs}
            constructorType={ConstructorJSONType.RULE_PACK}
          />
          {/*<ConstructorForm*/}
          {/*  inputs={inputs}*/}
          {/*  register={register}*/}
          {/*  updateJSON={() => updateRulePackJSON(getValues())}*/}
          {/*  constructorType={ConstructorJSONType.RULE_PACK}*/}
          {/*/>*/}
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
                    <div className="rule-pack-constructor__action-buttons">
                      {actionButtons.map(
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
                    </div>
                    <RuleConstructor
                      key={field.id}
                      index={fieldIdx}
                      defaultValue={fields[fieldIdx]}
                    />
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
                    left: {
                      format: MathInputFormat.TEX,
                      expression: "",
                    },
                    right: {
                      format: MathInputFormat.TEX,
                      expression: "",
                    },
                    basedOnTaskContext: true,
                    matchJumbledAndNested: true,
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
  }
};

// connecting redux props
const mapState = createStructuredSelector<
  RootState,
  {
    rulePackJSON: RulePackConstructorInputs;
    currentHistoryChange: ConstructorHistoryItem | undefined;
  }
>({
  rulePackJSON: selectRulePackJSON,
  currentHistoryChange: selectCurrentRulePackHistoryChange,
});

const mapDispatch = (
  dispatch: Dispatch<
    | UpdateRulePackJSONAction
    | RedoTaskSetHistoryAction
    | UndoTaskSetHistoryAction
  >
) => ({
  updateRulePackJSON: (rulePackJSON: RulePackConstructorInputs) =>
    dispatch(updateRulePackJSON(rulePackJSON)),
  undo: () => dispatch(undoHistory(ConstructorJSONType.RULE_PACK)),
  redo: () => dispatch(redoHistory(ConstructorJSONType.RULE_PACK)),
});

const connector = connect(mapState, mapDispatch);

export default connector(RulePackConstructor);
