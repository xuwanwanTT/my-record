import React from 'react';
import './list.css';

export default (props) => {
  const { header, content, width } = props.data || { header: [], content: [], width: [] };

  return (
    <div className={'list-wrap'}>

      <div className={'list-header'}>
        {header.map((s, i) => <div key={'header' + i} style={{
          flex: width[i]
        }}>{s}</div>)}
      </div>

      <div className={'list-content-wrap'}>
        <div className={'list-content'}>
          {content.map((s, i) => (
            <div key={'content' + i} className={'list-item'}>
              {s.map((m, n) => {
                return <div key={'item' + i + n} style={{
                  flex: width[n]
                }}>{
                    m instanceof Array ?
                      m.map((k, j) => (
                        <div key={'sport' + i + n + j}>
                          <span>{k.name} </span>
                          <span> {k.value}</span>
                          <span>{k.unit}</span>
                        </div>
                      ))
                      : m
                  }</div>
              })}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
