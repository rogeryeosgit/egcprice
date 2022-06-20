const BiboxUrl = "https://api.bibox.com/v3/mdata/ticker?pair=EGC_USDT";
var axios = require('axios');
const currency = require("currency.js");

var BiboxService = {

    getPrice: async function (setExchangePrice) {

        var bbData;
        var price;

        try {
            bbData = await axios.get(BiboxUrl);
            var eV24Hr = calculate24HrVolume(bbData.data.result.vol, bbData.data.result.high, bbData.data.result.low);
            price = {
                exchangeName: 'Bibox',
                usdValue: currency(bbData.data.result.last, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.bibox.com/en/exchange/basic/EGC_USDT',
                exchangeVolume: eV24Hr
            }
        } catch (e) {
            console.log("Error in Bibox Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    }
}

function calculate24HrVolume(volume, high, low) {

    var bbHigh = currency(high, {
        precision: 9
    }).format();
    var bbLow = currency(low, {
        precision: 9
    }).format();
    var averagePrice = currency(bbHigh, {
        precision: 10
    }).add(bbLow).divide(2);
    var estimatedVolumeInCurrency = currency(averagePrice, {
        precision: 10
    }).multiply(volume).format();
    return estimatedVolumeInCurrency; // Exact Bibox 24hr volume not available
}

module.exports = BiboxService;