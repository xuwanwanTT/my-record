import React from 'react';
import './form.less';
import MyInput from './module/MyInput.js';

class WeightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit() {
    let { date = '', value_m = '', value_n = '' } = this.state;
    if (!date) date = this.props.date;
    if (this.props.onSubmit instanceof Function) this.props.onSubmit({ date, value_n, value_m });
  }

  onClose() {
    if (this.props.onClose instanceof Function) this.props.onClose();
  }

  shouldComponentUpdate(prep, pres) {
    return prep.date !== this.props.date || pres.date !== this.state.date;
  }

  componentDidUpdate() {
    console.log(this.props.date);
    console.log(this.state.date);
  }

  render() {
    let { date = '', value_m = '', value_n = '' } = this.state;
    if (!date) date = this.props.date;
    return (
      <div className={'form-warp'}>
        <div className={'form-content'}>
          <div>
            <span>日期</span>
            <MyInput type={'date'}
              value={date}
              onChange={(e) => this.setState({ date: e.target.value })}
              placeholder={'--'} />
          </div>
          <div>
            <span>早</span>
            <MyInput value={value_m}
              onChange={(e) => this.setState({ value_m: e.target.value })}
              placeholder={'--'} />
          </div>
          <div>
            <span>晚</span>
            <MyInput value={value_n}
              onChange={(e) => this.setState({ value_n: e.target.value })}
              placeholder={'--'} />
          </div>
          <div>
            <span>平均</span>
            <span>{(value_m * 1 + value_n * 1) / (Boolean(value_m) * 1 + Boolean(value_n) * 1) || '--'}</span>
          </div>
        </div>
        <div className={'form-button'}>
          <div onClick={this.onSubmit.bind(this)}>确认</div>
          <div onClick={this.onClose.bind(this)}>取消</div>
        </div>
      </div>
    );
  }
};

export default WeightForm;
