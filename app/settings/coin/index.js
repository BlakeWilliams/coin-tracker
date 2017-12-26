import React from "react";
import { ipcRenderer } from "electron";

class Coin extends React.Component {
  get isChecked() {
    const { savedCoin } = this.props;

    return savedCoin && savedCoin.enabled;
  }

  get total() {
    const { savedCoin } = this.props;

    if (savedCoin) {
      return savedCoin.total;
    } else {
      return 0;
    }
  }

  updateValue(e) {
    const { coin } = this.props;

    ipcRenderer.send("updateTotal", coin.symbol, e.target.value);
  }

  toggleCoin() {
    const { coin } = this.props;
    ipcRenderer.send("toggleCoin", coin.symbol);
  }

  render() {
    const { coin } = this.props;

    return (
      <div className="coin">
        <div className="left">
          <img
            className="icon"
            src={`../cryptocurrency-icons/svg/color/${coin.symbol}.svg`}
          />
          <span className="name">{coin.name}</span>{" "}
          <span className="symbol">({coin.symbol})</span>
        </div>

        <input
          className="total"
          onChange={e => this.updateValue(e)}
          value={this.total}
        />
        <input
          className="switch"
          type="checkbox"
          id={`${coin.symbol}-toggle`}
          checked={this.isChecked}
          onChange={() => this.toggleCoin()}
        />
        <label className="switch-label" for={`${coin.symbol}-toggle`} />
      </div>
    );
  }
}

export default Coin;
