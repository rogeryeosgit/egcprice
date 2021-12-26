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
    updatePlan(state, priceData) {
        for (let i in state.priceList) {
            if (state.priceList[i].exchangeName === priceData.exchangeName) {
                state.priceList[i].usdValue = priceData.usdValue;
                state.priceList[i].timestamp = priceData.timestamp;
            }
        }
    }
}

export const actions = {

    /*

    Refresh PriceList or Per Exchange?

    async refreshPassage(vuexContext, req) {
        var chosenPlan = vuexContext.rootState.planStore.chosenPlan;
        return await this.$axios.$get('/passages/today', {
            params: {
                planID: chosenPlan
            }
        }).then(data => {
            vuexContext.commit('setTodaysPassage', data.passages[0])
            vuexContext.commit('setTodaysReference', data.canonical)
        }).catch(e => {
            console.log(e);
        });
    }
    */
}

export const getters = {
    getPriceList(state) {
        return state.priceList;
    },
    getPriceUsingExchangeName: (state) => (exchangeName) => {
        return state.priceList.find(x => x.exchangeName === exchangeName);
    }
}