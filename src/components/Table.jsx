import React, { useState } from "react";
import Row from "./Row";

const Table = () => {
  const [rows, setRows] = useState([{}]); // Stores rows
  const singleSelectOptions = ["India", "USA", "Maldives", "Canada"]; // Static options
  const [usedSingleSelectOptions, setUsedSingleSelectOptions] = useState([]); // Tracks selected options
  const [multiSelectOptions, setMultiSelectOptions] = useState([]); // Multi-select options

  // Add a new row
  const addRow = () => setRows([...rows, {}]);

  // Handle single select changes
  const handleSingleSelect = (value) => {
    setUsedSingleSelectOptions([...usedSingleSelectOptions, value]);
  };

  // Add new option to the multi-select dropdown
  const addMultiSelectOption = (newOption) => {
    if (!multiSelectOptions.includes(newOption)) {
      setMultiSelectOptions([...multiSelectOptions, newOption]);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Label 1</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <Row
              key={index}
              singleSelectOptions={singleSelectOptions.filter(
                (option) => !usedSingleSelectOptions.includes(option)
              )}
              onSingleSelect={handleSingleSelect}
              multiSelectOptions={multiSelectOptions}
              onAddMultiSelectOption={addMultiSelectOption}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          onClick={addRow}
          className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default Table;