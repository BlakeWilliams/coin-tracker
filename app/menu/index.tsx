import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import { ipcRenderer } from "electron";

import Coin from "./coin";
import Stats from "./stats";
import fetchCoinMarketCap from "./fetchCoinMarketCap";
import { CoinMarketcapCoin } from "./fetchCoinMarketCap";

const REFRESH_INTERVAL = 45000;

interface State {
  savedCoins?: object,
  coinData?: CoinMarketcapCoin[] 
}

class App extends React.Component<any, State> {
  state: {
    savedCoins: null,
    coinData: null
  }

  interval?: NodeJS.Timer

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

    this.interval = global.setInterval(() => {
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
      const tracking:Array<CoinMarketcapCoin> = coinData!.filter(coin => {
        return _.includes(tracked, coin.symbol);
      })

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
