import React from "react";
import { ipcRenderer } from "electron";
import formatCurrency from "format-currency";
import _ from "lodash";

class Stats extends React.Component {
  openSettings() {
    ipcRenderer.send("openSettings");
  }

  get total() {
    const { coinData, savedCoins } = this.props;
    const keyedCoinData = _.keyBy(coinData, "symbol");

    return _.chain(savedCoins)
      .pickBy({ enabled: true })
      .mapValues(coin => parseFloat(coin.total))
      .omitBy(coinTotal => _.isNaN(coinTotal))
      .map((total, key) => {
        const price = keyedCoinData[key].price_usd;
        return price * total;
      })
      .reduce((acc, value) => acc + value)
      .value();
  }

  render() {
    return (
      <div className="status">
        <span className="total">${formatCurrency(this.total)}</span>
        <a onClick={() => this.openSettings()} href="#">
          <i className="fa fa-gear" />
        </a>
      </div>
    );
  }
}

export default Stats;
