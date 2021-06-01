import React, { useEffect, useState } from 'react';
import './form.less';
import MyInput from './module/MyInput.js';
import AddItemList from './module/AddItemList.js';
import LabelInput from './module/LabelInput.js';

const checkChange = (data, newData) => {
  return JSON.stringify(data) !== JSON.stringify(newData);
}

const FormList = ({ weight = {}, food = [], sport = [], date, onSubmit, onClose, ...props }) => {

  const [dateData, setDateData] = useState(date);
  const [morning, setMorning] = useState(weight.morning || '');
  const [everning, setEverning] = useState(weight.morning || '');
  const [foodData, setFoodData] = useState(food);
  const [sportData, setSportData] = useState(sport);

  const submit = () => {
    if (onSubmit instanceof Function) {
      if (isNaN(+morning) || isNaN(+everning)) {
        alert(`请输入数字`)
      } else {
        onSubmit({
          weight: { morning: +morning, everning: +everning || null },
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

  useEffect(() => {
    if (checkChange(foodData, food)) setFoodData(foodData);
  }, [food, foodData]);

  useEffect(() => {
    if (checkChange(sportData, sport)) setSportData(sportData);
  }, [sport, sportData]);

  return (
    <div className={'form-list-wrap'}>

      <div>
        <MyInput value={dateData} onChange={(e) => setDateData(e.target.value)} />
      </div>

      <div className={'form-list-weight'}>
        <MyInput value={morning} onChange={(e) => setMorning(e.target.value)} />
        <MyInput value={everning} onChange={(e) => setEverning(e.target.value)} />
      </div>

      <div className={'form-list-food'}></div>

      <div className={'form-list-sport'}>
        <div onClick={addItem}>add sport</div>
        {sportData.map((s, i) => <LabelInput key={i} value={s.value}
          name={s.name}
          onDelete={() => deleteSportItem(i)}
          onChange={(type, e) => changeSportValue(type, i, e)} />)}
      </div>

      <div>
        <div onClick={submit}>确认</div>
        <div onClick={close}>取消</div>
      </div>

    </div >
  );
};

export default FormList;
