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
import NavigationBodyData from './NavigationBodyData';

export default {
  name: 'DataNavigationBody',
  data() {
    return {
      items: NavigationBodyData,
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
