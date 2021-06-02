import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './dialog.less';

const Dialog = ({ show, onClose, children, style }) => {

  return ReactDOM.createPortal(
    <div className={`my-dialog ${show ? 'my-dialog-show' : ''}`}>
      <div className={'my-dialog-bg'} />
      <div className={'my-dialog-content'} style={style}>
        {onClose ? <div className={'my-dialog-close'} onClick={onClose}>×</div> : null}
        {children}
      </div>
    </div>,
    document.querySelector('#root')
  );
};

export default Dialog;
