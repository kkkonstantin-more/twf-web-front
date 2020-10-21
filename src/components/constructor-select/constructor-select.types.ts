// react-select doesn't have descriptive type for options
export interface SelectOption {
  value: string | boolean;
  label: string;
}

export interface ConstructorSelectProps {
  name: string;
  label: string;
  register?: any;
  options: SelectOption[];
  defaultValue?: SelectOption | SelectOption[];
  onBlur?: () => void;
  isMulti: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  control?: any;
}
