import React, { useState, useEffect, useRef } from 'react';
import CustomLabel from './CustomLabel';

const InputField = ({
  label,
  name,
  type,
  value,
  isChecked,
  onInputChange,
  handleCheckboxChange,
  options,
  instruction,
  required,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
    setShowDropdown(true);
  };

  const selectOption = (value) => {
    onInputChange(name, value);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let filteredOptions = options;
  if (options && options.length > 0) {
    filteredOptions = options.filter((option) => option.includes(value));
  }

  let input;

  let rOnly
  if (name == 'nationalityDuplicate' || name == 'visaTypeDuplicate' || name == 'passportTypeDuplicate') {
    rOnly = true
  }
  switch (type) {
    case 'textarea':
      input = (
        <textarea
          className="w-full px-4 py-2 rounded-full border text-right max-h-40 overflow-y-auto focus:outline-none focus:border-blue-500 h-11"
          value={value}
          type={type}
          name={name}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
          ref={inputRef}
          dir="rtl"
          required={required}
        ></textarea>
      );
      break;
    case 'tel':
    case 'number':
    case 'email':
      input = (
        <input
          type={type}
          name={name}
          className="w-full px-4 py-2 rounded-full border text-right focus:outline-none focus:border-blue-500"
          value={value}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
          ref={inputRef}
          dir="rtl"
          required={required}
        />
      );
      break;
    case 'checkbox':
      input = (
        <input
          type={type}
          name={name}
          className="sm:ml-[300px] ml-[173px]"
          checked={isChecked}
          onChange={() => handleCheckboxChange()}
          ref={inputRef}
          dir="rtl"
          required={required}
        />
      );
      break;
    default:
      input = (
        <input
          disabled = {rOnly}
          type={type}
          name={name}
          className={`${rOnly ? "text-white": null} w-full px-4 py-2 rounded-full border-indigo-800 text-right focus:outline-none hover:border-indigo-800`}
          value={value}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
          ref={inputRef}
          dir="rtl"
          required={required}
        />
      );
  }

  return (
    <div className="grid sm:grid-cols-10 grid-cols-12">
      <div className="sm:col-start-1 sm:col-span-7 col-start-1 col-span-8 sm:mt-1">
        <div className="relative" ref={dropdownRef}>
          {options && options.length > 0 ? (
            <>
              {input}
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg custom-scrollbar">
                  {filteredOptions.map((option, index) => (
                    <div
                      dir="rtl"
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>{input}</>
          )}
        </div>
        <p className="m-2 text-slate-200 text-xs text-end">{instruction}</p>
      </div>
      <CustomLabel label={label} />
    </div>
  );
};

export default InputField;
