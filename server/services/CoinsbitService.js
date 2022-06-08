const CoinsbitUrl = "https://api.coinsbit.io/api/v1/public/ticker?market=EGC_USDT";
var axios = require('axios');
const currency = require("currency.js");

var CoinsbitService = {

    getPrice: async function (setExchangePrice) {

        var cbData;
        var price;

        try {
            cbData = await axios.get(CoinsbitUrl);
            price = {
                exchangeName: 'Coinsbit',
                usdValue: currency(cbData.data.result.last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://coinsbit.io/trade/EGC_USDT'
            }
        } catch (e) {
            console.log("Error in Coinsbit Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = CoinsbitService;