import React from "react";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";

const Row = ({
  singleSelectOptions,
  onSingleSelect,
  multiSelectOptions,
  onAddMultiSelectOption,
}) => {
  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">
        <SingleSelect
          options={singleSelectOptions}
          onSelect={onSingleSelect}
        />
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <MultiSelect
          options={multiSelectOptions}
          onAddOption={onAddMultiSelectOption}
        />
      </td>
    </tr>
  );
};

export default Row;