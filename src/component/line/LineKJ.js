import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

const MYYEAR = new Date().getFullYear() - 1993;
const MYHEIGHT = 175;

export default (props) => {
  const domWrapRef = useRef();
  let diff = 0;
  let timer = 0;

  const doAni = () => {
    if (diff) return false;
    clearInterval(timer);
    const myChat = echarts.init(domWrapRef.current);
    const { dataX, dataY, gb } = props.data;
    timer = setInterval(() => {
      diff++;
      let datax = dataX.slice(0, 1 + diff);
      let datay = dataY.slice(0, 1 + diff);
      if (diff > dataX.length) {
        diff = 0;
        clearInterval(timer);
      }
      myChat.setOption(initOption(datax, datay, gb, diff), true);
    }, 800);
  };

  const initOption = (dataX, dataY, gb, diff) => {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}: {c} kj'
      },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false }, // 刻度 线
        data: dataX
      },
      yAxis: {
        type: 'value',
        name: 'KJ',
        scale: true,
        // max: 12000,
        axisTick: { show: false }, // 刻度 线
      },
      series: [
        {
          type: 'line',
          name: '热量',
          data: dataY,
          markLine: {
            data: [
              { name: '标准值', yAxis: (66 + (13.7 * gb[diff]) + (5 * MYHEIGHT) - (6.8 * MYYEAR)) * 4.184 },
            ]
          }
        }
      ]
    };
  };

  useEffect(() => {
    const myChat = echarts.init(domWrapRef.current);
    const { dataX, dataY, gb } = props.data;
    myChat.setOption(initOption(dataX, dataY, gb, 0), true);
  }, [props.data]);

  return <div ref={domWrapRef}
    onClick={doAni} style={{
      width: 800, height: 300,
      ...props.style
    }} />;
};
