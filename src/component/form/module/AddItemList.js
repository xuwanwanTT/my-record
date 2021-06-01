import React from 'react';
import MyInput from './MyInput';

class AddItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || []
    };
  }

  changeValue(index, e) {
    let data = JSON.parse(JSON.stringify(this.state.data));
    data[index].value = e.target.value;
    this.setState({ data });
  }

  addItem() {
    let data = JSON.parse(JSON.stringify(this.state.data));
    data.push({});
    this.setState({ data });
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <div onClick={this.addItem.bind(this)}>add</div>
        {data.map((s, i) => <MyInput key={i} value={s.value} onChange={this.changeValue.bind(this, i)} />)}
      </div>
    );
  }
};

export default AddItemList;
