import React, { useEffect, useState } from 'react';
import './form.less';
import MyInput from './module/MyInput.js';
import LabelInput from './module/LabelInput.js';

const FormList = ({ weight = {}, food = [
  { name: "早餐", data: [] },
  { name: "午餐", data: [] },
  { name: "晚餐", data: [] },
  { name: "零食", data: [] }
], sport = [], date, onSubmit, onClose, onChangeDate }) => {

  const [dateData, setDateData] = useState(JSON.parse(date));
  const [weightData, setWeightData] = useState(JSON.parse(weight));
  const [foodData, setFoodData] = useState(JSON.parse(food));
  const [sportData, setSportData] = useState(JSON.parse(sport));
  const [dateLock, setDateLock] = useState(false);

  const submit = () => {
    if (onSubmit instanceof Function) {
      const { morning, evening } = weightData;
      if ((morning && isNaN(+morning)) || (evening && isNaN(+evening))) {
        alert(`请输入数字`);
      } else {
        onSubmit({
          weight: weightData,
          food: foodData,
          sport: sportData,
          date: dateData
        });
      }
    }
  };

  const close = () => {
    if (onClose instanceof Function) onClose();
  };

  const changeWeightValue = (e, type) => {
    const data = JSON.parse(JSON.stringify(weightData));
    data[type] = e.target.value;
    setWeightData(data);
  };

  const addItem = () => {
    let data = JSON.parse(JSON.stringify(sportData));
    data.push({});
    setSportData(data);
  };

  const changeSportValue = (type, index, e) => {
    let data = JSON.parse(JSON.stringify(sportData));
    if (type === 'label') {
      data[index].name = e.target.value;
    } else {
      data[index].value = e.target.value;
    }
    setSportData(data);
  };

  const deleteSportItem = (index) => {
    let data = JSON.parse(JSON.stringify(sportData));
    data.splice(index, 1);
    setSportData(data);
  };

  const addFoodItem = (index) => {
    let data = JSON.parse(JSON.stringify(foodData));
    data[index].data.push({});
    setFoodData(data);
  };

  const deleteFoodItem = (index, i) => {
    let data = JSON.parse(JSON.stringify(foodData));
    data[index].data.splice(i, 1);
    setFoodData(data);
  };

  const changeFoodValue = (type, index, i, e) => {
    let data = JSON.parse(JSON.stringify(foodData));
    let item = data[index].data;
    if (type === 'label') {
      item[i].name = e.target.value;
    } else {
      item[i].value = e.target.value;
    }
    setFoodData(data);
  };

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
    <div className={'form-list-wrap'}>

      <div className={'form-list-date'}>
        <MyInput disabled={!dateLock} value={dateData} onChange={dateChangeValue} />
        <span className={'list-date-button'} onClick={dateLockChange}>{dateLock ? '确认' : '变更'}</span>
      </div>

      <div className={'form-list-weight'}>
        <MyInput placeholder={'白天体重(kg)'} value={weightData.morning || ''} onChange={(e) => changeWeightValue(e, 'morning')} />
        <MyInput placeholder={'夜间体重(kg)'} value={weightData.evening || ''} onChange={(e) => changeWeightValue(e, 'evening')} />
      </div>

      <div className={'form-list-food'}>
        <div className={'list-food-title'}>食物摄入量</div>
        {foodData.map((item, index) => (
          <div key={'record' + index} className={'list-food-item'}>
            <div className={'item-record-name'}>{item.name}</div>
            <div className={'item-record-value'}>
              {item.data?.map((s, i) => <LabelInput key={i}
                value={s.value}
                name={s.name}
                placeholderName={'食物名称'}
                placeholderValue={'食物重量(g)'}
                onDelete={() => deleteFoodItem(index, i)}
                onChange={(type, e) => changeFoodValue(type, index, i, e)} />)}
            </div>
            <div className={'add-item-button'} onClick={() => { addFoodItem(index) }} />
          </div>
        ))}
      </div>

      <div className={'form-list-sport'}>
        <div className={'list-sport-title'}>运动量</div>
        {sportData.map((s, i) => <LabelInput key={i}
          value={s.value}
          name={s.name}
          placeholderName={'运动名称'}
          placeholderValue={'运动量'}
          onDelete={() => deleteSportItem(i)}
          onChange={(type, e) => changeSportValue(type, i, e)} />)}
        <div className={'add-item-button'} onClick={addItem} />
      </div>

      <div className={'form-list-button'}>
        <div onClick={submit}>确认</div>
        <div onClick={close}>取消</div>
      </div>

    </div >
  );
};

export default FormList;
