import { HiddenFieldsTypes } from "./hidden-fields.types";
import { AppTabType } from "../../types/app-tabs/AppTab";

export const toggleFieldHidden = (tabTypeAndFieldName: {
  tabType: AppTabType;
  fieldName: string;
}) => ({
  type: HiddenFieldsTypes.TOGGLE_FIELD_HIDDEN,
  payload: tabTypeAndFieldName,
});
