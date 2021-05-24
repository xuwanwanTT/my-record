import React from 'react';

class SportForm extends React.Component {

  onSubmit() {
    if (this.props.onSubmit instanceof Function) this.props.onSubmit(this.props.data);
  }

  onClose() {
    if (this.props.onClose instanceof Function) this.props.onClose();
  }

  render() {
    const data = this.props.data || [];
    return (
      <div>
        <div>
          {data.map((s, i) => (
            <div></div>
          ))}
        </div>
        <div onClick={this.onSubmit.bind(this)}>确认</div>
        <div onClick={this.onClose.bind(this)}>取消</div>
      </div>
    );
  }
};

export default SportForm;
