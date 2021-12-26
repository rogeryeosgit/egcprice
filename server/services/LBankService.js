const LBankUrl = "https://api.lbkex.com/v2/ticker/24hr.do?symbol=egc_usdt";
var axios = require('axios');
const currency = require("currency.js");

var LBankService = {

    getPrice: async function () {

        var lBankData;
        var price;

        try {
            lBankData = await axios.get(LBankUrl);
            price = {
                exchangeName: 'LBank',
                usdValue: currency(lBankData.data.data[0].ticker.latest, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
            }
        } catch (e) {
            console.log("Error in LBank Service : " + e);
            return e;
        }
        return price;
    },
}

module.exports = LBankService;