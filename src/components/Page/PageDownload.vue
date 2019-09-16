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
        <h1>下载</h1>
        <h4>原创资料，未经授权不得商用</h4>
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
  name: 'DownloadPage',
  components: {
  },
  data() {
    return {
      description: [
        '<b>程序</b>：<a href="https://pan.baidu.com/s/1pJ78TWB" target="_blank">【VB】【循环节计算器】</a>',
        '<b>教程</b>：<a href="https://pan.baidu.com/s/1hqvjTNu" target="_blank">【2015】【MathType完全教程 第二版】</a>',
        '<b>PPT</b>：<a href="https://pan.baidu.com/s/1QcM7_52kzVlwM38m8sNX6w" target="_blank">【2019】【保定学院】【一位学长的经验分享报告】.pptx</a>（提取密码 tmbs）',
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
