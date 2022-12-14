const LBankUrl = "https://api.lbkex.com/v2/ticker/24hr.do?symbol=egc_usdt";
var axios = require('axios');
const currency = require("currency.js");

var LBankService = {

    getPrice: async function (setExchangePrice) {

        var lBankData;
        var price;

        try {
            lBankData = await axios.get(LBankUrl);
            price = {
                exchangeName: 'LBank',
                pair: "EGC/USDT",
                usdValue: currency(lBankData.data.data[0].ticker.latest, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://www.lbank.info/exchange/egc/usdt',
                exchangeVolume: currency(lBankData.data.data[0].ticker.turnover, {
                    precision: 9
                }).format()
            }
        } catch (e) {
            console.log("Error in LBank Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = LBankService;