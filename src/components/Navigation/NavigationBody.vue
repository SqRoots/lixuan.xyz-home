<template>
  <v-list dense>
    <div
      v-for="item in items"
      :key="item.text"
    >
      <!-- 组 -->
      <v-list-group
        v-if="item.children"
        v-model="item.model"
        :key="item.text"
        :prepend-icon="item.icon"
        :append-icon="item.children.length>0 ? (item.model ? keyboard_arrow_up : keyboard_arrow_left) : null"
        @click="item.model=!item.model"
      >
        <!-- 项目 - 列表 -->
        <v-list-tile
          slot="activator"
          :to="{ name: item.routerName }"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- 项目 - 子列表 -->
        <v-list-tile
          v-for="child in item.children"
          :key="child.text"
          :active-class="child.model"
          @click="child.model=$_toggleSubtile();child.model"
          class="navi-child"
          :to="{ name: item.routerName, query: child.query }"
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <!-- 组 - 结束 -->
    </div>
  </v-list>
</template>

<script>
// import NavigationBodyData from './NavigationBodyData';

export default {
  name: 'DataNavigationBody',
  data() {
    return {
      items: [
        {
          text: '首页',
          routerName: 'Home',
          model: false,
          icon: 'home',
          children: [],
        },
        {
          text: '网站',
          routerName: 'Web',
          model: false,
          icon: 'public',
          children: [
            { model: 'inactive', icon: 'language', text: '综合', query: { category: '综合' } },
            { model: 'inactive', icon: 'functions', text: '理科', query: { category: '理科' } },
            { model: 'inactive', icon: 'account_circle', text: '博客', query: { category: '博客' } },
          ],
        },
        {
          text: '数据',
          routerName: 'Data',
          model: false,
          icon: 'archive',
          children: [
            { model: 'inactive', icon: 'fas fa-database', text: '综合', query: { category: '综合' } },
            { model: 'inactive', icon: 'fab fa-pied-piper', text: '文献', query: { category: '文献' } },
            { model: 'inactive', icon: 'fas fa-language', text: '语言', query: { category: '语言' } },
            { model: 'inactive', icon: 'fas fa-globe-asia', text: 'GIS', query: { category: 'GIS' } },
            // { icon: 'attach_money', text: '财经', query: { category: '财经' } },
          ],
        },
        {
          text: '软件',
          routerName: 'Software',
          model: false,
          icon: 'widgets',
          children: [
            { model: 'inactive', icon: 'functions', text: '数理', query: { category: '数理' } },
            { model: 'inactive', icon: 'widgets', text: '其它', query: { category: '其它' } },
            // { icon: 'photo', text: '多媒体' },
            // { icon: 'storage', text: '数据库' },
            // { icon: 'settings', text: '系统工具' },
          ],
        },
        {
          text: '下载',
          routerName: 'Download',
          model: false,
          icon: 'fa-download',
          children: [],
        },
        {
          text: '格言',
          routerName: 'Motto',
          model: false,
          icon: 'border_color',
          children: [],
        },
        {
          text: '关于',
          routerName: 'About',
          model: false,
          icon: 'info',
          children: [
            { model: 'inactive', icon: 'widgets', text: '拙作', query: { category: '拙作' } },
            { model: 'inactive', icon: 'functions', text: '个人简介', query: { category: '个人简介' } },
          ],
        },
      ],
      routerName: this.$route.name,
      keyboard_arrow_up: 'keyboard_arrow_up',
      keyboard_arrow_left: 'keyboard_arrow_left',
    };
  },
  props: {
    source: String,
  },
  methods: {
    $_toggleSubtile() {                                              // 切换二级导航的激活状态
      for (let i = 0; i < this.items.length; i += 1) {
        for (let ii = 0; ii < this.items[i].children.length; ii += 1) {
          this.items[i].children[ii].model = 'inactive';
        }
      }
      return 'active';
    },
  },
  watch: {                                                           // 首次加载时，展开对应的导航目录
    '$route' (to_router, from_router){
      if (from_router.name === null) {
        let routerNameIndex = 0;
        this.items.forEach((v, i) => {
          if (v.routerName === this.$route.name) routerNameIndex = i;
        });
        this.items[routerNameIndex].model = true;
        let routerQueryIndex = 0;
        this.items[routerNameIndex].children.forEach((v, i) => {
          if (v.query.category === this.$route.query.category) routerQueryIndex = i;
        });
        if (this.items[routerNameIndex].children.length > 0) this.items[routerNameIndex].children[routerQueryIndex].model = 'active';
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navi-child {
    margin-left: 40px;
  }
  .v-list__tile__title,.v-list__tile__action, .v-list__tile__avatar {
    min-width: 30px;
    margin: 0 3px;
  }
  .v-icon.material-icons.theme--light {
    margin: 0;
  }
  .primary--text .v-list__tile__title,
  .primary--text .v-list__tile__content,
  .primary--text .v-list__tile__action {
    color: rgba(0,0,0,.87);
  }
  /* 目录 激活时的颜色 */
  .v-list__group__header.v-list__group__header--active .primary--text.v-list__tile--active.v-list__tile.v-list__tile--link.theme--light .v-list__tile__title {
    color: #1976d2;
  }
  /* 子目录 激活时的颜色 */
  .navi-child a.active .v-list__tile__title,
  .navi-child a.active .v-list__tile__content,
  .navi-child a.active .v-list__tile__action {
    color: #1976d2;
  }
  /* 子目录 未激活时的颜色 */
  .navi-child .v-list__tile__title,
  .navi-child .v-list__tile__action,
  .navi-child .v-list__tile__avatar {
    color: rgba(0,0,0,.87);
  }
</style>
