import { NamespaceConstructorInputs } from "./namespace-constructor.types";

export const mockNamespaces: {
  [code: string]: NamespaceConstructorInputs;
} = {
  "1": {
    nameEn: "Test namespace 1",
    nameRu: "На все случаи жизни",
    code: "1",
    allowRead: "true",
    allowEdit: "false",
    readGrantedUsers: "",
    editGrantedUsers: "",
    taskSetList: "",
  },
  "2": {
    nameEn: "Test namespace 2",
    nameRu: "Не пожелаешь и врагу",
    code: "2",
    allowRead: "true",
    allowEdit: "false",
    readGrantedUsers: "",
    editGrantedUsers: "",
    taskSetList: "",
  },
  "3": {
    nameEn: "Test namespace 3",
    nameRu: "Едем на всерос",
    code: "3",
    allowRead: "true",
    allowEdit: "false",
    readGrantedUsers: "",
    editGrantedUsers: "",
    taskSetList: "",
  },
};
