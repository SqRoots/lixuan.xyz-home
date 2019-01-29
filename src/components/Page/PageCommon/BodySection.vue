<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
      justify-start
    >
      <!-- 项目卡片 -->
      <v-flex
        v-for="item in $_orderByID(bodyData)"
        :key="item.id"
        xs12
        sm6
        md4
        lg3
        xg2
      >
        <v-toolbar
          height="30px"
          light
          color="rgba(50,70,0,0.5)"
        >
          <v-toolbar-title style="font-size:16px;">
            <v-tooltip top>
              <a
                slot="activator"
                :href="item.url"
                target="_blank"
              >
                {{ item.name }} <v-icon style="color:#ccc;">
                  open_in_new
                </v-icon>
              </a>
              <span>默认在新窗口打开：<b>{{ item.name }}</b></span>
            </v-tooltip>
          </v-toolbar-title>

          <v-spacer />

          <!-- 功能按钮  编辑按钮 删除按钮-->
          <v-btn
            icon
            small
            @click="$_ShowEditDialog(item)"
            v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"
          >
            <v-icon color="#550">
              create
            </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            @click="$_ShowDeleteDialog(item)"
            v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"
          >
            <v-icon color="#550">
              delete_outline
            </v-icon>
          </v-btn>
        </v-toolbar>

        <!-- 项目内容 -->
        <v-card
          color="#ccc"
          overflow-y-hidden
        >
          <v-card-title style="padding: 16px;">
            <!-- 项目标题 -->
            <span style="font-weight: bold; margin-right: 5px;">
              {{ item.type }}:
            </span>   <!-- 项目类型 -->
            <span>{{ item.slogan }}</span>                                                <!-- 项目标语 -->
          </v-card-title>
          <!-- 项目内容 -->
          <v-card-text
            overflow-y-hidden
            class="text-sm-left"
            v-html="item.description_html"
            style="padding: 0 16px 16px 16px;"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <!--编辑 对话框 -->
    <x-dialog-edit-item
      @eHideDialog="valueEditItemDialog=false"
      @eSucceed="$_reflashEditItem"
      :q-show="valueEditItemDialog"
      :d-data="dataEditDialog"
    />
    <!-- 删除项目 对话框 -->
    <x-dialog-delete-item
      @eHideDialog="valueShowDeleteItemDialog=false"
      @eSucceed="$_reflashDeleteItem"
      :q-show="valueShowDeleteItemDialog"
      :d-data="dataDeleteDialog"
    />
  </v-container>
</template>

<script>
import DialogEditItem from '@/components/PublicComponents/DialogEditItem';
import DialogDeleteItem from '@/components/PublicComponents/DialogDeleteItem';

export default {
  name: 'BodySection',
  components: {
    'x-dialog-edit-item': DialogEditItem,
    'x-dialog-delete-item': DialogDeleteItem,
  },
  data() {
    return {
      routerName: this.$route.name,
      valueEditItemDialog: false,        // 编辑对话框-显示隐藏
      dataEditDialog: {},                // 编辑对话框-数据
      valueShowDeleteItemDialog: false,  // 删除对话框-显示隐藏
      dataDeleteDialog: {},              // 删除对话框-数据
    };
  },
  props: {
    'bodyData': Array,
  },
  methods: {
    $_orderByID(data) {               // 排序函数
      data.sort((a, b) => a.order - b.order);
      return data;
    },
    $_ShowEditDialog(data) {          // 显示编辑项目对话框
      this.dataEditDialog = data;
      this.valueEditItemDialog = true;
    },
    $_reflashEditItem(newData) {       // 编辑项目成功时，也将其从页面中更新
      this.bodyData.forEach((v, i) => {
        if (v.id === newData.id) this.bodyData[i] = newData;
      });
    },
    $_ShowDeleteDialog(data) {        // 显示删除项目对话框
      this.dataDeleteDialog = data;
      this.valueShowDeleteItemDialog = true;
    },
    $_reflashDeleteItem(id) {         // 删除项目成功时，也将其从页面中删除
      const tempData = [];
      this.bodyData.forEach((v) => {
        if (v.id !== id) tempData.push(v);
      });
      this.bodyData = tempData;
    },
  },
};
</script>

<style scoped>
  a {
    color: #eee;
    text-decoration: none;
  }
  a .v-icon {
    color: #eee;
  }
  .v-card {
    min-height: 100px;
  }
  .v-toolbar__content{
    padding: 0;
  }
  .v-toolbar .v-icon{
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  .v-toolbar .v-btn {
    margin-left: -5px;
    padding: 0;
  }
  .v-toolbar.theme--light {
    border-radius: 8px 8px 5px 5px;
  }
  .v-card.theme--light{
    border-radius: 5px;
  }
  .container.grid-list-md .layout .flex {
    min-width: 200px;
  }
</style>
