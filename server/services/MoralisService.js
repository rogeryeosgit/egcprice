const Moralis = require('moralis/node');
const serverUrl = process.env.MORALIS_SERVER_URL;
const appID = process.env.MORALIS_APP_ID;
const currency = require("currency.js");

// Decommissioning this in favor of CoinGecko
var MoralisService = {

    init: function () {
        Moralis.start({ serverUrl, appID });
    },

    getPrice: async function (exchangeName, setExchangePrice) {
        //Get token price on PancakeSwap v2 BSC
        const options = {
            address: "0xC001BBe2B87079294C63EcE98BdD0a88D761434e",
            chain: "bsc",
            exchange: exchangeName
        };

        var mData;
        var price;

        try {
            mData = await Moralis.Web3API.token.getTokenPrice(options);
            price = {
                exchangeName: exchangeName,
                pair: "EGC/USDT",
                usdValue: currency(mData.usdPrice, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
                exchangeURL: 'https://pancakeswap.finance/info/token/0xc001bbe2b87079294c63ece98bdd0a88d761434e/'
            }
        } catch (e) {
            console.log("Error in Moralis Service : " + e);
            return e;
        }
        setExchangePrice(exchangeName, price);
    }
};

module.exports = MoralisService;


