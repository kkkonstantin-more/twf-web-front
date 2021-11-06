import {ConstructorFormProps} from "../constructor-form/constructor-form.types";

export interface ConstructorFormPanel {
  header: string;
  key: string;
}

export interface ConstructorPanelFormProps extends ConstructorFormProps{
  panels: ConstructorFormPanel[]
}
