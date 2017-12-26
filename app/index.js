import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import Coin from './coin';
import fetchCoinMarketCap from './fetchCoinMarketCap';

const TRACKED = ['BTC', 'BCH', 'ETH', 'LTC', 'MIOTA', 'TRX', 'OMG', 'FUN'];
const REFRESH_INTERVAL = 45000;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { coinData: null };
  }

  updateCoins() {
    fetchCoinMarketCap().then(data => {
      this.setState({ coinData: data });
    })
  }

  componentDidMount() {
    this.updateCoins();

    this.interval = setInterval(() => {
      this.updateCoins();
    }, REFRESH_INTERVAL);
  }

  render() {
    const { coinData } = this.state;

    if (!coinData) {
      return (
        <h1>Loading...</h1>
      );
    } else {
      const tracking = _.values(_.pick(coinData, TRACKED));

      return (
        <div className="coin-container">
          {tracking.map(coin =>
            <Coin key={coin.id} data={coin}/>
          )}
        </div>
      );
    }
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
