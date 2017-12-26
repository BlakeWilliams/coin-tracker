import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { ipcRenderer } from "electron";

import Coin from "./coin";

import fetchCoins from "./fetchCoins";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filter: "", savedCoins: null, coins: null };
  }

  componentDidMount() {
    fetchCoins().then(coins => {
      this.setState({ coins });
    });

    ipcRenderer.on("coinsUpdated", (_event, savedCoins) => {
      this.setState({ savedCoins });
    });
    ipcRenderer.send("getSavedCoins");
  }

  get coins() {
    const { filter } = this.state;

    if (filter != "") {
      const searchValue = filter.toLowerCase();

      return this.state.coins.filter(coin => {
        const matchesSymbol = coin.symbol.toLowerCase().includes(searchValue);
        const matchesName = coin.name.toLowerCase().includes(searchValue);

        return matchesName || matchesSymbol;
      });
    } else {
      return this.state.coins;
    }
  }

  render() {
    const { filter, savedCoins } = this.state;
    const coins = this.coins;

    if (this.state.coins) {
      return (
        <div className="coin-container">
          <input
            className="filter"
            onChange={e => this.setState({ filter: e.target.value })}
            placeholder="Filter coins by name..."
            value={filter}
          />
          {_.values(coins).map(coin => (
            <Coin
              key={coin.symbol}
              coin={coin}
              savedCoin={savedCoins[coin.symbol]}
            />
          ))}
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
