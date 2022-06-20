const CoinGeckoUrl = "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=evergrowcoin";
var axios = require('axios');
const currency = require("currency.js");

var CoinGeckoService = {

    getPrice: async function (setExchangePrice) {

        var cbData;
        var price;

        try {
            cbData = await axios.get(CoinGeckoUrl);
            price = {
                exchangeName: 'PancakeSwap',
                usdValue: currency(cbData.data.tickers[0].converted_last.usd, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://pancakeswap.finance/info/token/0xc001bbe2b87079294c63ece98bdd0a88d761434e/',
                exchangeVolume: currency(cbData.data.tickers[0].converted_volume.usd, {
                    precision: 9
                }).format()
            }
        } catch (e) {
            console.log("Error in CoinGecko Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = CoinGeckoService;