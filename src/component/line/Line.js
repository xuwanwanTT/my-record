import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

export default (props) => {
  const domWrapRef = useRef();
  let diff = 0;
  let timer = 0;

  const doAni = () => {
    if (timer) return false;
    clearInterval(timer);
    const myChat = echarts.init(domWrapRef.current);
    const { dataX, dataY, gb } = props.data;
    timer = setInterval(() => {
      diff++;
      let datax = dataX.slice(0, 1 + diff);
      let datay = dataY.slice(0, 1 + diff);
      if (diff > dataX.length) clearInterval(timer);
      myChat.setOption(initOption(datax, datay, gb), true);
    }, 800);
  };

  const initOption = (dataX, dataY, gb) => {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}: {c}kg'
      },
      grid: {
        left: '3%',
        right: '8%',
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
        scale: true,
        name: 'KG',
        axisTick: { show: false }, // 刻度 线
      },
      series: [
        {
          type: 'line',
          name: '体重',
          data: dataY,
          markLine: {
            data: [
              { name: '标准值', yAxis: gb },
            ]
          }
        }
      ]
    };;
  }

  useEffect(() => {
    const myChat = echarts.init(domWrapRef.current);
    const { dataX, dataY, gb } = props.data;

    myChat.setOption(initOption(dataX, dataY, gb), true);

  }, [props.data]);

  return <div ref={domWrapRef}
    onClick={doAni}
    style={{
      width: 800, height: 300,
      ...props.style
    }} />;
};
