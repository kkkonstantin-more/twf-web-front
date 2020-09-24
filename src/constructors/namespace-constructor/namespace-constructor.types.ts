export type AllowReadValueOption = {
  value: boolean;
  label: "Открытый" | "Закрытый";
};
export type AllowEditValueOption = AllowReadValueOption;

export interface NamespaceConstructorInputs {
  nameEn: string;
  nameRu: string;
  code: string;
  allowRead: AllowReadValueOption;
  allowEdit: AllowEditValueOption;
  readGrantedUsers: { label: string; value: string }[];
  editGrantedUsers: { label: string; value: string }[];
  taskSetList: { label: string; value: string }[];
}
