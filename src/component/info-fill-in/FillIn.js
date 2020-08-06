import React from 'react';
import './fill-in.css';
import AddInput from './AddInput';

const DATA = ['时间', '体重-早(斤)', '体重-晚(斤)', '运动'];

export default class Page extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.infoComit = this.infoComit.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  infoComit() {
    // const data = {
    //   date: this['info0'].value,
    //   value_m: this['info1'].value,
    //   value_e: this['info2'].value,
    //   sport: this.sportRef.getData()
    // };
  }

  showInput() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {

  }

  render() {
    return (
      <>
        <div onClick={this.showInput} className={'fill-in-box-open'}>填报</div>

        <div className={`fill-in-box ${this.state.show ? 'active' : ''}`}>
          {DATA.map((s, i) => s === '运动' ? (
            <div className={'input-item'} key={'input' + i}>
              <AddInput ref={refs => this.sportRef = refs} />
            </div>
          ) : (
              <div className={'input-item'} key={'input' + i}>
                <span>{s}</span>
                <input ref={refs => this['info' + i] = refs} />
              </div>
            ))
          }
          <div className={'form-btn'} onClick={this.infoComit}>提交</div>
          <div onClick={this.showInput} className={'form-close'}>×</div>
        </div>
      </>
    );
  }
};
