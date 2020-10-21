import { SelectOption } from "../../components/constructor-select/constructor-select.types";

export interface AllowReadValueOption extends SelectOption {
  value: boolean;
  label: "Открытый" | "Закрытый";
}

export type AllowEditValueOption = AllowReadValueOption;

export interface NamespaceConstructorInputs {
  nameEn: string;
  nameRu: string;
  code: string;
  allowRead: AllowReadValueOption;
  allowEdit: AllowEditValueOption;
  readGrantedUsers: SelectOption[];
  editGrantedUsers: SelectOption[];
  taskSetList: SelectOption[];
}
