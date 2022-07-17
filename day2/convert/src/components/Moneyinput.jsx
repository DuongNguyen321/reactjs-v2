import React from "react";
const scaleNames = {
  v: "Vnd",
  u: "Usd",
};
export default class MoneyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onmoneyChange(e.target.value);
  }

  render() {
    const money = this.props.money;
    const scale = this.props.scale;
    return (
      <form action="" className={scaleNames[scale]}>
        <p>Enter money in {scaleNames[scale]}:</p>
        <input
          placeholder={scaleNames[scale]}
          value={money}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}