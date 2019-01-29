
<template>
  <x-content />
</template>

<script>
  import PageMotto from '@/components/Page/PageMotto';

  export default {
    components: { 'x-content': PageMotto },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
