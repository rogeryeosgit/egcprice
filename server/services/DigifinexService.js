const DFUrl = "https://openapi.digifinex.com/v3/ticker?symbol=egc_usdt";
var axios = require('axios');
const currency = require("currency.js");

var DigiFinexService = {

    getPrice: async function (setExchangePrice) {

        var dfData;
        var price;

        try {
            dfData = await axios.get(DFUrl);
            price = {
                exchangeName: 'DigiFinex',
                usdValue: currency(dfData.data.ticker[0].last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.digifinex.com/en-ww/trade/USDT/EGC'
            }
        } catch (e) {
            console.log("Error in DigiFinex Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = DigiFinexService;