<template>
  <v-container>
    <v-layout
      align-center
      column
    >
      <v-flex>
        <h1>{{ $_h1_toChinese(routerName) }}</h1>
        <h3>{{ $_h2_toChinese(routerName) }}</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    $_h1_toChinese(routerName) {
      if (routerName.toLowerCase() === 'web') {
        return '网站';
      } else if (routerName.toLowerCase() === 'data') {
        return '数据';
      } else if (routerName.toLowerCase() === 'software') {
        return '软件';
      } else if (routerName.toLowerCase() === 'download') {
        return '下载';
      } else if (routerName.toLowerCase() === 'motto') {
        return '格言';
      } else if (routerName.toLowerCase() === 'about') {
        return '关于';
      }
      return '首页';
    },

    $_h2_toChinese(routerName) {
      if (routerName.toLowerCase() === 'web') {
        return '我喜欢的网站';
      } else if (routerName.toLowerCase() === 'data') {
        return '我喜欢的数据';
      } else if (routerName.toLowerCase() === 'software') {
        return '我喜欢的软件';
      } else if (routerName.toLowerCase() === 'download') {
        return '原创资料，未经授权不得商用';
      } else if (routerName.toLowerCase() === 'motto') {
        return '我喜欢的一些句子';
      } else if (routerName.toLowerCase() === 'about') {
        return '关于我的一些信息';
      }
      return '首页';
    },
  },
  data() {
    return {
      section: [1, 2, 3],
      routerName: this.$route.name,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    text-align: center;
    font-size: 36px;
  }
  h3 {
    text-align: center;
    color: #666;
  }
</style>
