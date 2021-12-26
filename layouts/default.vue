<template>
  <div>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title v-text="title" />
      </v-app-bar>
      <v-main>
        <v-container>
          <br />
          <nuxt />
        </v-container>
      </v-main>
      <v-footer :fixed="fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      title: 'EverGrow Coin Price List $EGC',
    }
  },
}
</script>

<style scoped>
div {
  background-color: #eeeeee;
}
</style>
