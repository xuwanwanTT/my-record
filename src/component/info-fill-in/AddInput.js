import React from 'react';
import SportInput from './SportInput';

export default class AddInput extends React.Component {
  constructor() {
    super();
    this.state = {
      item: 1
    };
    this.addItem = this.addItem.bind(this);
    this.getData = this.getData.bind(this);
  }

  addItem() {
    this.setState({ item: +this.state.item + 1 })
  }

  getData() {
    return Array.from(this.inputWrap.children).map((s, i) => {
      return this['sportInputRef' + i].getData();
    });
  }

  render() {
    return (
      <>
        <div className={'sport-add'}>
          <span>运动</span>
          <span onClick={this.addItem}>+</span>
        </div>

        <div ref={refs => this.inputWrap = refs} className={'sport-input-wrap'}>
          {Array.from({ length: this.state.item }).map((s, i) => (
            <SportInput key={'item' + i} ref={refs => this['sportInputRef' + i] = refs} />
          ))}
        </div>
      </>
    );
  }
};
