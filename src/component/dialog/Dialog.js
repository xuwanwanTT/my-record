import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './dialog.less';

const Dialog = (props) => {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return ReactDOM.createPortal(
    <div className={`my-dialog ${show ? 'my-dialog-show' : ''}`}>
      <div className={'my-dialog-bg'} />
      <div className={'my-dialog-content'}>
        <div className={'my-dialog-close'} onClick={() => setShow(false)}>×</div>
        {props.children}
      </div>
    </div>,
    document.querySelector('#root')
  );
};

export default Dialog;
