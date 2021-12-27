/** Root store module
 * nuxtServerInit can only appear here and chaining would need to be done
 * State needs to be a function and Mutations, Actions and Getters need to be objects
 * File name matters and it gives modules its module name
 * 
 * Access namespaced getter
 * this.$store.getters['yourModuleName/someGetterMethod']
 * 
 * Dispatch namespaced
 * this.$store.dispatch('yourModuleName/doSomething')
 * 
 * Dispatch namespaced with params
 * this.$store.getters['yourModuleName/someGetterMethod'](myParam)
 */

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    async nuxtServerInit(vuexContext, context) {
        return await context.app.$axios.$get('/prices/all', {
            params: {
                authK: process.env.EGC_APP_KEY
            }
        }).then(data => {
            vuexContext.commit('priceStore/setPriceList', data);
        }).catch(e => console.error(e));
    }
}

export const getters = {
}