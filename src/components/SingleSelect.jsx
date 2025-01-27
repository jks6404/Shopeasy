import React, { useState } from "react";
import Select from "react-select";

const SingleSelect = ({ options = [], onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [availableOptions, setAvailableOptions] = useState(options); // Manage available options locally

  const handleSelection = (selected) => {
    if (!selected && selectedOption) {
      // Re-add the cleared option only if it's not already in the available options
      if (!availableOptions.includes(selectedOption.value)) {
        setAvailableOptions([...availableOptions, selectedOption.value]);
      }
    }

    setSelectedOption(selected); // Update the selected option
    onSelect(selected ? selected.value : null); // Notify the parent
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleSelection}
      options={availableOptions.map((option) => ({ value: option, label: option }))}
      placeholder="Select Option"
      classNamePrefix="select"
      isClearable
      isSearchable
    />
  );
};

export default SingleSelect;
