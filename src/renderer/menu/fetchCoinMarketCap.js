import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
import _ from "lodash";

axios.defaults.adapter = httpAdapter;

export default function() {
  return axios
    .get("https://api.coinmarketcap.com/v1/ticker/?limit=300")
    .then(res => {
      return _.keyBy(res.data, "symbol");
    });
}
