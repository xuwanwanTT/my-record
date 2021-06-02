import React from 'react';

const MyInput = ({ disabled, onChange, value, placeholder, ...props }) => {

  return <input
    style={{
      height: 32,
      border: '1px solid',
      backgroundColor: 'transparent',
      borderRadius: 4,
      padding: 10,
      boxSizing: 'border-box',
      ...props.style
    }}
    disabled={disabled ? 'disabled' : ''}
    type={props.type}
    placeholder={placeholder || '请输入'}
    onChange={onChange}
    value={value}
  />;
};

export default MyInput;
