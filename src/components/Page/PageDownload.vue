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
const axios = require('axios');

export default {
  name: 'DownloadPage',
  components: {
  },
  data() {
    return {
      description: [],
    };
  },
  mounted() {
    //加载数据
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'download_description.json' } })
    .then((response) => {
      this.description =eval('(' + response.data + ')');                  // 页脚连接
    });
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
