import React, { useState } from 'react';
import { Dropdown, Radio, Button } from 'antd';

const AppFilterRadio = ({
  options,
  onChange,
  btn_text = 'Filter',
  isActive,
  defaultValue = '',
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleMenuClick = (option) => {
    setSelectedValue(option.value);
    if (onChange) {
      onChange(option.value);
    }
  };

  const handleClearSelection = () => {
    setSelectedValue('');
    if (onChange) {
      onChange('');
    }
  };

  // Generate menu items
  const menuItems = options?.map((option) => ({
    key: option.value,
    label: (
      <Radio
        checked={selectedValue === option.value}
        onChange={() => handleMenuClick(option)}
      >
        {option.label}
      </Radio>
    ),
  }));

  menuItems.push({
    key: 'clear',
    label: (
      <div
        role='button'
        tabIndex={0}
        onClick={selectedValue ? handleClearSelection : null}
        className={`cursor-pointer ml-2 mb-2 ${
          selectedValue
            ? 'text-blue-600 hover:text-blue-800'
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        Clear
      </div>
    ),
    className: 'menu-item-clear',
  });

  const buttonClassName = isActive ? 'active-button-style' : '';

  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      trigger={['click']}
    >
      <Button className={buttonClassName}>{btn_text}</Button>
    </Dropdown>
  );
};

export default AppFilterRadio;
