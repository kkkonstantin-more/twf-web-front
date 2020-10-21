export interface ConstructorInputProps {
  label: string;
  name: string;
  type: string;
  register?: any;
  onBlur?: () => void;
  isRendered?: boolean;
  isVisible?: boolean;
  defaultValue?: any;
  expressionInput?: boolean;
}
