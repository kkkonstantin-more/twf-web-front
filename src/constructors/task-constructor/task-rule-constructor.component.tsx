// libs and hooks
import React from "react";
// custom components
import ConstructorForm from "../../components/constructor-form/constructor-form";
// types
import { TaskRuleConstructorProps } from "./task-rule-constructor.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { ConstructorFormInput } from "../../components/constructor-form/constructor-form.types";
// styles
import "../rule-constructor/rule-constructor.styles.scss";

const TaskRuleConstructor = ({ index, taskIndex }: TaskRuleConstructorProps): JSX.Element => {
    const inputs: ConstructorFormInput[] = [
        {
            name: `tasks[${taskIndex}].rules[${index}].nameEn`,
            label: "Название En",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].nameRu`,
            label: "Название Ru",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].code`,
            label: "Код",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].descriptionShortRu`,
            label: "Краткое описание Ru",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].descriptionShortEn`,
            label: "Краткое описание En",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].descriptionRu`,
            label: "Описание Ru",
            type: "text",
            isTextArea: true,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].descriptionEn`,
            label: "Описание En",
            type: "text",
            isTextArea: true,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].left`,
            label: "Левая часть",
            type: "text",
            isExpressionInput: true,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].right`,
            label: "Правая часть",
            type: "text",
            isExpressionInput: true,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].priority`,
            label: "Приоритет",
            type: "number",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].normalizationType`,
            label: "Тип нормализации",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].weight`,
            label: "Вес",
            type: "text",
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].isExtending`,
            label: "isExtending",
            options: [
                { value: "true", label: "да" },
                { value: "false", label: "нет" },
            ],
            isMulti: false,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].simpleAdditional`,
            label: "simpleAdditional",
            options: [
                { value: "true", label: "да" },
                { value: "false", label: "нет" },
            ],
            isMulti: false,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].basedOnTaskContext`,
            label: "Based on task context",
            options: [
                { value: "true", label: "да" },
                { value: "false", label: "нет" },
            ],
            isMulti: false,
        },
        {
            name: `tasks[${taskIndex}].rules[${index}].matchJumbledAndNested`,
            label: "Match jumbled and nested",
            options: [
                { value: "true", label: "да" },
                { value: "false", label: "нет" },
            ],
            isMulti: false,
        },
    ];

    return (
        <ConstructorForm
            inputs={inputs}
            constructorType={ConstructorJSONType.TASK_SET}
            className="rule-constructor"
            showUndoRedoPanel={false}
        />
    );
};

export default TaskRuleConstructor;
