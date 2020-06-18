import React from 'react';

export default class SportInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getData = this.getData.bind(this);
  }

  getData() {
    return {
      name: this.nameRef.value,
      value: this.valueRef.value,
      unit: this.unitRef.value,
    };
  }

  render() {
    return (
      <div className={'sport-input'}>
        <span>项目</span>
        <input ref={refs => this.nameRef = refs} />
        <span>数量</span>
        <input ref={refs => this.valueRef = refs} />
        <span>单位</span>
        <input ref={refs => this.unitRef = refs} />
      </div>
    );
  }
};
