// TodoActions.tsx
import React from "react";

interface SelectAllActionsProps {
  allSelected: boolean;
  onToggleSelectAll: (selected: boolean) => void;
  onDeleteSelected: () => void;
}

const SelectAll: React.FC<SelectAllActionsProps> = ({ allSelected, onToggleSelectAll, onDeleteSelected }) => {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => {
            onToggleSelectAll(e.target.checked);
          }}
        />
        <label>Select All</label>
      </div>
      <button onClick={onDeleteSelected}>Delete Selected Items</button>
    </div>
  );
};

export default SelectAll;
