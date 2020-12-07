import React from "react";
import { ConstructorInputProps } from "../constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../constructor-select/constructor-select.types";
import { isSelectInput } from "../../constructors/utils";
import ConstructorSelect from "../constructor-select/constructor-select.component";
import ConstructorInput from "../constructor-input/constructor-input.component";
import { ConstructorHistoryItem } from "../../redux/constructor-history/constructor-history.types";
import { ConstructorType } from "../../pages/constructor-page/constructor-page.types";
import { ConstructorJSONsTypes } from "../../redux/constructor-jsons/constructor-jsons.types";

interface ConstructorFormProps {
  inputs: (ConstructorInputProps | ConstructorSelectProps)[];
  register?: () => void;
  updateJSON?: () => void;
  addToHistory?: (
    oldVal: ConstructorHistoryItem,
    newVal: ConstructorHistoryItem
  ) => void;
  constructorType?: ConstructorJSONsTypes;
}

const ConstructorForm = ({
  inputs,
  register,
  updateJSON,
  addToHistory,
  constructorType,
}: ConstructorFormProps): JSX.Element => {
  return (
    <>
      {inputs.map(
        (
          input: ConstructorInputProps | ConstructorSelectProps
        ): JSX.Element => {
          const { name } = input;
          if (isSelectInput(input)) {
            return (
              <ConstructorSelect
                key={name}
                updateJSON={updateJSON}
                {...input}
              />
            );
          } else {
            return (
              <ConstructorInput
                key={name}
                addToHistory={addToHistory}
                constructorType={constructorType}
                {...input}
              />
            );
          }
        }
      )}
    </>
  );
};

export default ConstructorForm;
