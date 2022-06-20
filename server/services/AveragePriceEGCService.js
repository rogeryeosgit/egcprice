const currency = require("currency.js");

var AveragePriceEGCService = {

    getAveragePrice: function (EGCCache) {

        // Getting average price for EGC
        var totalPrice = 0;
        var totalVolume = 0;
        var averagePrice = 0;

        // Getting total EGC price and volume for all exchanges
        EGCCache.keys().forEach(exchange => {
            totalPrice = currency(totalPrice, {
                precision: 9
            }).add(currency((EGCCache.get(exchange).usdValue), {
                precision: 9
            }));

            totalVolume = currency(totalVolume, {
                precision: 9
            }).add(currency((EGCCache.get(exchange).exchangeVolume), {
                precision: 9
            }));
        });

        // Calculating average for all the prices from exchanges
        EGCCache.keys().forEach(exchange => {
            var priceComponent = currency((EGCCache.get(exchange).exchangeVolume), {
                precision: 14
            }).divide(currency(totalVolume, {
                precision: 14
            })).multiply(currency(EGCCache.get(exchange).usdValue, {
                precision: 14
            }));

            averagePrice = currency(averagePrice, {
                precision: 9
            }).add(priceComponent);
        });

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