import * as React from "react";
import * as ReactDOM from "react-dom";
import { ipcRenderer } from "electron";
import _ from "lodash";

import Coin from "./coin";
import Stats from "./stats";
import fetchCoinMarketCap from "./fetchCoinMarketCap";

const REFRESH_INTERVAL = 45000;

interface State {
  savedCoins?: object,
  coinData?: object
}

interface AppInterface {
  interval?: number,
}

class App<AppInterface> extends React.Component<State, any> {
  constructor(props) {
    super(props);

    this.state = { savedCoins: null, coinData: null };
  }

  updateCoins() {
    fetchCoinMarketCap().then(data => {
      this.setState({ coinData: data });
    });
  }

  componentDidMount() {
    this.updateCoins();

    this.interval = setInterval(() => {
      this.updateCoins();
    }, REFRESH_INTERVAL);

    ipcRenderer.on("coinsUpdated", (_event, savedCoins) => {
      this.setState({ savedCoins });
    });
    ipcRenderer.send("getSavedCoins");
  }

  render() {
    const { savedCoins, coinData } = this.state;

    if (!coinData || !savedCoins) {
      return <h1>Loading...</h1>;
    } else {
      const tracked = _.keys(_.pickBy(savedCoins, "enabled"));
      const tracking = _.values(_.pick(coinData, tracked));

      return (
        <div className="coin-container">
          {tracking.map(coin => <Coin key={coin.id} data={coin} />)}
          <Stats coinData={coinData} savedCoins={savedCoins} />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
