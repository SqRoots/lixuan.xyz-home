<template>
  <v-navigation-drawer
    temporary
    :right="right"
    v-model="rightDrawer"
    fixed
    app
  >
    <v-list>
      <v-list-tile @click="right = !right">
        <v-list-tile-action>
          <v-icon>compare_arrows</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationRight',
  components: { },
  data() {
    return {
      fixed: true,
      right: true,
      rightDrawer: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
