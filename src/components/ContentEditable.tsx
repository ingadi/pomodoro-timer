import { useState } from "react";

export function ContentEditable({ children, value, onUpdateValue }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <>
      {!isEditing && <span onClick={() => setIsEditing(true)}>{children}</span>}
      {isEditing && (
        <span>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.valueAsNumber)}
            autoFocus={true}
            min={1}
          />
          <button
            onClick={(e) => {
              onUpdateValue(inputValue);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setInputValue(value);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </span>
      )}
    </>
  );
}

type Props = {
  children: JSX.Element;
  value: number;
  onUpdateValue: (value: number) => void;
};
