import { ConstructorJSONs } from "./constructor-jsons.types";

const CONSTRUCTOR_JSONS_INITIAL_STATE: ConstructorJSONs = {
  namespace: {
    nameEn: "",
    nameRu: "",
    code: "",
    allowEdit: {
      label: "Закрытый",
      value: false,
    },
    allowRead: {
      label: "Открытый",
      value: true,
    },
    editGrantedUsers: [],
    readGrantedUsers: [],
    taskSetList: [],
  },
};

export default CONSTRUCTOR_JSONS_INITIAL_STATE;
