const rtf = new Intl.RelativeTimeFormat('en');

export const state = () => ({
    priceList: [], // list of priceData
    displayPriceList: []
})

export const mutations = {
    setPriceList(state, priceList) {
        state.priceList = priceList;
    },
    clearPriceList(state) {
        state.priceList = [];
    },
    addToPriceList(state, priceData) {
        state.priceList.$set(state.priceList.length, priceData);
    },

    /*
    Each priceData will have
        - exchangeName
        - usdValue
        - timestamp
    */

    deletePrice(state, exchangeName) {
        for (let i in state.priceList) {
            if (state.priceList[i].exchangeName === exchangeName) {
                state.priceList.splice(i, 1);
            }
        }
    },
    updatePriceData(state, priceData) {
        for (let i in state.priceList) {
            if (state.priceList[i].exchangeName === priceData.exchangeName) {
                state.priceList[i].usdValue = priceData.usdValue;
                state.priceList[i].timestamp = priceData.timestamp;
            }
        }
    }
}

export const actions = {

    async refreshPriceList(vuexContext, req) {
        return await this.$axios.$get('/prices/all', {
            params: {
                authK: process.env.EGC_APP_KEY
            }
        }).then(data => {
            vuexContext.commit('setPriceList', data);
        }).catch(e => {
            console.log(e);
        });
    }
}

export const getters = {
    getPriceList(state) {
        return state.priceList;
    },
    getPriceUsingExchangeName: (state) => (exchangeName) => {
        return state.priceList.find(x => x.exchangeName === exchangeName);
    }
}