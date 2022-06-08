var MoralisService = require('../services/MoralisService');
var BitMartService = require('../services/BitMartService');
var ZTGlobalService = require('../services/ZTGlobalService');
var LBankService = require('../services/LBankService');
var BiboxService = require('../services/BiboxService');
var HotbitService = require('../services/HotbitService');
var BitrueService = require('../services/BitrueService');
var AveragePriceEGCService = require('../services/AveragePriceEGCService');
var DigiFinexService = require('./DigiFinexService');
var CoinsbitService = require('../services/CoinsbitService');
var cron = require('node-cron');
const NodeCache = require('node-cache');
const EGCCache = new NodeCache();

var CacheService = {
  init: function () {
    getUpdatedPrices() // initial setup
    cron.schedule('*/20 * * * * *', async () => {
      getUpdatedPrices()
    })
  },

  getPriceList: function () {
    var priceList = [];
    var price;
    
    priceList.push(AveragePriceEGCService.getAveragePrice(EGCCache));

    price = EGCCache.get('PancakeSwap-V2');
    if (price == undefined) {
      console.log("CacheService: Pancakeswap price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('BitMart');
    if (price == undefined) {
      console.log("CacheService: BitMart price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('ZTGlobal');
    if (price == undefined) {
      console.log("CacheService: ZTGlobal price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('LBank');
    if (price == undefined) {
      console.log("CacheService: LBank price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('Bibox');
    if (price == undefined) {
      console.log("CacheService: Bibox price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('Hotbit');
    if (price == undefined) {
      console.log("CacheService: Hotbit price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('Bitrue');
    if (price == undefined) {
      console.log("CacheService: Bitrue price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('DigiFinex');
    if (price == undefined) {
      console.log("CacheService: DigiFinex price not in cache");
    } else {
      priceList.push(price);
    }

    price = EGCCache.get('Coinsbit');
    if (price == undefined) {
      console.log("CacheService: Coinsbit price not in cache");
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

  try {
    BitrueService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for Bitrue : ' + error)
  }

  try {
    DigiFinexService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for DigiFinex : ' + error)
  }

  try {
    CoinsbitService.getPrice(setExchangePrice)
  } catch (error) {
    console.log('CacheService: Error Getting Price for Coinsbit : ' + error)
  }
}
