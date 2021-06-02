import React from 'react';
import MyInput from './MyInput.js';

const LabelInput = ({ name, value, onChange, onDelete, placeholderName, placeholderValue }) => {
  return (
    <div className={'label-input-wrap'}>
      <MyInput placeholder={placeholderName} value={name} onChange={(e) => { onChange('label', e) }} />
      <MyInput placeholder={placeholderValue} value={value} onChange={(e) => { onChange('', e) }} />
      <span className={'delete-btn'} onClick={() => { onDelete() }} />
    </div>
  );
};

export default LabelInput;
