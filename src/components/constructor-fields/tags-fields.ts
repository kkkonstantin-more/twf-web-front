import {ConstructorFormInput} from "../constructor-form/constructor-form.types";
import {Panel} from "./constructor-fields.type";

export const getTagsFields = () : ConstructorFormInput[] => {
  return [
    {
      name: "tags",
      label: "Теги",
      type: "text",
      isMulti: false,
      isTags: true,
      options: [],
      panel: Panel.TAGS
    },
  ]
};