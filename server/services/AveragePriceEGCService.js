const currency = require("currency.js");

var AveragePriceEGCService = {

    getAveragePrice: function (EGCCache) {

        // Getting average price for EGC
        var totalPrice = 0;
        var averagePrice;

        // Getting total EGC price for all exchanges
        EGCCache.keys().forEach(exchange => {
            totalPrice = currency(totalPrice, {
                precision: 9
            }).add(currency((EGCCache.get(exchange).usdValue), {
                precision: 9
            }));
        });

        // Average all the prices from exchanges
        averagePrice = currency(totalPrice, {
            precision: 9
        }).divide(EGCCache.keys().length);

        var averageData = {
            exchangeName: 'Average',
            usdValue: currency(averagePrice, {
                precision: 9
            }).format(),
            timestamp: Date.now(),
            exchangeURL: 'https://www.egcprice.info'
        }
        return averageData;
    },
}

module.exports = AveragePriceEGCService;