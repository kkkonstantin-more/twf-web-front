// libs and hooks
import React from "react";
import { useForm } from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// components
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
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
import { Dispatch } from "react";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import { UpdateNamespaceJSONAction } from "../../redux/constructor-jsons/constructor-jsons.types";
// data
import {
  allowEditOptions,
  allowReadOptions,
} from "./namespace-constructor.data";
// mock data
import { usersDemoList } from "../../pages/constructor-menu-page/constructor-menu-page.component";
import { mockTaskSets } from "../task-set-constructor/task-set-constructor.mock-data";
import { mockNamespaces } from "./namespace-constructor.mock-data";
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

  // making these values dynamic with react-hook-form watch function
  // in order to render or not render dependent fields
  const allowReadValue: AllowReadValueOption = watch("allowRead");
  const allowEditValue: AllowEditValueOption = watch("allowEdit");

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "nameEn",
      label: "Имя en",
      type: "text",
    },
    {
      name: "nameRu",
      label: "Имя ru",
      type: "text",
    },
    {
      name: "code",
      label: "Код",
      type: "text",
    },
    {
      name: "allowRead",
      label: "Доступ к чтению",
      isMulti: false,
      options: allowReadOptions,
      defaultValue: namespaceToEdit?.allowRead || namespaceJSON.allowRead,
    },
    {
      name: "readGrantedUsers",
      label: "Пользователи с правом чтения",
      isMulti: true,
      options: usersDemoList,
      defaultValue:
        namespaceToEdit?.readGrantedUsers || namespaceJSON.readGrantedUsers,
      isRendered: !allowReadValue.value,
    },
    {
      name: "allowEdit",
      label: "Доступ к редактированию",
      isMulti: false,
      options: allowEditOptions,
      defaultValue: namespaceToEdit?.allowEdit || namespaceJSON.allowEdit,
    },
    {
      name: "editGrantedUsers",
      label: "Пользователи с правом редактирования",
      isMulti: true,
      options: usersDemoList,
      defaultValue:
        namespaceToEdit?.editGrantedUsers || namespaceJSON.editGrantedUsers,
      isRendered: !allowEditValue.value,
    },
    {
      name: "taskSetList",
      label: "Наборы задач",
      isMulti: true,
      options: Object.keys(mockTaskSets).map((key: string) => {
        return {
          label: mockTaskSets[key].nameRu,
          value: mockTaskSets[key].code,
        };
      }),
      defaultValue: namespaceToEdit?.taskSetList || namespaceJSON.taskSetList,
    },
  ];

  return (
    <div className="namespace-constructor u-container">
      <h1>Создать Namespace</h1>
      <ConstructorForm
        inputs={inputs}
        register={register}
        control={control}
        onBlur={() => {
          updateNamespaceJSON(getValues());
        }}
      />
      <button className="btn" onClick={() => console.log(getValues())}>
        Get values
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
