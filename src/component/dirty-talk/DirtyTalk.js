import React from 'react';

const DirtyTalk = ({ data }) => {
  return (
    <div className={'dirty-talk'}>
      <p>{data || '放弃吧, 减啥减啊'}</p>
    </div>
  );
};

export default DirtyTalk;
