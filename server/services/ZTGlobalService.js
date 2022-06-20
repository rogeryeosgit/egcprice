const ZTGlobalUrl = "https://www.ztb.im/api/v1/trades?symbol=EGC_USDT&size=1";
const ZTGlobalKLineUrl = "https://www.ztb.im/api/v1/kline?symbol=EGC_USDT&type=day";
var axios = require('axios');
const currency = require("currency.js");

var ZTGlobalService = {

    getPrice: async function (setExchangePrice) {

        var ztData;
        var price;

        try {
            ztData = await axios.get(ZTGlobalUrl);
            ztKLineData = await axios.get(ZTGlobalKLineUrl);
            var eV24Hr = calculate24HrVolume(ztKLineData.data[0][5], ztKLineData.data[0][2], ztKLineData.data[0][3]);
            price = {
                exchangeName: 'ZTGlobal',
                usdValue: currency(ztData.data[0].price, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.ztb.im/exchange?coin=EGC_USDT',
                exchangeVolume: eV24Hr
            }
        } catch (e) {
            console.log("Error in ZTGlobal Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

function calculate24HrVolume(volume, high, low) {

    var ztHigh = currency(high, {
        precision: 9
    }).format();
    var ztLow = currency(low, {
        precision: 9
    }).format();
    var averagePrice = currency(ztHigh, {
        precision: 10
    }).add(ztLow).divide(2);
    var estimatedVolumeInCurrency = currency(averagePrice, {
        precision: 10
    }).multiply(volume).format();
    return estimatedVolumeInCurrency; // Exact ZTGlobal 24hr volume not available
}

module.exports = ZTGlobalService;