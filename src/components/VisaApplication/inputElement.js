import React, { useState, useEffect, useRef } from 'react';
import './InputDropdown.css';
import CustomLabel from './CustomLabel';

const InputElement = ({
  label,
  options,
  defaultValue,
  instruction,
  type,
  required,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const selectOption = (value) => {
    setInputValue(value);
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

  let filteredOptions = [];

  if (options && options.length > 0) {
    filteredOptions = options.filter((option) => option.includes(inputValue));
  }
  
  let input;

  switch (type) {
    case 'textarea':
      input = (
        <textarea
          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
          placeholder={label}
          value={inputValue}
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
          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
          placeholder={label}
          value={inputValue}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
          ref={inputRef}
          dir="rtl"
          required={required}
        />
      );
      break;
    default:
      input = (
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
          placeholder={label}
          value={inputValue}
          onClick={() => setShowDropdown(true)}
          onChange={handleInputChange}
          ref={inputRef}
          dir="rtl"
          required={required}
        />
      );
  }

  return (
    <div className="mb-4 flex items-center w-full ">
      <div className="flex-col">
        <div className="w-full pr-4">
          <div className="relative w-full" ref={dropdownRef}>
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
        </div>
        <p className="m-2">{instruction}</p>
      </div>
      <CustomLabel label={label} />
    </div>
  );
};

export default InputElement;
