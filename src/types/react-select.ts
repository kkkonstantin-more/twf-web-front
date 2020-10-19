// react-select doesn't have descriptive type for options
export interface SelectOption {
  value: string | boolean;
  label: string;
}

export interface SelectInput {
  name: string;
  label: string;
  register: any;
  options: SelectOption[];
  defaultValue?: SelectOption;
  onBlur?: () => void;
  isMulti: boolean;
}
