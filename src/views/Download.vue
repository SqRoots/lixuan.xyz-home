<template>
  <v-container>
    <x-download />
  </v-container>
</template>

<script>
import PageDownload from '@/components/Page/PageDownload';

export default {
  name: 'PageDownload',
  components: {
    'x-download': PageDownload,
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
