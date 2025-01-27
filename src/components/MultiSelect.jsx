import React, { useState } from "react";
import Select from "react-select";

const MultiSelect = ({ options = [], onAddOption }) => {
  const [selectedOptions, setSelectedOptions] = useState([]); // Tracks selected options
  const [newOption, setNewOption] = useState(""); // For adding custom options
  const [availableOptions, setAvailableOptions] = useState([
    "Mushroom Masala",
    "Kadai Paneer",
    "Pizza",
    ...options, // Include any passed options
  ]);

  const handleSelection = (selected) => {
    setSelectedOptions(selected || []); // Update selected options
  };

  const handleAddOption = () => {
    if (newOption && !availableOptions.includes(newOption)) {
      const updatedOptions = [...availableOptions, newOption];
      setAvailableOptions(updatedOptions); // Add the new option to available options
      onAddOption(newOption); // Call parent callback
      setNewOption(""); // Reset input field
    }
  };

  return (
    <div className="space-y-4">
      {/* Multi-select Dropdown */}
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleSelection}
        options={availableOptions.map((option) => ({ value: option, label: option }))}
        placeholder="Select Options"
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {/* Add new option input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new item"
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none"
        />
        <button
          onClick={handleAddOption}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default MultiSelect;
