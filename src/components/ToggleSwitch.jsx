import React from 'react';

/**
 * A reusable toggle switch component styled with Tailwind CSS.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.checked - Current state of the toggle
 * @param {function} props.onChange - Handler called when the toggle state changes
 * @param {string} props.label - Accessible label for the toggle
 * @param {string} [props.id] - Unique ID for the input and label association
 * @returns {JSX.Element}
 */
const ToggleSwitch = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id} className="text-sm font-bold text-[#000080] cursor-pointer">
        {label}
      </label>
      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checked}
          onChange={onChange}
          aria-label={label}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-[#000080]"
          style={{
            right: checked ? '0' : 'auto',
            left: checked ? 'auto' : '0',
            borderColor: checked ? '#000080' : '#d1d5db'
          }}
        />
        <label
          htmlFor={id}
          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${
            checked ? 'bg-[#000080]' : 'bg-gray-300'
          }`}
        ></label>
      </div>
    </div>
  );
};

export default React.memo(ToggleSwitch);
