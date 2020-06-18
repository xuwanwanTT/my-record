import React, { useEffect, useState, useRef } from 'react';
import './homepage.css';
import List from '../../component/list/List';
import Line from '../../component/line/Line';
import LineKJ from '../../component/line/LineKJ';
import InfoFillIn from '../../component/info-fill-in/FillIn';
import EnergyDaily from '../../component/energy-daily/Page';
import axios from 'axios';

const BMIGB = 22;
const MYYEAR = new Date().getFullYear() - 1993;
const MYHEIGHT = 175;

export default () => {
  const [listData, setListData] = useState({ header: [], content: [], width: [] });
  const [lineData, setLineData] = useState({ dataX: [], dataY: [], gb: 0 });
  const [lineKjData, setLineKjData] = useState({ dataX: [], dataY: [], gb: 0 });
  const energyRef = useRef();

  useEffect(() => {

    axios.get('./static/api-simulation/data.json').then(res => {
      const header = ['时间', '体重-早(KG)', '体重-晚(KG)', '平均(KG)', 'BMI', '状态', '距离目标(KG)', '运动'];
      const content = [];
      const width = [1, 1.2, 1.2, 1, 0.5, 0.5, 1.2, 1.2];
      const height = 1.76;
      const dataX = [];
      const dataY = [];
      let todayWeight = 1;
      let data = res.data.data;
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
        let BMI = average === '--' ? '--' : Math.round(average / (height * height));
        let target = average === '--' ? '--' : (BMIGB * (height * height) - average).toFixed(2);
        let state = judgeWeight(BMI);
        let sport = s.sport;
        let temp = [s.date, m, e, average, BMI, state, target, sport];
        if (i === 0 && average !== '--') todayWeight = average;
        content.push(temp);
        dataX.unshift(s.date);
        dataY.unshift(average === '--' ? 0 : average);
      });
      setListData({ header, content, width, height });
      setLineData({ dataX, dataY, gb: BMIGB * (height * height) });
      axios.get('./static/api-simulation/food.json').then(res => {
        const food = res.data;
        axios.get('./static/api-simulation/energy.json').then(res => {
          const resData = res.data.data;
          const data = {};
          let weight = 0;
          let energy = 0;
          const dataX = [];
          const dataY = [];
          const totalData = [];

          resData.forEach((s, i) => {
            let temp_e = 0;
            let temp_w = 0;
            let temp_data = {};

            for (let n in s) {
              temp_data[n] = s[n];
              if (Array.isArray(s[n])) {
                s[n].forEach(m => {
                  m.energy = m.product ? ~~(food[m.name] * 4.184) : ~~(food[m.name] / 100 * m.value * 4.184);
                  temp_e += m.energy;
                  temp_w += m.value;
                });
              }
            }
            temp_data.weight = temp_w;
            temp_data.energy = temp_e;
            totalData.push(temp_data);
            dataX.unshift(s.date);
            dataY.unshift(temp_e);
          });

          energyRef.current.setData(totalData, weight, energy);
          setLineKjData({ dataX, dataY, gb: (66 + (13.7 * todayWeight) + (5 * MYHEIGHT) - (6.8 * MYYEAR)) * 4.184 });
        });
      });
    });

  }, []);

  return (
    <>
      <h1 className={'page-title'}>虚玩玩加油！减肥！减肥！！减肥！！！</h1>
      <List data={listData} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Line data={lineData} style={{ width: 600 }} />
        <LineKJ data={lineKjData} style={{ width: 600 }} />
      </div>
      <InfoFillIn />
      <EnergyDaily ref={energyRef} />
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
