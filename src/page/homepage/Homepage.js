import React, { useEffect, useState, useRef } from 'react';
import './homepage.less';
import List from '../../component/list/List';
import Line from '../../component/line/Line';
import LineKJ from '../../component/line/LineKJ';
// import InfoFillIn from '../../component/info-fill-in/FillIn';
import EnergyDaily from '../../component/energy-daily/Page';
import axios from 'axios';
import Dialog from '../../component/dialog/Dialog.js';
import DirtyTalk from '../../component/dirty-talk/DirtyTalk.js';

const BMIGB = 22;

export default () => {
  const [listData, setListData] = useState({ header: [], content: [], width: [] });
  const [lineData, setLineData] = useState({ dataX: [], dataY: [], gb: 0 });
  const [lineKjData, setLineKjData] = useState({ dataX: [], dataY: [], gb: 0 });
  const energyRef = useRef();
  const [showListWeight, setShowListWeight] = useState(false);
  const [showListFood, setShowListFood] = useState(false);
  const [showListSport, setShowListSport] = useState(false);
  const btnList = [
    { name: '体重记录表', fn: setShowListWeight },
    { name: '饮食记录表', fn: setShowListFood },
    { name: '运动记录表', fn: setShowListSport },
  ];

  useEffect(() => {
    async function getDataRequest() {
      let res1, res2, res3;
      try {
        res1 = await axios.get('./static/api-simulation/data.json');
      } catch (err) {
        res1 = {
          data: {
            data: [{
              "date": "xxxx-xx-xx",
              "value_m": "",
              "value_e": "",
              "sport": []
            }]
          }
        };
      }

      try {
        res2 = await axios.get('./static/api-simulation/food.json');
      } catch (err) {
        res2 = { data: {} };
      };

      try {
        res3 = await axios.get('./static/api-simulation/energy.json');
      } catch (err) {
        res3 = {
          data: {
            data: [{
              "date": "xxxx-xx-xx",
              "早餐": [],
              "午餐": [],
              "晚餐": [],
              "零食": []
            }]
          }
        }
      };
      return { data: res1.data.data, food: res2.data, resData: res3.data.data };
    };

    getDataRequest().then(res => {
      const { data, food, resData } = { ...res };
      const header = ['时间', '体重-早(KG)', '体重-晚(KG)', '平均(KG)', 'BMI', '状态', '距离目标(KG)', '运动'];
      const content = [];
      const width = [1, 1.2, 1.2, 1, 0.5, 0.5, 1.2, 1.2];
      const height = 1.76;
      const dataX = [];
      const dataY = [];
      let GBWEIGHT = BMIGB * (height * height);
      let todayWeight = [];
      data.forEach((s, i) => {
        let m = (s.value_m / 2).toFixed(2);
        let e = (s.value_e / 2).toFixed(2);
        let times = 2;
        if (!+m) {
          m = '--';
          times--;
        }
        if (!+e) {
          e = '--';
          times--;
        }
        let average = times ? ((s.value_m / 2 + s.value_e / 2) / times).toFixed(2) : '--';
        let BMI = average === '--' ? '--' : Math.ceil(average / (height * height));
        let target = average === '--' ? '--' : (BMIGB * (height * height) - average).toFixed(2);
        let state = judgeWeight(BMI);
        let sport = s.sport;
        let temp = [s.date, m, e, average, BMI, state, target, sport];
        // if (i === 0 && average !== '--') todayWeight = average;
        if (average !== '--') {
          todayWeight.push(average);
        } else {
          todayWeight.push(GBWEIGHT);
        }
        content.push(temp);
        dataX.unshift(s.date);
        dataY.unshift(average === '--' ? '' : average);
      });

      let weight = 0;
      let energy = 0;
      const dataXkj = [];
      const dataYkj = [];
      const totalData = [];

      resData.forEach((s, i) => {
        let temp_data = { weight: 0, energy: 0 };

        for (let n in s) {
          temp_data[n] = s[n];
          if (Array.isArray(s[n])) {
            s[n].forEach(m => {
              m.energy = m.product ? ~~(food[m.name] * 4.184) : ~~(food[m.name] / 100 * m.value * 4.184);
              temp_data.energy += m.energy;
              temp_data.weight += m.value;
            });
          }
        }

        totalData.push(temp_data);
        dataXkj.unshift(s.date);
        dataYkj.unshift(temp_data.energy);
      });

      energyRef.current.setData(totalData, weight, energy);

      setListData({ header, content, width, height });
      setLineData({ dataX, dataY, gb: BMIGB * (height * height) });
      setLineKjData({ dataX: dataXkj, dataY: dataYkj, gb: todayWeight });

    });

  }, []);

  return (
    <>

      <DirtyTalk />

      <div className={'button-wrap'}>
        {btnList.map(s => (
          <button onClick={() => s.fn(true)}>{s.name}</button>
        ))}
      </div>

      <List data={listData} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Line data={lineData} style={{ width: 750, height: 345 }} />
        <LineKJ data={lineKjData} style={{ width: 750, height: 345 }} />
      </div>

      <EnergyDaily ref={energyRef} />

      <Dialog show={showListWeight}>123</Dialog>

      <Dialog show={showListFood}>456</Dialog>

      <Dialog show={showListSport}>789</Dialog>

    </>
  );
};

function judgeWeight(data, sex) {
  let res = '--';
  const arr = [20, 25, 30, 35];
  const arrName = ['过轻', '适中', '过重', '肥胖'];
  for (let i = 0; i < arr.length; i++) {
    if (data > 35) {
      res = '非常肥胖';
    }
    if (data < arr[i]) {
      res = arrName[i];
      break;
    }
  }
  return res;
}
