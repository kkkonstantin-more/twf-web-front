// libs and hooks
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// components
import Select from "react-select";
// types
import {
  AllowEditValueOption,
  AllowReadValueOption,
  NamespaceConstructorInputs,
  NamespaceConstructorMapDispatch,
  NamespaceConstructorMapState,
  NamespaceConstructorProps,
} from "./namespace-constructor.types";
// data
import {
  allowEditOptions,
  allowReadOptions,
} from "./namespace-constructor.data";
import { usersDemoList } from "../../pages/constructor-menu-page/constructor-menu-page.component";
import { mockTaskSets } from "../task-set-constructor/task-set-constructor.mock-data";
// styles
import "./namespace-constructor.styles.scss";
import { mockNamespaces } from "./namespace-constructor.mock-data";

import { createStructuredSelector } from "reselect";
import { selectNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateNamespaceJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, DispatchProp, MapDispatchToProps } from "react-redux";

const NamespaceConstructorComponent = ({
  updateNamespaceJSON,
  namespaceJSON,
}: NamespaceConstructorProps): JSX.Element => {
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

  return (
    <div className="namespace-constructor u-container">
      <h1>Создать Namespace</h1>
      <div className="form-group">
        <label>Имя en</label>
        <input
          name="nameEn"
          type="text"
          className="form-control"
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      <div className="form-group">
        <label>Имя ru</label>
        <input
          name="nameRu"
          type="text"
          className="form-control"
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      <div className="form-group">
        <label>Код</label>
        <input
          name="code"
          type="text"
          className="form-control"
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      <div className="form-group">
        <label>Доступ к чтению</label>
        <Controller
          as={Select}
          control={control}
          defaultValue={namespaceToEdit?.allowRead || allowReadOptions[0]}
          name="allowRead"
          options={allowReadOptions}
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      {allowReadValue && !allowReadValue.value && (
        <div className="form-group">
          <label>Ползователи с правом чтения</label>
          <Controller
            as={Select}
            control={control}
            name="readGrantedUsers"
            isMulti={true}
            options={usersDemoList}
            ref={register}
            onBlur={() => {
              updateNamespaceJSON(getValues());
            }}
          />
        </div>
      )}
      <div className="form-group">
        <label>Доступ к редактированию</label>
        <Controller
          as={Select}
          control={control}
          name="allowEdit"
          defaultValue={namespaceToEdit?.allowEdit || allowEditOptions[1]}
          options={allowEditOptions}
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      {allowEditValue && !allowEditValue.value && (
        <div className="form-group">
          <label>Пользователи с правом редактирования</label>
          <Controller
            as={Select}
            control={control}
            name="editGrantedUsers"
            isMulti={true}
            options={usersDemoList}
            ref={register}
            onBlur={() => {
              updateNamespaceJSON(getValues());
            }}
          />
        </div>
      )}
      <div className="form-group">
        <label>Наборы задач</label>
        <Controller
          as={Select}
          control={control}
          name="taskSetList"
          isMulti={true}
          options={Object.keys(mockTaskSets).map((key: string) => {
            return {
              label: mockTaskSets[key].nameRu,
              value: mockTaskSets[key].code,
            };
          })}
          ref={register}
          onBlur={() => {
            updateNamespaceJSON(getValues());
          }}
        />
      </div>
      <button className="btn" onClick={() => console.log(getValues())}>
        get values
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  namespaceJSON: selectNamespaceJSON,
});

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => ({
  updateNamespaceJSON: (namespaceJSON: NamespaceConstructorInputs) => {
    return dispatch(updateNamespaceJSON(namespaceJSON));
  },
});

export default connect<
  NamespaceConstructorMapState,
  NamespaceConstructorMapDispatch
>(
  mapStateToProps,
  mapDispatchToProps
)(NamespaceConstructorComponent);
