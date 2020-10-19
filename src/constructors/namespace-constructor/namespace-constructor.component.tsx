// libs and hooks
import React, { Dispatch, useState } from "react";
import { useForm, Controller } from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// components
import Select from "react-select";
import ConstructorInput from "../../components/constructor-input/constructor-input.component";
// redux
import { selectNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
// types
import {
  AllowEditValueOption,
  AllowReadValueOption,
  NamespaceConstructorInputs,
} from "./namespace-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { SelectInput } from "../../types/react-select";
import { RootState } from "../../redux/root-reducer";
import { UpdateNamespaceJSONAction } from "../../redux/constructor-jsons/constructor-jsons.types";
// data
import {
  allowEditOptions,
  allowReadOptions,
} from "./namespace-constructor.data";
import { usersDemoList } from "../../pages/constructor-menu-page/constructor-menu-page.component";
import { mockTaskSets } from "../task-set-constructor/task-set-constructor.mock-data";
import { mockNamespaces } from "./namespace-constructor.mock-data";
// utils
import { isSelectInput } from "../utils";
// styles
import "./namespace-constructor.styles.scss";

const NamespaceConstructorComponent = ({
  namespaceJSON,
  updateNamespaceJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  const namespaceToEdit = useMockConstructorToEdit<NamespaceConstructorInputs>(
    mockNamespaces
  );

  if (namespaceToEdit) {
    updateNamespaceJSON(namespaceToEdit);
  }

  const { register, getValues, control, watch } = useForm<
    NamespaceConstructorInputs
  >({
    mode: "onSubmit",
    defaultValues: namespaceToEdit ? namespaceToEdit : namespaceJSON,
  });

  const allowReadValue: AllowReadValueOption = watch(
    "allowRead",
    allowReadOptions[0]
  );
  const allowEditValue: AllowEditValueOption = watch(
    "allowEdit",
    allowEditOptions[1]
  );

  const [inputs] = useState<(ConstructorInputProps | SelectInput)[]>([
    {
      name: "nameEn",
      label: "Имя en",
      type: "text",
      register,
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
    {
      name: "nameRu",
      label: "Имя ru",
      type: "text",
      register,
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      register,
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
    {
      name: "allowRead",
      label: "Доступ к чтению",
      isMulti: false,
      register,
      options: allowReadOptions,
      defaultValue: namespaceToEdit?.allowRead || allowReadOptions[0],
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
    {
      name: "readGrantedUsers",
      label: "Пользователи с правом чтения",
      isMulti: true,
      register,
      options: usersDemoList,
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
      isRendered: !allowEditValue?.value,
    },
    {
      name: "allowEdit",
      label: "Доступ к редактированию",
      isMulti: false,
      register,
      options: allowEditOptions,
      defaultValue: namespaceToEdit?.allowEdit || allowEditOptions[1],
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
    {
      name: "editGrantedUsers",
      label: "Пользователи с правом редактирования",
      isMulti: true,
      register,
      options: usersDemoList,
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
      isRendered: !allowReadValue?.value,
    },
    {
      name: "taskSetList",
      label: "Наборы задач",
      isMulti: true,
      register,
      options: Object.keys(mockTaskSets).map((key: string) => {
        return {
          label: mockTaskSets[key].nameRu,
          value: mockTaskSets[key].code,
        };
      }),
      onBlur: (): void => {
        updateNamespaceJSON(getValues());
      },
    },
  ]);

  return (
    <div className="namespace-constructor u-container">
      <h1>Создать Namespace</h1>
      {inputs.map(
        (input: ConstructorInputProps | SelectInput): JSX.Element => {
          const { name, label } = input;
          if (isSelectInput(input)) {
            const SelectElement: JSX.Element = (
              <>
                <label>{label}</label>
                <Controller as={Select} control={control} {...input} />
              </>
            );
            if (name === "readGrantedUsers") {
              return (
                <div key={name}>{!allowReadValue?.value && SelectElement}</div>
              );
            } else if (name === "editGrantedUsers") {
              return (
                <div key={name}>{!allowEditValue?.value && SelectElement}</div>
              );
            } else {
              return <div key={name}>{SelectElement}</div>;
            }
          } else {
            return <ConstructorInput key={name} {...input} />;
          }
        }
      )}
      <button className="btn" onClick={() => console.log(getValues())}>
        get values
      </button>
    </div>
  );
};

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
