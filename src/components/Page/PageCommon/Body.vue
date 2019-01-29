<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      column
      xs12
    >
      <!-- 生成分类 开始 -->
      <v-flex
        v-for="category in $_filterSection(dataCategoryData)"
        :key="category"
        xs12
      >
        <!-- 分类 标题 -->
        <v-toolbar
          light
          flat
        >
          <v-icon style="margin: 0;">
            ac_unit
          </v-icon>
          <v-toolbar-title><h2>{{ category }}</h2></v-toolbar-title>                                                   <!--  类别名称  -->
          <v-spacer />
          <v-btn
            icon
            v-if="$cookies.get('login')==='login'"
            @click="$_ShowEditCategoryDialog(category)"
          >
            <v-icon>create</v-icon>
          </v-btn> <!--  编辑按钮  -->
          <v-btn
            icon
            v-if="$cookies.get('login')==='login'"
            @click="$_ShowCreateDialog(category)"
          >
            <v-icon>add</v-icon>
          </v-btn>          <!--  添加按钮  -->
        </v-toolbar>

        <!-- 分类 内容（项目） -->
        <x-body-section :body-data="$_getSectionData(bodyData, category)" />
      </v-flex>
      <!-- 加载进度 -->
      <v-progress-circular
        v-if="dataCategoryData.length===0"
        :size="70"
        :width="7"
        color="grey"
        indeterminate
      />
    </v-layout>
    <!-- 生成分类 结束 -->

    <!-- 编辑分类 对话框 -->
    <x-dialog-edit-category
      @eHideDialog="valueEditCategoryDialog=false"
      @eSucceed="$_reflashCategory"
      :q-show="valueEditCategoryDialog"
      :d-data="dataEditCategoryDialog"
    />
    <!-- 新建项目 对话框 -->
    <x-dialog-create-item
      @eHideDialog="valueCreateItemDialog=false"
      :q-show="valueCreateItemDialog"
      :d-data="dataCreateDialog"
    />
  </v-container>
</template>

<script>
import APIURL from '@/components/API';
import DialogCreateItem from '@/components/PublicComponents/DialogCreateItem';
import DialogEditCategory from '@/components/PublicComponents/DialogEditCategory';
import BodySection from './BodySection';


const axios = require('axios');

export default {
  name: 'Body',
  components: {
    'x-body-section': BodySection,
    'x-dialog-create-item': DialogCreateItem,
    'x-dialog-edit-category': DialogEditCategory,
  },
  data() {
    return {
      routerName: this.$route.name,
      routerQuery: this.$route.query,
      bodyData: [],         // 全部数据
      dataCategoryData: [],      // 目录数据
      valueCreateItemDialog: false,      // 新建对话框-显示隐藏
      dataCreateDialog: {},              // 新建对话框-数据
      valueEditCategoryDialog: false,    // 编辑类别对话框-显示隐藏
      dataEditCategoryDialog: {},        // 编辑类别对话框-数据
      queryResult: '',                   // 查询结果
    };
  },
  methods: {
    $_ShowCreateDialog(data) {
      this.valueCreateItemDialog = true;
      this.dataCreateDialog = { category: data };
    },
    $_ShowEditCategoryDialog(data) {
      this.valueEditCategoryDialog = true;
      this.dataEditCategoryDialog = { category: data };
    },
    $_reflashCategory(newData) {
      const li = new Set();
      const tempData = [];
      this.bodyData.forEach((x) => {
        if (x.category === newData.old_category) {
          li.add(newData.new_category);
          const temp = x;
          temp.category = newData.new_category;
          tempData.push(temp);
        } else {
          li.add(x.category);
          tempData.push(x);
        }
      });
      this.dataCategoryData = Array.from(li);
      this.bodyData = tempData;
    },
    $_getBodyData(routerName) {                               // 从服务器获取数据
      // const url = 'https://lixuan.xyz/blog/x-c/web-get.php';
      // const url = 'https://lixuan.xyz/blog/x-c/web-data.json';
      axios
      .get(APIURL.GetDataURL, { params: { catalog: routerName } })
      .then((response) => {
        this.bodyData = response.data.data;                  // 项目数据
        const li = new Set();
        response.data.data.forEach(x => li.add(x.category));
        this.dataCategoryData = Array.from(li);                   // 项目类别数据
      });
    },
    $_getSectionData(data, filterWord) {
      // 返回不同子类别的名称
      const li = [];
      data.forEach((v) => {
        if (v.category === filterWord) {
          li.push(v);
        }
      });
      return li;
    },
    $_filterSection(data) {                               // 根据URL中的参数过滤类别
      if (!this.$route.query.category) {
        return data;                                      // 返回所有类别
      }
      return [this.$route.query.category];                // 返回URL中的类别
    },
  },
  mounted() {                                             // 自成视图后自加载数据
    this.$_getBodyData(this.$route.name);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-toolbar{
    background: none;
    border-bottom: 1px solid #333;
  }
  h1 {
    text-align: center;
    font-size: 36px;
  }
  .flex {
    margin-top: 20px;
    margin-bottom: 128px;
  }
  .v-progress-circular {
    /* position: absolute; */
    top: 80px;
    left: 50%;
    margin-left: -35px;

  }
</style>
