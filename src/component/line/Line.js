import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

export default (props) => {
  const domWrapRef = useRef();

  useEffect(() => {
    const myChat = echarts.init(domWrapRef.current);
    const { dataX, dataY, gb } = props.data;
    const option = {
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
    };

    myChat.setOption(option, true);

  }, [props.data]);

  return <div style={{ width: 800, height: 300, ...props.style }} ref={domWrapRef} />;
};
