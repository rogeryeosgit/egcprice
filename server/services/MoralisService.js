const Moralis = require('moralis/node');
const serverUrl = 'https://lt3zg5fydzzc.usemoralis.com:2053/server'; // process.env.MORALIS_SERVER_URL;
const appID = 'L2jhlkp3BIc0MnNo730wmvjwCHOnY7NFzr9PSdHl'; // process.env.MORALIS_APP_ID;
const currency = require("currency.js");

var MoralisService = {

    init: function () {
        Moralis.start({ serverUrl, appID });
    },

    getPrice: async function (exchangeName) {
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
                usdValue: currency(mData.usdPrice, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
            }
        } catch (e) {
            console.log("Error in Moralis Service : " + e);
            return e;
        }
        return price;
    }
};

module.exports = MoralisService;


