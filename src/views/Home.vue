
<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      align-space-around
      justify-space-around
      row
      fill-height
    >
      <v-flex>
        <x-page-home />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PageHome from '@/components/Page/PageHome';

  export default {
    components: { 'x-page-home': PageHome },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
