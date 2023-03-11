<template>
  <v-footer
    app
    v-if="$route.name==='Home'"
    height="auto"
    :inset="true"
  >
    <v-card
      class="flex"
      flat
      color="#dedcd4"
      style="border-top: 1px solid rgba(0,0,0,0.1);"
    >
      <!-- follow me -->
      <v-card-title class="justify-center">
        <v-tooltip
          top
          v-for="me in followme"
          :key="me.icon"
        >
          <v-btn
            slot="activator"
            class="mx-3 brown--text"
            icon
            :href="me.link"
            target="_blank"
          >
            <v-icon size="24px">
              {{ me.icon }}
            </v-icon>
          </v-btn>
          <span>{{ me.desc }}</span>
        </v-tooltip>
      </v-card-title>

      <!-- about me -->
      <v-card-actions
        class="justify-center brown--text"
        style="background-color:#ceccc4;"
      >
      <v-icon size="16px">
        far fa-envelope
      </v-icon>
      <span style="padding-left:6px;">lixuan.xyz@gmail.com</span>


        <span style="padding: 0 20px 0 20px;">|</span>


        <v-icon size="16px">
          fas fa-shield-alt
        </v-icon>
        <span style="padding-left:6px;"><a href="https://beian.miit.gov.cn/" target="_blank" style="color:#795548;">冀ICP备11017610号-5</a></span>

      </v-card-actions>

    </v-card>
  </v-footer>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Footer',
  components: {
  },
  data() {
    return {
      followme: [],
    };
  },

  // 自成视图后，加载数据
  mounted() {
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'footer_link.json' } })
    .then((response) => {
      this.followme =eval('(' + response.data + ')');                  // 页脚连接
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  footer{
    position: inherit;
  }
</style>
