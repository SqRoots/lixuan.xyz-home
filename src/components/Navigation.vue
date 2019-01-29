<template>
  <v-container>
    <v-layout>
      <v-flex>
        <!-- 导航 - 头部 -->
        <navigation-head />

        <!-- 导航 - 体部 -->
        <navigation-body />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavigationHead from './Navigation/NavigationHead';
import NavigationBody from './Navigation/NavigationBody';

export default {
  name: 'Navigation',
  components: {
    'navigation-head': NavigationHead,
    'navigation-body': NavigationBody,
  },
  data() {
    return {
      // clipped: true,
      // drawer: true,
      // fixed: true,
      // right: false,
      // rightDrawer: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
