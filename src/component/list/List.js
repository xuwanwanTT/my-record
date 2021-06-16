import React, { useEffect, useState } from 'react';
import './list.less';
import MyInput from '../form/module/MyInput.js';
import { judgeWeight, getAverage } from '../common/common.js';

const BMIGB = 22;

const HEIGHT = 1.76;

const WEIGHTGB = BMIGB * (HEIGHT * HEIGHT);

const List = ({ weight = {}, food = [
  { name: "早餐", data: [] },
  { name: "午餐", data: [] },
  { name: "晚餐", data: [] },
  { name: "零食", data: [] }
], sport = [], foodData = JSON.stringify({}), date, onClose, onChangeDate }) => {

  const [dateData, setDateData] = useState(JSON.parse(date));
  const [weightData, setWeightData] = useState(JSON.parse(weight));
  const [foodPreData, setFoodPreData] = useState(JSON.parse(food));
  const [sportData, setSportData] = useState(JSON.parse(sport));
  const [foodTotalData, setFoodTotalData] = useState(JSON.parse(foodData));
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

  const close = () => {
    if (onClose instanceof Function) onClose();
  };

  useEffect(() => {
    setFoodPreData(JSON.parse(food));
  }, [food]);

  useEffect(() => {
    setFoodTotalData(JSON.parse(foodData));
  }, [foodData]);

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

      <div className={'form-list-weight record-weight'}>
        <div className={'list-wight-title'}>体重指标</div>
        <div className={'value-item'}>
          <span>早-体重( kg )</span>
          <span>晚-重量( kg )</span>
          <span>均值( kg )</span>
          <span>BMI</span>
          <span>评价</span>
          <span>距离目标( kg )</span>
        </div>
        <div className={'value-item'}>
          <span>{weightData.morning}</span>
          <span>{weightData.evening}</span>
          <span>{(weightData.morning * 100 + weightData.evening * 100) / 100}</span>
          <span>{Math.ceil((weightData.morning * 100 + weightData.evening * 100) / 100 / 1.76 / 1.76)}</span>
          <span>{judgeWeight(getAverage(weightData.morning, weightData.evening))}</span>
          <span>{(getAverage(weightData.morning, weightData.evening) - WEIGHTGB).toFixed(2)}</span>
        </div>
      </div>

      <div className={'form-list-food record-food'}>
        <div className={'list-food-title'}>食物摄入量</div>
        <div className={'value-item'}>
          <span>食物</span>
          <span>重量( g )</span>
          <span>能量( kj )</span>
          <span>碳水( g )</span>
          <span>钠( mg )</span>
          <span>蛋白质( g )</span>
          <span>脂肪( g )</span>
        </div>
        {foodPreData.map((item, index) => (
          <div key={'record' + index} className={'list-food-item'}>
            <div className={'item-record-name'}>{item.name}</div>
            <div className={'item-record-value'}>
              {item.data?.map((s, i) => (
                <div key={'food' + index + i} className={'value-item'}>
                  <span>{s.name}</span>
                  <span>{s.value}</span>
                  <span>{s.kj}</span>
                  <span>{s.cho}</span>
                  <span>{s.na}</span>
                  <span>{s.pro}</span>
                  <span>{s.ee}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={'value-item'}>
          <span>摄入合计</span>
          <span>{foodTotalData.total_w}</span>
          <span>{foodTotalData.total_kj}</span>
          <span>{foodTotalData.total_cho}</span>
          <span>{foodTotalData.total_na}</span>
          <span>{foodTotalData.total_pro}</span>
          <span>{foodTotalData.total_ee}</span>
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

      <div className={'form-list-button'}>
        <div onClick={close}>返回</div>
      </div>

    </div>
  );
};

export default List;
