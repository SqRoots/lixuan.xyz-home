<template>
  <v-app id="inspire">
    <!-- ■■■■■■■■ 左边导航 ■■■■■■■■ -->
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="miniVariant"
      fixed
      app
    >
      <x-navigation />
    </v-navigation-drawer>

    <!-- ■■■■■■■■ 主体内容 ■■■■■■■■ -->
    <v-content style="padding-bottom: 0;">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <x-footer />

    <!-- ■■■■■■■■ 左上角 折叠按钮 ■■■■■■■■ -->
    <v-btn
      small
      fixed
      top
      left
      fab
      @click.stop="miniVariant = !miniVariant"
    >
      <v-icon v-html="miniVariant ? 'chevron_left' : 'menu'" />
    </v-btn>

    <!-- ■■■■■■■■ 左下角 登录按钮 ■■■■■■■■ -->
    <v-btn
      small
      fixed
      bottom
      left
      fab
      v-show="miniVariant"
      :target="$cookies.get('login')==='login'?'_blank':'_self'"
      :href="`https://lixuan.xyz/blog/wp-login.php?redirect_to=${currentURL()}`"
    >
      <v-icon v-html="$cookies.get('login')==='login'?'fas fa-sign-out-alt':'fas fa-sign-in-alt'" />
    </v-btn>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import APIURL from '@/components/API';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    'x-navigation': Navigation,
    'x-footer': Footer,
  },
  data() {
    return {
      miniVariant: true,
    };
  },
  methods: {
    getLoginQ() {               // 判断是否登录
      axios
      .get(APIURL.GetLoginQURL)
      .then((response) => {
        this.$cookies.set('login', response.data);
      });
    },
    currentURL() {
      const category = this.$route.query.category || '';
      if (this.$cookies.get('login') === 'login') {
        if (category === '') {
          return `${this.$route.path}?category=${category}&loggedout=true`;
        }
        return `${this.$route.path}?loggedout=true`;
      }
      if (category === '') {
        return `${this.$route.path}`;
      }
      return `${this.$route.path}?category=${category}`;
    },
  },
  mounted() {
    this.getLoginQ();         // 判断是否登录
  },
};
</script>

<style media="screen">
  /* 网站背景颜色 */
  body,.application--wrap{
    background-color: #dedcd4;
  }
  /* 导航背景颜色 */
  .v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light {
    background: #ceccc4;
  }
  /* 主体背景颜色 */
  .v-content__wrap {
    background: #dedcd4;
  }
  /* 导航对齐 */
  a.v-list__tile.v-list__tile--link.theme--light,
  a.primary--text.v-list__tile--active.v-list__tile.v-list__tile--link.theme--light{
    margin: 0;
    padding: 0;
  }
  .v-icon.material-icons.theme--light {
    margin: 0 16px;
  }
  .v-list__group__header .v-list__tile.v-list__tile--link.theme--light{
    margin: 0;
    padding: 0;
  }
  .v-list__group__header  .v-icon.material-icons.theme--light {
    margin: 0;
  }
  /* 导航对齐 - 结束 */

  /*  toolbar */
  .v-toolbar__content, .v-toolbar__extension{
    padding: 0 12px;
  }
  /*  页脚 */
  .v-footer{
    background-color: #dedcd4;
    text-align: center;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* ■■■■■■■■ Motto 数据表 ■■■■■■■■ */
  /* 数据表-数据-背景 */
  .v-table__overflow .theme--light.v-table,
  .v-table__overflow .theme--light.v-list{
    background-color: rgba(255,255,255,0.2);
  }
  table.v-table thead td:not(:nth-child(1)),
  table.v-table tbody td:not(:nth-child(1)),
  table.v-table thead th:not(:nth-child(1)),
  table.v-table tbody th:not(:nth-child(1)),
  table.v-table thead td:first-child,
  table.v-table tbody td:first-child,
  table.v-table thead th:first-child,
  table.v-table tbody th:first-child{
    padding: 5px;
  }
  /* 数据表-标题行 */
  .v-table__overflow .theme--light.v-table thead{
    background-color: rgba(255,255,255,0.3);
    font-weight: bold;
  }
  /* 数据表-尾-操作 */
  .theme--light.v-datatable .v-datatable__actions{
    background-color: rgba(255,255,255,0.3);
    font-weight: bold;
  }
  .theme--light.v-table.v-datatable{
    background-color: rgba(0,0,0,0);
  }
  /* 数据表-尾-操作-每页显示行数 */
  .v-menu__content.theme--light.v-menu__content--auto.menuable__content__active{
    overflow-y: hidden;
  }
  /* 数据表-尾-操作-每页显示行数 */
  .v-select-list.v-card.theme--light .v-list__tile__content .v-list__tile__title{
    text-align: center;
  }
  /* 数据表-分页 */
  .theme--light.v-pagination .v-pagination__item{
    background-color: rgba(255,255,255,0.3);
  }

</style>
