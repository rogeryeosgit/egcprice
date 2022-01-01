const BiboxUrl = "https://api.bibox.com/v3/mdata/ticker?pair=EGC_USDT";
var axios = require('axios');
const currency = require("currency.js");

var BiboxService = {

    getPrice: async function (setExchangePrice) {

        var bbData;
        var price;

        try {
            bbData = await axios.get(BiboxUrl);
            price = {
                exchangeName: 'Bibox',
                usdValue: currency(bbData.data.result.last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.bibox.com/en/exchange/basic/EGC_USDT'
            }
        } catch (e) {
            console.log("Error in Bibox Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = BiboxService;