import _ from 'lodash';

export default function() {
  return fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(res => res.json())
    .then(data => {
      return _.keyBy(data, 'symbol')
    });
}
