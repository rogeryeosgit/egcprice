const BTUrl = "https://openapi.bitrue.com/api/v1/ticker/24hr?symbol=EGCUSDT";
var axios = require('axios');
const currency = require("currency.js");

var BitrueService = {

    getPrice: async function (setExchangePrice) {

        var mData;
        var price;

        try {
            mData = await axios.get(BTUrl);
            price = {
                exchangeName: 'Bitrue',
                usdValue: currency(mData.data[0].lastPrice, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.bitrue.com/trade/egc_usdt',
                exchangeVolume: currency(mData.data[0].quoteVolume, {
                    precision: 9
                }).format()
            }
        } catch (e) {
            console.log("Error in Bitrue Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = BitrueService;