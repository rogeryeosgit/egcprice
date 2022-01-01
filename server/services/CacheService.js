var MoralisService = require('../services/MoralisService');
var BitMartService = require('../services/BitMartService');
var ZTGlobalService = require('../services/ZTGlobalService');
var LBankService = require('../services/LBankService');
var BiboxService = require('../services/BiboxService');
var HotbitService = require('../services/HotbitService');
var cron = require('node-cron');
const NodeCache = require('node-cache');
const EGCCache = new NodeCache();

var CacheService = {
  init: function() {
    getUpdatedPrices() // initial setup
    cron.schedule('*/20 * * * * *', async () => {
      getUpdatedPrices()
    })
  },

  getPriceList: function() {
    var priceList = [];
    var price;

    price = EGCCache.get('PancakeSwap-V2');
    if ( price == undefined ) {
        console.log("CacheService: Pancakeswap price not in cache");
    } else {
        priceList.push(price);
    }

    price = EGCCache.get('BitMart');
    if ( price == undefined ) {
        console.log("CacheService: BitMart price not in cache");
    } else {
        priceList.push(price);
    }

    price = EGCCache.get('ZTGlobal');
    if ( price == undefined ) {
        console.log("CacheService: ZTGlobal price not in cache");
    } else {
        priceList.push(price);
    }

    price = EGCCache.get('LBank');
    if ( price == undefined ) {
        console.log("CacheService: LBank price not in cache");
    } else {
        priceList.push(price);
    }

    price = EGCCache.get('Bibox');
    if ( price == undefined ) {
        console.log("CacheService: Bibox price not in cache");
    } else {
        priceList.push(price);
    }

    price = EGCCache.get('Hotbit');
    if ( price == undefined ) {
        console.log("CacheService: Hotbit price not in cache");
    } else {
        priceList.push(price);
    }

    return priceList;
  }
}

module.exports = CacheService

function setExchangePrice(exchangeName, priceData) {
  EGCCache.set(exchangeName, priceData, 3600)
}

// Function to get prices from all exchanges
function getUpdatedPrices() {
  // getting PCS price
  try {
    MoralisService.getPrice('PancakeSwap-V2', setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for PCS : ' + error)
  }

  try {
    BitMartService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for BitMart : ' + error)
  }

  try {
    ZTGlobalService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for ZT Global : ' + error)
  }

  try {
    LBankService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for LBank : ' + error)
  }

  try {
    BiboxService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for Bibox : ' + error)
  }

  try {
    HotbitService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for Hotbit : ' + error)
  }
}
