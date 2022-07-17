import React from "react";
import MoneyInput from "./components/Moneyinput";

function toVnd(usd) {
  return usd * 23455;
}

function toUsd(vnd) {
  return vnd / 23455;
}

function Convert(money, convert) {
  const input = parseFloat(money);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleVndChange = this.handleVndChange.bind(this);
    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.state = { money: "", scale: "v" };
  }

  handleVndChange(money) {
    this.setState({ scale: "v", money });
  }

  handleUsdChange(money) {
    this.setState({ scale: "u", money });
  }

  render() {
    const scale = this.state.scale;
    const money = this.state.money;
    const vnd = scale === "u" ? Convert(money, toVnd) : money;
    const usd = scale === "v" ? Convert(money, toUsd) : money;

    return (
      <div className="container">
        <MoneyInput
          scale="v"
          money={vnd}
          onmoneyChange={this.handleVndChange}
        />
        <MoneyInput
          scale="u"
          money={usd}
          onmoneyChange={this.handleUsdChange}
        />
      </div>
    );
  }
}
