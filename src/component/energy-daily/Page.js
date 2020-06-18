import React, { Fragment } from 'react';
import './page.css';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        早餐: [
          // { name: '鸡蛋', value: 64, energy: 385 },
        ],
        午餐: [],
        晚餐: [],
        零食: [],
      }],
      weight: '--',
      energy: '--',
      index: 0
    };
    this.showInput = this.showInput.bind(this);
    this.preTick = this.preTick.bind(this);
    this.nextTick = this.nextTick.bind(this);
  }

  createItem(name, data, index) {
    return (
      <div className={'item'} key={'item' + index}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name}</div>
        <div style={{ flex: 3 }}>
          {data.map((s, i) => (
            <div key={name + i} className={'item-cnt'}>
              <div>{s.name}</div>
              <div>{s.value}</div>
              <div>{s.energy}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  setData(data, weight, energy) {
    this.setState({ data });
  }

  showInput() {
    this.setState({ show: !this.state.show });
  }

  preTick() {
    let index = this.state.index + 1;
    if (index > this.state.data.length - 1) return false;
    this.setState({ index });
  }

  nextTick() {
    let index = this.state.index - 1;
    if (index < 0) return false;
    this.setState({ index });
  }

  componentDidMount() {
    const me = this;
  }

  render() {
    const data = this.state.data[this.state.index];
    return (
      <div className={'energy-daily-wrap'}>

        <div onClick={this.showInput} className={'daily-open'}>摄入量</div>

        <div className={`energy-daily-list ${this.state.show ? 'active' : ''}`}>

          <div onClick={this.showInput} className={'daily-close'}>×</div>

          <div onClick={this.preTick} className={'daily-tick pre'}>←</div>

          <div onClick={this.nextTick} className={'daily-tick next'}>→</div>

          <div className={'header'}>

            <div style={{ flex: 1 }}>{data.date}</div>

            <div style={{ flex: 3, display: 'flex' }}>
              {['食物', '摄入量(g)', '热量(KJ)'].map((s, i) => (
                <div key={'header' + i} style={{ flex: i === 0 ? 1.5 : 1, textAlign: 'center', padding: '5px 0px' }}>{s}</div>
              ))}
            </div>

          </div>

          <div className={'content'}>
            {['早餐', '午餐', '晚餐', '零食'].map((s, i) => this.createItem(s, data[s], i))}
          </div>

          <div className={'count'}>

            <div style={{ flex: 1 }} />

            <div style={{ flex: 3, display: 'flex' }}>
              {['', ~~data.weight, data.energy].map((s, i) => (
                <div key={'count' + i} style={{ flex: i === 0 ? 1.5 : 1, textAlign: 'center', padding: '5px 0px' }}>{s}</div>
              ))}
            </div>

          </div>

        </div>

      </div>
    );
  }
};
