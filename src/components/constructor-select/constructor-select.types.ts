// react-select doesn't have descriptive type for options
import { LabeledValue } from "antd/es/select";

export interface SelectOption {
  value: string | boolean;
  label: string;
}

export interface ConstructorSelectProps {
  name: string;
  label: string;
  register?: any;
  options: LabeledValue[];
  defaultValue?: string | string[];
  isMulti: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  updateJSON?: () => void;
}
