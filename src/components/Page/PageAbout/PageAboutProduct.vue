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
        <h1>拙作</h1>
        <h4>一些原创产出</h4>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout
      flex-child
      align-center
      justify-center
      wrap
    >
      <v-flex
        xs12
        sm12
        md6
        lg4
        xl3
        v-for="(info,i) in infomation"
        :key="i"
        :left="i%2==0"
        :right="i%2==1"
        :icon="info.icon"
      >
        <v-sheet
          class="d-flex"
          :color="info.color"
          height="300"
          style="border-radius:24px 12px 0 0 ;"
        >
          <v-layout
            justify-center
            column
            fill-height
            ma-0
            pa-auto
          >
            <v-flex>
              <v-icon>{{ info.icon }}</v-icon>
            </v-flex>
            <!-- <v-divider/> -->
            <v-flex>
              <p
                v-for="(p,i) in info.content"
                :key="i"
                v-html="p"
              />
            </v-flex>
            <sheet-footer>
              <v-layout>
                <v-flex>
                  <!-- <v-icon dark>{{ info.icon }}</v-icon> -->
                  <h3 class="white--text font-weight-light">
                    &nbsp;<a
                      :href="info.url"
                      target="_blank"
                    >
                      {{ info.title }}
                    </a>&nbsp;
                  </h3>
                </v-flex>
              </v-layout>
            </sheet-footer>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'PageAboutProduct',
  components: {
    SheetFooter: {
      functional: true,
      render(h, { children }) {
        return h('v-sheet', {
          staticClass: 'mt-auto align-center justify-center d-flex',
          props: {
            color: 'rgba(0, 0, 0, .36)',
            dark: true,
            height: 50,
          },
        }, children);
      },
    },
  },
  data() {
    return {
      infomation: [
        {
          title: '主页',
          url: 'https://lixuan.xyz',
          color: 'grey lighten-3',
          icon: 'fas fa-home',
          content: [
            '<a href="https://lixuan.xyz" target="_blank">lixuan.xyz</a> | <a href="https://lixuan.me" target="_blank">lixuan.me</a>',
            '<b>内容</b>：原创资源导航 + 收藏的 网站',
            '<b>日期</b>：主页于 2018-12-29 改版',
            '<b>工具</b>：Vue，Vuetify，源码存放于：<a href="https://github.com/SqRoots/lixuan.xyz-home">Github</a>',
          ],
        },
        {
          title: '博客',
          url: 'https://lixuan.xyz/blog/',
          color: 'green lighten-3',
          icon: 'fas fa-blog',
          content: [
            '<a href="https://lixuan.xyz/blog/" target="_blank">lixuan.xyz/blog</a>',
            '<b>内容</b>：趣题 + Mathematica + 笔记',
            '<b>日期</b>：创办于2014-01-10',
            '<b>工具</b>：Wordpress',
          ],
        },
        {
          title: 'Mathematica问答社区',
          url: 'https://mmaqa.com/',
          color: 'yellow lighten-3',
          icon: 'fas fa-atom',
          content: [
            '<a href="https://mmaqa.com" target="_blank">mmaqa.com</a> | <a href="http://mma.ooo" target="_blank">mma.ooo</a>',
            '<b>内容</b>：Mathematica 交流社区',
            '<b>日期</b>：创办于2016-04-01',
            '<b>工具</b>：Wordpress + Question2Answer',
          ],
        },
        {
          title: '笔记',
          url: 'https://lixuan.xyz/notes/mathematica/',
          color: 'red lighten-3',
          icon: 'fas fa-feather-alt',
          content: [
            '<a href="https://lixuan.xyz/notes/mathematica/" target="_blank">lixuan.xyz/notes/mathematica</a>',
            '<b>内容</b>: Mathematica 笔记（未完）',
            '<b>工具</b>: GitBoook',
          ],
        },
        {
          title: '摄影',
          url: 'https://lixuan.xyz/photo/',
          color: 'teal lighten-3',
          icon: 'fas fa-camera',
          content: [
            '<a href="https://lixuan.xyz/photo/" target="_blank">lixuan.xyz/photo</a>',
            '<b>内容</b>: 随拍，暂无特定主题',
            '<b>工具</b>: Lychee | Canon 6D',
          ],
        },
        {
          title: '数学之路 (停止维护)',
          url: 'http://shuxue6.com',
          color: 'purple lighten-3',
          icon: 'fas fa-superscript',
          content: [
            '<a href="http://shuxue6.com" target="_blank">shuxue6.com</a>',
            '<b>内容</b>：交流数学问题 + 分享数学资源',
            '<b>日期</b>：创办于 2011 年，已不再维护',
            '<b>工具</b>：Discuz',
          ],
        },
        {
          title: 'MathType完全教程',
          url: 'https://pan.baidu.com/s/1hqvjTNu',
          color: 'light-green lighten-3',
          icon: 'fas fa-book-open',
          content: [
            '<a href="https://pan.baidu.com/s/1hqvjTNu" target="_blank">下载《MathType完全教程》</a>',
            '<b>内容</b>：MathType 入门教程',
            '<b>日期</b>：完稿于 2013-10-30',
          ],
        },
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
