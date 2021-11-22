import {ConstructorFormInput} from "../constructor-form/constructor-form.types";
import {Panel} from "./constructor-fields.type";

const textDescFields: ConstructorFormInput[] = [
  {
    name: "code",
    label: "Код",
    type: "text",
  },
  {
    name: "nameRu",
    label: "Имя Ru",
    type: "text",
  },
  {
    name: "nameEn",
    label: "Имя En",
    type: "text",
  },
  {
    name: "descriptionShortRu",
    label: "Краткое описание Ru",
    type: "text",
  },
  {
    name: "descriptionShortEn",
    label: "Краткое описание En",
    type: "text",
  },
  {
    name: "descriptionRu",
    label: "Описание Ru",
    type: "text",
    isTextArea: true,
  },
  {
    name: "descriptionEn",
    label: "Описание En",
    type: "text",
    isTextArea: true,
  },
];

export const getTextDescFields = () : ConstructorFormInput[] => {
  return [...textDescFields].map(input => {
    input.panel = Panel.TEXT_DESC
    return input;
  })
};