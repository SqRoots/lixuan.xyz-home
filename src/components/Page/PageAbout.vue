<template>
  <v-container>
    <x-about v-if="$route.query.category!=='个人简介'&&$route.query.category!=='拙作'" />
    <x-about-me v-if="$route.query.category==='个人简介'" />
    <x-about-product v-if="$route.query.category==='拙作'" />
  </v-container>
</template>

<script>
import PageAbout from './PageAbout/PageAbout';
import PageAboutMe from './PageAbout/PageAboutMe';
import PageAboutProduct from './PageAbout/PageAboutProduct';

export default {
  name: 'PageAbout',
  components: {
    'x-about': PageAbout,
    'x-about-me': PageAboutMe,
    'x-about-product': PageAboutProduct,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    text-align: center;
  }
  .v-card.theme--light {
    border-radius: 10px;
  }
  .v-card__title {
    padding: 8px 16px;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
</style>
