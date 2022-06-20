const CoinsbitUrl = "https://api.coinsbit.io/api/v1/public/ticker?market=EGC_USDT";
var axios = require('axios');
const currency = require("currency.js");

var CoinsbitService = {

    getPrice: async function (setExchangePrice) {

        var cbData;
        var price;

        try {
            cbData = await axios.get(CoinsbitUrl);

            if (cbData.data.success == false) {
                console.log("Error in Coinsbit Service, Market is not available");
                return;
            }
            price = {
                exchangeName: 'Coinsbit',
                usdValue: currency(cbData.data.result.last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://coinsbit.io/trade/EGC_USDT',
                exchangeVolume: currency(cbData.data.result.deal, {
                    precision: 9
                }).format()
            }
        } catch (e) {
            console.log("Error in Coinsbit Service : " + e);
            return e;
        }
        console.log("Price: " + price.usdValue);
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = CoinsbitService;