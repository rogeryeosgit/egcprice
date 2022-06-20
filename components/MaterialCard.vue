<template>
  <AppCard v-bind="$attrs" class="v-card--material mt-4">
    <v-card-title class="align-start">
      <a :href="exchangeURL" target="_blank">
        <v-sheet :color="color" :width="fullHeader ? '100%' : undefined" class="overflow-hidden mt-n9 transition-swing v-card--material__sheet" elevation="6" max-width="100%" rounded>
          <v-theme-provider v-if="hasHeading" dark>
            <div v-if="icon" :class="iconSmall ? 'pa-7' : 'pa-8'">
              <!--<v-icon :large="!iconSmall" v-text="icon" /> -->
              <v-img :src="iconSRC" :alt="title + ' Exchange'" height="100" width="100"></v-img>
            </div>

            <slot name="heading" />

            <div v-if="heading" class="text-h4 white--text pa-7 v-card--material__title">
              {{ heading }}
            </div>
          </v-theme-provider>
        </v-sheet>
      </a>

      <div v-if="hasTitle" :class="fullHeader ? 'pt-4' : 'pl-3'" class="text-h4 v-card--material__title">

        <slot name="title" />

        <template v-if="title && !isAverage">
          <a :href="exchangeURL" target="_blank" :title="'EverGrow Coin on ' + title + ' Exchange'">{{title}}</a> EGC Price
        </template>
        <template v-if="title && isAverage">
          {{title}} EGC Price
        </template>
        <div class="text-subtitle-1 mb-n4">
          <slot name="subtitle" />

          <template v-if="subtitle">
            {{ subtitle }}
          </template>
        </div>
      </div>
    </v-card-title>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2 mx-4" />
      <v-card-actions class="px-4 text-caption grey--text">
        <slot name="actions" />
        <v-spacer />
        <template v-if="isPancakeSwap">
          Powered by CoinGecko
        </template>
      </v-card-actions>
    </template>
  </AppCard>
</template>

<script>
import AppCard from '~/components/app/Card.vue'

export default {
  name: 'MaterialCard',

  components: {
    AppCard,
  },

  props: {
    color: String,
    fullHeader: Boolean,
    heading: String,
    icon: String,
    iconSmall: Boolean,
    subtitle: String,
    title: String,
    exchangeURL: String,
  },

  computed: {
    hasHeading() {
      return !!(this.icon || this.heading || this.$slots.heading)
    },
    hasTitle() {
      return !!(
        this.title ||
        this.subtitle ||
        this.$slots.title ||
        this.$slots.subtitle
      )
    },
    iconSRC: function () {
      return '/' + this.icon + 'Logo.avif'
    },
    isAverage: function () {
      if (this.title == 'Average') {
        return true
      }
      return false
    },
    isPancakeSwap: function () {
      if (this.title == 'PancakeSwap') {
        return true
      }
      return false
    }
  },
}
</script>

<style lang="sass">
.v-card.v-card--material
  > .v-card__title
    > .v-card--material__title
      flex: 1 1 auto
      word-break: break-word
      color: black

      a:link
        color: blue
        background-color: transparent
        text-decoration: none

      a:visited
        color: blue
        background-color: transparent
        text-decoration: none
</style>
