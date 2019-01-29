<template>
  <v-container fluid>
    <x-header />
    <x-body />
  </v-container>
</template>

<script>
import Header from './PageCommon/Header';
import Body from './PageCommon/Body';
// import Footer from './PageWeb/Footer';

export default {
  name: 'PageCommon',
  components: {
    'x-header': Header,
    'x-body': Body,
    // 'x-footer': Footer,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
