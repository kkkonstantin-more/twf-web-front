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
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// types
import { NamespaceConstructorInputs } from "./namespace-constructor.types";
import { Dispatch } from "react";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import { UpdateNamespaceJSONAction } from "../../redux/constructor-jsons/constructor-jsons.types";
import { SelectValue } from "antd/es/select";
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

  const defaultValues: NamespaceConstructorInputs =
    namespaceToEdit &&
    namespaceJSON === CONSTRUCTOR_JSONS_INITIAL_STATE.namespace
      ? namespaceToEdit
      : namespaceJSON;

  updateNamespaceJSON(defaultValues);

  const { register, getValues, setValue, watch } = useForm<
    NamespaceConstructorInputs
  >({
    mode: "onSubmit",
    defaultValues,
  });

  /* making these values dynamic with react-hook-form's watch function
  in order to conditionally render dependent fields:
  readGrantedUsers, editGrantedUsers */
  const allowReadValue: SelectValue = watch("allowRead");
  const allowEditValue: SelectValue = watch("allowEdit");

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
      defaultValue: defaultValues.allowRead,
    },
    {
      name: "readGrantedUsers",
      label: "Пользователи с правом чтения",
      isMulti: true,
      options: usersDemoList,
      defaultValue: defaultValues.readGrantedUsers,
      isRendered: allowReadValue !== "true",
    },
    {
      name: "allowEdit",
      label: "Доступ к редактированию",
      isMulti: false,
      options: allowEditOptions,
      defaultValue: defaultValues.allowEdit,
    },
    {
      name: "editGrantedUsers",
      label: "Пользователи с правом редактирования",
      isMulti: true,
      options: usersDemoList,
      defaultValue: defaultValues.editGrantedUsers,
      isRendered: allowEditValue !== "true",
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
      defaultValue: defaultValues.taskSetList,
    },
  ];

  return (
    <div className="namespace-constructor">
      <h1>Создать Namespace</h1>
      <ConstructorForm
        inputs={inputs}
        register={register}
        setValue={setValue}
        updateJSON={() => updateNamespaceJSON(getValues())}
      />
      <button className="btn" onClick={() => console.log(getValues())}>
        Get values
      </button>
    </div>
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
