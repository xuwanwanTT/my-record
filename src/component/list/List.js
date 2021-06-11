import React, { useEffect, useState } from 'react';
import './list.less';
import MyInput from '../form/module/MyInput.js';

const List = ({ weight = {}, food = [
  { name: "早餐", data: [] },
  { name: "午餐", data: [] },
  { name: "晚餐", data: [] },
  { name: "零食", data: [] }
], sport = [], date, onClose, onChangeDate }) => {

  const [dateData, setDateData] = useState(JSON.parse(date));
  const [weightData, setWeightData] = useState(JSON.parse(weight));
  const [foodData, setFoodData] = useState(JSON.parse(food));
  const [sportData, setSportData] = useState(JSON.parse(sport));
  const [dateLock, setDateLock] = useState(false);

  const dateChangeValue = (e) => {
    setDateData(e.target.value);
  }

  const dateLockChange = () => {
    if (dateLock) {
      if (onChangeDate instanceof Function) onChangeDate(dateData);
    }
    setDateLock(!dateLock);
  }

  useEffect(() => {
    setFoodData(JSON.parse(food));
  }, [food]);

  useEffect(() => {
    setSportData(JSON.parse(sport));
  }, [sport]);

  useEffect(() => {
    setWeightData(JSON.parse(weight));
  }, [weight]);

  useEffect(() => {
    setDateData(JSON.parse(date))
  }, [date]);

  return (
    <div className={'form-list-wrap record-list'}>

      <div className={'form-list-date record-date'}>
        <MyInput disabled={!dateLock} value={dateData} onChange={dateChangeValue} />
        <span className={'list-date-button'} onClick={dateLockChange}>{dateLock ? '确认' : '变更'}</span>
      </div>

      <div className={'form-list-weight record-weight'}></div>

      <div className={'form-list-food record-food'}>
        <div className={'list-food-title'}>食物摄入量</div>
        <div className={'value-item'}>
          <span>食物</span>
          <span>重量(g)</span>
          <span>能量(kj)</span>
        </div>
        {foodData.map((item, index) => (
          <div key={'record' + index} className={'list-food-item'}>
            <div className={'item-record-name'}>{item.name}</div>
            <div className={'item-record-value'}>
              {item.data?.map((s, i) => (
                <div key={'food' + index + i} className={'value-item'}>
                  <span>{s.name}</span>
                  <span>{s.value}</span>
                  <span>{s.kj}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={'value-item'}>
          <span>摄入合计</span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={'form-list-sport record-sport'}>
        <div className={'list-sport-title'}>运动量</div>
        <div className={'value-item'}>
          <span>运动</span>
          <span>运动量</span>
          <span>能量(kj)</span>
        </div>
        {sportData.map((s, i) => (
          <div className={'value-item'}>
            <span>{s.name}</span>
            <span>{s.value}</span>
            <span>{s.kj}</span>
          </div>
        ))}
        <div className={'value-item'}>
          <span>运动合计</span>
          <span></span>
          <span></span>
        </div>
      </div>

    </div>
  );
};

export default List;
