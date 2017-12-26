import _ from "lodash";

export default function() {
  return fetch("https://api.coinmarketcap.com/v1/ticker/?limit=300").then(res =>
    res.json(),
  );
}
