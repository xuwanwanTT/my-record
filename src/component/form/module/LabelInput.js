import React from 'react';
import MyInput from './MyInput.js';

const LabelInput = ({ name, value, onChange, onDelete }) => {
  return (
    <div>
      <MyInput value={name} onChange={(e) => { onChange('label', e) }} />
      <MyInput value={value} onChange={(e) => { onChange('', e) }} />
      <span onClick={() => { onDelete() }}>delete</span>
    </div>
  );
};

export default LabelInput;
