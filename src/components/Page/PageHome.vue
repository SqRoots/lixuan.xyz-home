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
// import mmaJPG from '@/assets/images/mma.ooo.jpg';
// import lixJPG from '@/assets/images/lixuan.xyz.jpg';
// import shuxue6JPG from '@/assets/images/shuxue6.com.jpg';
// import mmaJPGLazy from '@/assets/images/mma.ooo.lazy.jpg';
// import lixJPGLazy from '@/assets/images/lixuan.xyz.lazy.jpg';
// import shuxue6JPGLazy from '@/assets/images/shuxue6.com.lazy.jpg';
import { plotCurves as PlotCurves, resizeCanvas as ResizeCanvas } from '@/assets/js/PlotCurve';

export default {
  name: 'PageHome',
  data() {
    return {
      myWeb: [
        {
          name: '我的博客',
          href: 'https://lixuan.xyz/blog/',
          imgsrc: 'https://lixuan.xyz/x-images/lixuan.xyz.jpg',
          imgsrcLazy: 'https://lixuan.xyz/x-images/lixuan.xyz.lazy.jpg',
          description_html: '创办于2014-01-10',
          size: 4,
        },
        {
          name: '摄影',
          href: 'http://lixuan.xyz/photo/',
          imgsrc: 'https://lixuan.xyz/x-images/photo.jpg',
          imgsrcLazy: 'https://lixuan.xyz/x-images/photo.lazy.jpg',
          description_html: '创办于2018年',
          size: 3,
        },
        {
          name: 'Mathematica问答社区',
          href: 'https://mmaqa.com',
          imgsrc: 'https://lixuan.xyz/x-images/mma.ooo.jpg',
          imgsrcLazy: 'https://lixuan.xyz/x-images/mma.ooo.lazy.jpg',
          description_html: '创办于2016-04-01',
          size: 3,
        },
        {
          name: '数学之路',
          href: 'http://shuxue6.com/',
          imgsrc: 'https://lixuan.xyz/x-images/shuxue6.com.jpg',
          imgsrcLazy: 'https://lixuan.xyz/x-images/shuxue6.com.lazy.jpg',
          description_html: '创办于2011年，已经不再维护',
          size: 3,
        },
      ],
    };
  },
  methods: {
    PlotCurves() {},
  },
  mounted() {
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
