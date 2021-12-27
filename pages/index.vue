<template>
  <div>
    <v-img src="/Grey Dawn.jpg" :cover="true" width="100%"> </v-img>
    <v-container id="dashboard-view" fluid tag="section">
      <br />
      <v-row>
        <v-col
          v-for="({ actionIcon, actionText, ...attrs }, i) in priceList"
          :key="i"
          cols="12"
          md="6"
          lg="3"
        >
          <MaterialStatsCard v-bind="attrs">
            <template #actions>
              <v-icon class="mr-2" small v-text="actionIcon" />
              <div class="text-truncate">
                {{ actionText }}
              </div>
            </template>
          </MaterialStatsCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MaterialStatsCard from '~/components/MaterialStatsCard.vue'
const rtf = new Intl.RelativeTimeFormat('en')

export default {
  mounted: function () {
    setInterval(this.refreshPriceList, 7777)
  },
  components: {
    MaterialStatsCard,
  },
  computed: {
    priceList: function () {
      var pList = this.$store.getters['priceStore/getPriceList']
      var displayPriceList = []
      for (let x in pList) {
        displayPriceList.push({
          actionIcon: 'mdi-history',
          actionText:
            'Last updated' +
            ' ' +
            rtf.format((pList[x].timestamp - Date.now()) / 1000, 'second'),
          color: '#FFFFFF',
          icon: pList[x].exchangeName,
          title: pList[x].exchangeName + ' Price',
          value: pList[x].usdValue,
        })
      }
      return displayPriceList
    },
  },
  methods: {
    refreshPriceList: function () {
      this.$store.dispatch('priceStore/refreshPriceList')
    },
  },
}
</script>
