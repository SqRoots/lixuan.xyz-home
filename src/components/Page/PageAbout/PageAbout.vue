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
        <h1>关于主页</h1>
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
          v-for="(desc, iiii) in description"
          :key="iiii"
          v-html="desc"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: 'PageAbout',
  components: {
  },
  data() {
    return {
      description: [],
    };
  },

  // 自成视图后，加载数据
  mounted() {
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'about_description.json' } })
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
