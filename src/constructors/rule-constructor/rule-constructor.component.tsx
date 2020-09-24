// libs and hooks
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useMergedRef from "@react-hook/merged-ref";
// components
import Select from "react-select";
import MixedInput from "../../copmonents/mixed-input/mixed-input";
// types
import { RuleConstructorProps } from "./rule-constructor.types";
// styles
import "./rule-constructor.styles.scss";

const RuleConstructor = ({ index, defaultValue }: RuleConstructorProps) => {
  const { register } = useFormContext();

  const [mixedInputWidth, setMixedInputWidth] = useState<number>(0);

  const leftInputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const rightInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const [basedOnTaskContext, setBasedOnTaskContext] = useState<{
    label: string;
    value: boolean;
  }>(
    defaultValue.basedOnTaskContext !== undefined
      ? {
          label: defaultValue.basedOnTaskContext ? "да" : "нет",
          value: defaultValue.basedOnTaskContext,
        }
      : {
          label: "да",
          value: true,
        }
  );

  const [matchJumbledAndNested, setMatchJumbledAndNested] = useState<{
    label: string;
    value: boolean;
  }>(
    defaultValue.basedOnTaskContext !== undefined
      ? {
          label: defaultValue.matchJumbledAndNested ? "да" : "нет",
          value: defaultValue.matchJumbledAndNested,
        }
      : {
          label: "да",
          value: true,
        }
  );

  useEffect(() => {
    if (leftInputRef.current) {
      const width = window.getComputedStyle(leftInputRef.current, null);
      setMixedInputWidth(
        parseFloat(width.getPropertyValue("width").slice(0, -2))
      );
    }
  }, [leftInputRef]);

  return (
    <div className="rule-constructor">
      <div className="form-group">
        <label>Левая часть</label>
        <input
          type="text"
          name={`rules[${index}].left`}
          ref={useMergedRef(register(), leftInputRef)}
          defaultValue={defaultValue.left}
        />
        <MixedInput
          value={defaultValue.left}
          inputRef={leftInputRef}
          width={mixedInputWidth + "px"}
        />
      </div>
      <div className="form-group">
        <label>Правая часть</label>
        <input
          type="text"
          name={`rules[${index}].right`}
          ref={useMergedRef(register(), rightInputRef)}
          defaultValue={defaultValue.left}
        />
        <MixedInput
          value={defaultValue.right}
          inputRef={rightInputRef}
          width={mixedInputWidth + "px"}
        />
      </div>
      <div className="form-group">
        <label>Based on task context</label>
        <Select
          value={basedOnTaskContext}
          name="basedOnTaskContext"
          options={[
            { value: true, label: "да" },
            { value: false, label: "нет" },
          ]}
          onChange={() => {
            setBasedOnTaskContext({
              value: !basedOnTaskContext.value,
              label: basedOnTaskContext.label === "да" ? "нет" : "да",
            });
          }}
        />
      </div>
      <div className="form-group">
        <label>Based on task context</label>
        <Select
          value={matchJumbledAndNested}
          name="matchJumbledAndNested"
          options={[
            { value: true, label: "да" },
            { value: false, label: "нет" },
          ]}
          onChange={() => {
            setMatchJumbledAndNested({
              value: !matchJumbledAndNested.value,
              label: matchJumbledAndNested.label === "да" ? "нет" : "да",
            });
          }}
        />
      </div>
    </div>
  );
};

export default RuleConstructor;
