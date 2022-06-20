const HotbitUrl = "https://api.hotbit.io/api/v1/market.status_today?market=EGC/USDT";
var axios = require('axios');
const currency = require("currency.js");

var HotbitService = {

    getPrice: async function (setExchangePrice) {

        var hbData;
        var price;

        try {
            hbData = await axios.get(HotbitUrl);
            price = {
                exchangeName: 'Hotbit',
                usdValue: currency(hbData.data.result.last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.hotbit.io/exchange?symbol=EGC_USDT',
                exchangeVolume: currency(hbData.data.result.deal, {
                    precision: 9
                }).format()
            }
        } catch (e) {
            console.log("Error in Hotbit Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = HotbitService;