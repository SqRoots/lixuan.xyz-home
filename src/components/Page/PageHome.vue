<template>
  <v-container
    fluid
    @click="PlotCurves()"
  >
    <!-- 标题 -->
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <h1>李宣</h1>
        <h3>欢迎您访问我的主页</h3>
      </v-flex>
    </v-layout>

    <br>
    <v-divider />
    <br>

    <!-- 画布 曲线 -->
    <canvas
      id="canvas"
      width="300"
      height="300"
    />

    <!-- 网站 列表 -->
    <v-layout
      flex-child
      align-center
      justify-center
      wrap
    >
      <v-flex
        v-for="web in myWeb"
        :key="web.name"
        xs12
        sm12
        md6
        lg4
        xl3
      >
        <v-hover>
          <v-card
            :href="web.href"
            target="_blank"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
          >
            <v-img
              :src="web.imgsrc"
              :lazy-src="web.imgsrcLazy"
              aspect-ratio="1.618"
            >
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-1"
                />
              </v-layout>
            </v-img>
            <v-card-title primary-title>
              <v-layout
                justify-space
                row
                fill-height
              >
                <v-flex>
                  <h3>{{ web.name }}</h3>
                  <div>{{ web.description_html }}</div>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');

import { plotCurves as PlotCurves, resizeCanvas as ResizeCanvas } from '@/assets/js/PlotCurve';

export default {
  name: 'PageHome',
  data() {
    return {
      myWeb: [

      ],
    };
  },
  methods: {
    PlotCurves() {},
  },
  mounted() {
    //加载数据
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'home_myWeb.json' } })
    .then((response) => {
      this.myWeb =eval('(' + response.data + ')');                  // 页脚连接
    });

    // 绘制背景曲线
    // const canvas = document.getElementById('canvas');
    PlotCurves();
    // window.onresize = ResizeCanvas();
    this.PlotCurves = PlotCurves;
    window.onresize = () => {
      ResizeCanvas();
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-card {
    border-radius: 10px;
    border: 2px double  rgba(0,0,32,0.3);
  }
  .v-img {
    border-bottom: 1px solid #333;
  }
  .v-card__title.v-card__title--primary {
    background-color: #dedcd4;
    padding-top: 18px;
    border-top: 1px dashed rgba(0,0,0,0.3);
  }

</style>
