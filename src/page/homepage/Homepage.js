import React, { useEffect, useState } from 'react';
import './homepage.less';
import axios from 'axios';
import moment from 'moment';
import Line from '../../component/line/Line.js';
import LineKJ from '../../component/line/LineKJ.js';
import Dialog from '../../component/dialog/Dialog.js';
import DirtyTalk from '../../component/dirty-talk/DirtyTalk.js';
import FromList from '../../component/form/FormList.js';
import List from '../../component/list/List.js';

const BMIGB = 22;

const HEIGHT = 1.76;

const WEIGHTGB = BMIGB * (HEIGHT * HEIGHT);

const BASEURL = window.BASEURL;

export default () => {
  const [showForm, setShowForm] = useState(false);
  const [recordListShow, setRecordListShow] = useState(false);
  const [dataX, setDataX] = useState([]);
  const [weightDataY, setWeightDataY] = useState([]);
  const [foodDataY, setFoodDataY] = useState([]);
  const [sentence, setSentence] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [formData, setFormData] = useState({
    weight: JSON.stringify({}),
    sport: JSON.stringify([]),
    date: JSON.stringify(date),
    food: JSON.stringify([
      { name: "早餐", data: [] },
      { name: "午餐", data: [] },
      { name: "晚餐", data: [] },
      { name: "零食", data: [] }
    ])
  });

  const btnList = [
    { name: '开启记录', fn: setShowForm },
  ];

  const postRecord = (data) => {
    axios({
      baseURL: BASEURL,
      method: 'post',
      url: '/my-record/join-record',
      data: {
        userId: 1,
        ...data
      }
    }).then(res => {
      setShowForm(false);
      getData();
    }).catch(err => {
      alert(err);
    })
  };

  const getData = (date) => {
    date && setDate(date);
    axios({
      baseURL: BASEURL,
      method: 'get',
      url: `/my-record/data?userId=1${date ? '&date=' + date : ''}`,
    }).then(res => {
      const resData = res.data.data;
      if (date) {
        let resFormData = {
          weight: {},
          sport: [],
          date,
          food: [
            { name: "早餐", data: [] },
            { name: "午餐", data: [] },
            { name: "晚餐", data: [] },
            { name: "零食", data: [] }
          ]
        };
        for (let n in resFormData) {
          if (resData.length) {
            resFormData[n] = resData[0][n] ? JSON.stringify(resData[0][n]) : JSON.stringify(resFormData[n]);
          } else {
            resFormData[n] = JSON.stringify(resFormData[n]);
          }
        }
        setFormData(resFormData);
      } else {
        const dataX = [];
        const foodDataY = [];
        const weightDataY = [];

        resData.forEach(s => {
          const { date, food, weight, sport, foodData } = s;
          const { morning, evening } = weight;
          dataX.unshift(date);
          weightDataY.unshift(getAverage(morning, evening));
          foodDataY.unshift(foodData.total_kj);

        });

        setDataX(dataX);
        setFoodDataY(foodDataY);
        setWeightDataY(weightDataY);
      }
    }).catch(err => {
      alert('数据加载错误', err);
    });

    axios({
      baseURL: BASEURL,
      method: 'get',
      url: `/my-record/sentence`,
    })
      .then(res => {
        setSentence(res.sentence);
      })
      .catch(err => {
        console.log('请求标语数据错误', err);
      });
  };

  const openDialog = (date) => {
    getData(date);
    setShowForm(true);
  }

  useEffect(() => {
    getData();
  }, []);

  const todayWeight = weightDataY.slice(-1);

  return (
    <>

      <div className={'homepage-today-info'}>
        <div className={'line'}>当前指标 <span>{judgeWeight(todayWeight)}</span></div>
        <div className={'line'}>距标准体重还差</div>
        <div className={'line num'}>{(todayWeight - WEIGHTGB).toFixed(2)} KG</div>
      </div>

      <DirtyTalk data={sentence} />

      <div className={'button-wrap'}>
        {btnList.map((s, i) => (
          <button key={'btn' + i} onClick={() => {
            s.fn(true);
            getData(date);
          }}>{s.name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Line dataX={dataX} dataY={weightDataY} gb={WEIGHTGB}
          itemClick={(date) => openDialog(date)}
          style={{ width: '45%', minWidth: 365, height: 325 }} />

        <LineKJ dataX={dataX} dataY={foodDataY} gb={weightDataY}
          itemClick={(date) => openDialog(date)}
          style={{ width: '45%', minWidth: 365, height: 325 }} />
      </div>

      <Dialog show={showForm}>
        <FromList {...formData}
          onChangeDate={getData}
          onSubmit={postRecord}
          onClose={() => { setShowForm(false) }} />
      </Dialog>

      <Dialog show={true || recordListShow}>
        <List {...formData}
          onChangeDate={getData}
          onClose={() => { setRecordListShow(false) }} />
      </Dialog>

    </>
  );
};

function judgeWeight(data, sex) {
  let res = '--';
  const arr = [20, 25, 30, 35];
  const arrName = ['过轻', '适中', '过重', '肥胖'];
  for (let i = 0; i < arr.length; i++) {
    if (data > 35) {
      res = '非常特别极其肥胖';
    }
    if (data < arr[i]) {
      res = arrName[i];
      break;
    }
  }
  return res;
};

function getAverage() {
  let len = arguments.length;
  let length = len;
  let arr = [];
  for (let i = 0; i < len; i++) {
    let item = arguments[i];
    if (item) {
      arr.push(item);
    } else {
      length--;
    }
  }
  return arr.length ? arr.reduce((a, b) => a + b) / (length || 1) : 0;
}
