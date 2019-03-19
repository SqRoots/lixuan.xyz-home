<template>
  <v-container>
    <v-layout
      align-center
      justify-space-around
      column
      fill-height
    >
      <v-flex>
        <h1>格言</h1>
        <h3>我喜欢的一些句子</h3>
      </v-flex>

      <v-divider />

      <v-flex class="main-content">
        <h2>{{ randomOneData.source||'出处不详' }}</h2>
        <h4>{{ randomOneData.author||'佚名' }}</h4>
        <br>
        <div
          class="subheading"
          v-html="randomOneData.content_html"
        />
        <!-- 加载进度 -->
        <v-progress-circular
          v-if="bodyData.length===0"
          :size="70"
          :width="7"
          color="grey"
          indeterminate
        />
      </v-flex>

      <v-flex
        xs12
        class="fix-bottom"
      >
        <v-icon
          color="#415458"
          @click="$_randomChoiceOneData()"
        >
          fas fa-dice
        </v-icon>
        <br>
        <v-btn
          color="#415458"
          dark
          @click="$_randomChoiceOneData()"
        >
          换一条
        </v-btn>
        <br>

        <v-icon
          @click="$_ShowDeleteDialog(randomOneData)"
          v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"
          color="#415"
        >
          fas fa-trash
        </v-icon>
        <span>&nbsp;</span>
        <v-icon
          @click="$_ShowCreateDialog()"
          v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"
          color="#415"
        >
          fas fa-plus
        </v-icon>
        <span>&nbsp;</span>
        <v-icon
          @click="$_ShowEditDialog(randomOneData)"
          v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"
          color="#415"
        >
          fas fa-pen
        </v-icon>
      </v-flex>

      <!-- <v-flex v-if="$cookies.get(&quot;login&quot;)===&quot;login&quot;"> -->
      <v-flex>
        <template>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="bodyData"
            :search="search"
            :pagination.sync="pagination"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:100px">{{ props.item.visible }}</td>
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:160px">{{ props.item.author }}</td>
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:160px">{{ props.item.source }}</td>
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:160px">{{ props.item.type }}</td>
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:100px">{{ props.item.update_time }}</td>
              <td class="text-xs-center" @click="$_ShowEditDialog(props.item)" style="max-width:520px" v-html="props.item.content_html"></td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </template>
      </v-flex>
    </v-layout>
    <!-- 删除项目 对话框 -->
    <x-dialog-delete-item
      @eHideDialog="valueDeleteItemDialog=false"
      @eSucceed="$_reflashDeleteItem"
      :q-show="valueDeleteItemDialog"
      :d-data="dataDeleteDialog"
    />
    <!-- 新建项目 对话框 -->
    <x-dialog-create-item
      @eHideDialog="valueCreateItemDialog=false"
      :q-show="valueCreateItemDialog"
    />
    <!--编辑 对话框 -->
    <x-dialog-edit-item
      @eHideDialog="valueEditItemDialog=false"
      @eSucceed="$_reflashEditItem"
      :q-show="valueEditItemDialog"
      :d-data="dataEditDialog"
    />
  </v-container>
</template>

<script>
import MottoDeleteDialog from '@/components/PublicComponents/MottoDeleteDialog';
import MottoCreateDialog from '@/components/PublicComponents/MottoCreateDialog';
import MottoEditDialog from '@/components/PublicComponents/MottoEditDialog';
import APIURL from '@/components/API';

const axios = require('axios');

export default {
  name: 'PageMotto',
  components: {
    'x-dialog-delete-item': MottoDeleteDialog,
    'x-dialog-create-item': MottoCreateDialog,
    'x-dialog-edit-item': MottoEditDialog,
  },
  data() {
    return {
      routerName: this.$route.name,
      routerQuery: this.$route.query,
      bodyData: [],                      // 全部数据
      randomOneData: {},                 // 随机一条数据
      dataCategoryData: [],              // 目录数据
      login: false,                      // 是否登录
      valueDeleteItemDialog: false,      // 删除对话框-显示隐藏
      dataDeleteDialog: {},              // 删除对话框-数据
      valueCreateItemDialog: false,      // 新建对话框-显示隐藏
      valueEditItemDialog: false,        // 编辑对话框-显示隐藏
      dataEditDialog: {},                // 编辑对话框-数据
      queryResult: '',                   // 查询结果

      pagination: {
        descending: false,
        page: 5,
        rowsPerPage: 10, // -1 for All
        sortBy: '',
        totalItems: 50,
      },
      search: '',
      headers: [
          { text: 'visible', value: 'visible' ,align: 'center'},
          { text: 'author', value: 'author' ,align: 'center'},
          { text: 'source', value: 'source' ,align: 'center'},
          { text: 'type', value: 'type' ,align: 'center'},
          { text: 'update_time', value: 'update_time' ,align: 'center'},
          { text: 'content_html', value: 'content_html' ,align: 'center', sortable: false}
        ],
    };
  },
  methods: {
    // 显示删除项目对话框
    $_ShowDeleteDialog(data) {
      this.dataDeleteDialog = data;
      this.valueDeleteItemDialog = true;
    },

    // 删除项目成功时，也将其从页面中删除
    $_reflashDeleteItem(data) {
      let index = -1;
      this.bodyData.forEach((v, i) => {
        if (v.id === data.id) index = i;
      });
      if (index >= 0) this.bodyData.splice(index, 1);
      this.$_randomChoiceOneData();
    },
    $_ShowCreateDialog() {
      this.valueCreateItemDialog = true;
    },

    // 删除项目成功时，也将其从页面中删除
    $_reflashCreateItem(data) {
      this.bodyData.push(data);
      this.randomOneData = data;
    },
    $_ShowEditDialog(data) {
      this.valueEditItemDialog = true;
      this.dataEditDialog = data;
    },

    // 编辑项目成功时，也将其从页面中更新
    $_reflashEditItem(data) {
      this.bodyData.forEach((v, i) => {
        if (v.id === data.id) this.bodyData[i] = data;
      });
      this.randomOneData = data;
    },

    // 从服务器获取数据
    $_getBodyData(routerName) {
      axios
      .get(APIURL.GetDataURL, { params: { catalog: routerName } })
      .then((response) => {
        this.bodyData = response.data.data;                  // 项目数据
        this.$_randomChoiceOneData();                        // 生成页面数据
        this.pagination.totalItems = response.data.data.length;
        // console.log(this.bodyData);
      });
    },
    $_randomChoiceOneData() {
      const dataLength = this.bodyData.length;
      const randomIndex = parseInt(Math.random() * dataLength, 10);
      this.randomOneData = this.bodyData[randomIndex];
    },

    // 根据URL中的参数过滤类别
    $_filterSection(data) {
      if (!this.$route.query.category) {
        return data;                                      // 返回所有类别
      }
      return [this.$route.query.category];                // 返回URL中的类别
    },

  },

   // 自成视图后自加载数据
  mounted() {
    this.$_getBodyData(this.$route.name);
  },

   // 分页
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
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
  margin: 20px;
  text-align: center;
}
.flex.main-content {
  height: 280px;
}

</style>
