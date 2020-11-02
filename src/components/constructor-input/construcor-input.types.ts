export interface ConstructorInputProps {
  name: string;
  type: string;
  register?: (...args: any) => void;
  label?: string;
  isRendered?: boolean;
  isVisible?: boolean;
  defaultValue?: any;
  expressionInput?: boolean;
  updateJSON?: () => void;
}
