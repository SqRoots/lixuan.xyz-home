<template>
  <v-container
    grid-list-xl
    text-xs-center
  >
    <v-layout
      align-center
      justify-center
      column
      fill-height
    >
      <v-flex>
        <h1>关于</h1>
        <h4>主页简介</h4>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout
      align-center
      justify-center
      column
      fill-height
    >
      <v-flex>
        <p
          v-for="(desc, i) in description"
          :key="i"
          v-html="desc"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'PageAbout',
  components: {
  },
  data() {
    return {
      description: [
        '<b>域名</b>：<a href="https://lixuan.xyz" target="_blank">lixuan.xyz</a> | <a href="https://lixuan.me" target="_blank">lixuan.me</a>',
        '<b>日期</b>：主页于 2018-12-29 改版',
        '<b>内容</b>：原创资源导航 + 收藏的 网站',
        '<b>工具</b>：Vue，Vuetify，源码存放于：<a href="https://github.com/SqRoots/lixuan.xyz-home">Github</a>',
      ],
    };
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
