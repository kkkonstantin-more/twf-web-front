import ConstructorForm from "../constructor-form/constructor-form";
import React from "react";
import {ConstructorFormPanel, ConstructorPanelFormProps} from "./constructor-panels-form.types";
import {Collapse} from "antd";
const { Panel } = Collapse;

const ConstructorPanelsForm = ({
                                 // constructor form props
                                 inputs,
                                 panels,
                                 constructorType,
                                 showUndoRedoPanel = true,
                                 className,
                               }: ConstructorPanelFormProps) => {
  return (
    <Collapse defaultActiveKey={[panels[0].key]}>
      {panels.map((panel: ConstructorFormPanel) => {
          return (
            <Panel header={panel.header} key={panel.key}>
          <ConstructorForm
            inputs={inputs.filter(input => input.panel === panel.key)}
          constructorType={constructorType}
          showUndoRedoPanel={showUndoRedoPanel}
          className={className}
          key={panel.key}
          />
          </Panel>
        )
        })}
      <Panel header='Другое' key='default'>
  <ConstructorForm
    inputs={inputs.filter(input => input.panel === undefined)}
  constructorType={constructorType}
  showUndoRedoPanel={showUndoRedoPanel}
  className={className}
  />
  </Panel>
  </Collapse>
)

};
export default ConstructorPanelsForm;
