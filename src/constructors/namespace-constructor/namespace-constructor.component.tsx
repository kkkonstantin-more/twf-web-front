// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// custom hooks
import useCreationMode from "../hooks/useCreationType";
// components
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
import ServerResponseAlert from "../../components/server-response-alert/server-response-alert.component";
// redux
import { selectNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// types
import {
  NamespaceConstructorInputs,
  NamespaceGrantType,
} from "./namespace-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { ConstructorCreationMode } from "../common-types";
import { RootState } from "../../redux/root-reducer";
import {
  ConstructorJSONsTypes,
  UpdateNamespaceJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
// mock data
import { usersDemoList } from "../../pages/constructor-menu-page/constructor-menu-page.component";
// utils
import getConstructorSubmitButtonAndTitleText from "../utiils/get-constructor-submit-button-and-title-text";
import { getGrantTypeUserReadableDescription } from "./namespace-constructor.utils";
import NamespaceConstructorFormatter from "./namespace-constructor.formatter";
import { addLastEditedConstructorItemToLocalStorage } from "../../utils/last-edited-constructor-items-local-storage";
import NamespaceConstructorRequestHandler from "./namespace-constructor.requests-handler";
import {
  getLastEditedCreationMode,
  getLastExampleConstructorCode,
  setLastEditedCreationMode,
  setLastExampleConstructorCode,
} from "../../utils/local-storage/last-edited-creation-type";
// styles
import "./namespace-constructor.styles.scss";

const NamespaceConstructorComponent = ({
  namespaceJSON,
  updateNamespaceJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  // defining creation type and dependent vars
  const { code } = useParams();
  const creationMode: ConstructorCreationMode = useCreationMode();
  const titleAndSubmitButtonText: string = getConstructorSubmitButtonAndTitleText(
    creationMode,
    ConstructorJSONsTypes.NAMESPACE,
    code
  );
  const lastEditedMode: ConstructorCreationMode | null = getLastEditedCreationMode(
    ConstructorJSONsTypes.NAMESPACE
  );
  // server response messages
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | string>(null);
  // react-hook-form core functions
  const formMethods = useForm<NamespaceConstructorInputs>({
    mode: "onSubmit",
  });
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    watch,
    setValue,
  } = formMethods;

  // set initial values due to creation mode
  useEffect(() => {
    if (creationMode === ConstructorCreationMode.CREATE) {
      if (lastEditedMode === ConstructorCreationMode.CREATE) {
        reset(namespaceJSON);
      } else {
        (async () => {
          await reset(CONSTRUCTOR_JSONS_INITIAL_STATE.namespace);
          setLastEditedCreationMode(
            ConstructorJSONsTypes.NAMESPACE,
            creationMode
          );
          updateNamespaceJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.EDIT) {
      if (
        lastEditedMode === ConstructorCreationMode.EDIT &&
        code === namespaceJSON.code
      ) {
        reset(namespaceJSON);
      } else {
        (async () => {
          const res = await NamespaceConstructorRequestHandler.getOne(code);
          await reset(
            NamespaceConstructorFormatter.convertReceivedFormToConstructorInputs(
              res
            )
          );
          setLastEditedCreationMode(
            ConstructorJSONsTypes.NAMESPACE,
            creationMode
          );
          updateNamespaceJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.CREATE_BY_EXAMPLE) {
      if (
        lastEditedMode === ConstructorCreationMode.CREATE_BY_EXAMPLE &&
        getLastExampleConstructorCode(ConstructorJSONsTypes.NAMESPACE) === code
      ) {
        reset(namespaceJSON);
      } else {
        (async () => {
          const res = await NamespaceConstructorRequestHandler.getOne(code);
          await reset(
            NamespaceConstructorFormatter.convertReceivedFormToConstructorInputs(
              {
                ...res,
                code: res.code + "_new",
              }
            )
          );
          setLastEditedCreationMode(
            ConstructorJSONsTypes.NAMESPACE,
            creationMode
          );
          setLastExampleConstructorCode(ConstructorJSONsTypes.NAMESPACE, code);
          updateNamespaceJSON(getValues());
        })();
      }
    }
  }, []);
  // readGrantedUsers and writeGrantedUsers are dependent on this value
  const grantType: NamespaceGrantType = watch("grantType");
  // remove readGrantedUsers and/or writeGrantedUsers from form value when necessary
  useEffect(() => {
    (async () => {
      if (grantType === NamespaceGrantType.PUBLIC_READ_WRITE) {
        await setValue("readGrantedUsers", []);
        await setValue("writeGrantedUsers", []);
        updateNamespaceJSON(getValues());
      } else if (grantType === NamespaceGrantType.PUBLIC_READ_PRIVATE_WRITE) {
        await setValue("readGrantedUsers", []);
        updateNamespaceJSON(getValues());
      }
    })();
  }, [grantType]);

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "code",
      label: "Код",
      type: "text",
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "grantType",
      label: "Доступ к чтению",
      isMulti: false,
      options: [
        NamespaceGrantType.PUBLIC_READ_WRITE,
        NamespaceGrantType.PRIVATE_READ_WRITE,
        NamespaceGrantType.PUBLIC_READ_PRIVATE_WRITE,
      ].map((accessMode: NamespaceGrantType) => {
        return {
          label: getGrantTypeUserReadableDescription(accessMode),
          value: accessMode,
        };
      }),
    },
    {
      name: "readGrantedUsers",
      label: "Пользователи с правом чтения",
      isMulti: true,
      options: usersDemoList,
      isVisible: grantType === NamespaceGrantType.PRIVATE_READ_WRITE,
    },
    {
      name: "writeGrantedUsers",
      label: "Пользователи с правом редактирования",
      isMulti: true,
      options: usersDemoList,
      isVisible:
        grantType === NamespaceGrantType.PUBLIC_READ_PRIVATE_WRITE ||
        grantType === NamespaceGrantType.PRIVATE_READ_WRITE,
    },
  ];

  const submit = (
    data: NamespaceConstructorInputs,
    creationMode: ConstructorCreationMode
  ): void => {
    NamespaceConstructorRequestHandler.submitOne(
      creationMode === ConstructorCreationMode.EDIT ? "patch" : "post",
      NamespaceConstructorFormatter.convertConstructorInputsToSendForm(data)
    )
      .then(() => {
        setErrorMsg(null);
        setSuccessMsg(
          creationMode === ConstructorCreationMode.EDIT
            ? "Namespace успешно изменен!"
            : "Namespace успешно создан!"
        );
        addLastEditedConstructorItemToLocalStorage(
          "last-edited-namespaces",
          data.code
        );
      })
      .catch(() => {
        setSuccessMsg(null);
        setErrorMsg("Произошла ошибка!");
      });
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="namespace-constructor"
        onSubmit={handleSubmit((data: NamespaceConstructorInputs) => {
          submit(data, creationMode);
        })}
      >
        <h1>Создать Namespace</h1>
        <ConstructorForm
          inputs={inputs}
          register={register}
          // @ts-ignore
          updateJSON={() => updateNamespaceJSON(getValues())}
          constructorType={ConstructorJSONsTypes.NAMESPACE}
        />
        <ServerResponseAlert errorMsg={errorMsg} successMsg={successMsg} />
        <button
          type="button"
          className="btn"
          onClick={() => console.log(getValues())}
        >
          Get values
        </button>
        <button type="submit" className="btn">
          {titleAndSubmitButtonText}
        </button>
      </form>
    </FormProvider>
  );
};

// connecting redux props
const mapState = createStructuredSelector<
  RootState,
  { namespaceJSON: NamespaceConstructorInputs }
>({
  namespaceJSON: selectNamespaceJSON,
});

const mapDispatch = (dispatch: Dispatch<UpdateNamespaceJSONAction>) => ({
  updateNamespaceJSON: (namespaceJSON: NamespaceConstructorInputs) =>
    dispatch(updateNamespaceJSON(namespaceJSON)),
});

const connector = connect(mapState, mapDispatch);

export default connector(NamespaceConstructorComponent);
