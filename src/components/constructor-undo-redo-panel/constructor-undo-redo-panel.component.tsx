// libs and hooks
import React from "react";
// types
import { ConstructorUndoRedoPanelProps } from "./constructor-undo-redo-panel.types";
import Icon from "@mdi/react";
import { mdiRedo, mdiUndo } from "@mdi/js";
import "./constructor-undo-redo-panel.styles.scss";

const ConstructorUndoRedoPanel = ({
  undo,
  redo,
}: ConstructorUndoRedoPanelProps) => {
  return (
    <div className="undo-redo-panel">
      {[undo, redo].map((action: () => void, i: number) => {
        return (
          <div
            key={i}
            onClick={() => action()}
            className="undo-redo-panel__action"
          >
            <button
              type="button"
              style={{ border: "none", background: "none" }}
            >
              <Icon path={i === 0 ? mdiUndo : mdiRedo} size={2} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ConstructorUndoRedoPanel;
