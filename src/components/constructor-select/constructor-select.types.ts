// react-select doesn't have descriptive type for options
import { LabeledValue } from "antd/es/select";

export interface SelectOption {
  value: string | boolean;
  label: string;
}

export interface ConstructorSelectProps {
  name: string;
  label: string;
  options: LabeledValue[];
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
  value?: string | string[];
  isMulti: boolean;
  isTags?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  width?: number;
}
