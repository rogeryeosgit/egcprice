const BMUrl = "https://api-cloud.bitmart.com/spot/v1/ticker?symbol=EGC_USDT";
var axios = require('axios');
const currency = require("currency.js");

var BitMartService = {

    getPrice: async function () {

        var mData;
        var price;

        try {
            mData = await axios.get(BMUrl);
            price = {
                exchangeName: 'BitMart',
                usdValue: currency(mData.data.data.tickers[0].last_price, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
            }
        } catch (e) {
            console.log("Error in BitMart Service : " + e);
            return e;
        }
        return price;
    },
}

module.exports = BitMartService;