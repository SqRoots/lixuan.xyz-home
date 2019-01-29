<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="valueShowDialog"
      persistent
      max-width="600px"
    >
      <v-form>
        <v-card>
          <v-card-title class="headline blue darken-4">
            <span class="headline white--text">
              编辑
            </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field
                    v-model="formData.source"
                    label="来源"
                    required
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="formData.author"
                    label="作者"
                    required
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-text-field
                    v-model="formData.type"
                    label="类型"
                    required
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-text-field
                    v-model="formData.tags"
                    label="标签"
                    required
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-text-field
                    v-model="formData.id"
                    label="ID"
                    disabled
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-switch
                    :label="formData.visible ? '可见' : '隐藏'"
                    v-model="formData.visible"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    outline
                    v-model="formData.content_html"
                    label="内容"
                  />
                </v-flex>
              </v-layout>
            </v-container>

            <!-- <small>*也许该写点什么提示吧</small> -->
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="grey lighten-1 white--text"
              @click="valueShowDialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="blue darken-1 white--text"
              @click="$_submit(formData)"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <x-dialog-result
      @eTurnOff="valueShowResultDialog=false"
      :q-show="valueShowResultDialog"
      :data="['新建结果', queryResult]"
    />
  </v-layout>
</template>

<script>
import DialogResult from '@/components/PublicComponents/DialogResult';
import APIURL from '@/components/API';

const axios = require('axios');

export default {
  name: 'DialogEditItem',
  components: {
    'x-dialog-result': DialogResult,
  },
  data() {
    return {
      valueShowDialog: false,
      valueShowResultDialog: false,
      queryResult: '',
      formData: {
        id: '',
        type: '',
        source: '',
        author: '',
        tags: '',
        user_id: '',
        visible: true,
        color: '',
        order: '',
        like_num: '',
        score: '',
        title: '',
        url: '',
        content_html: '',
        logo_uri: '',
        picture_uri: '',
      },
    };
  },
  methods: {
    $_submit(formData) {
      // const url = 'https://lixuan.xyz/blog/x-c/web-edit.php';
      const params = new URLSearchParams();
      params.append('catalog', this.$route.name);
      params.append('id', this.formData.id);
      params.append('type', this.formData.type);
      params.append('source', this.formData.source);
      params.append('author', this.formData.author);
      params.append('tags', this.formData.tags);
      params.append('visible', this.formData.visible);
      params.append('content_html', this.formData.content_html);
      axios
      .post(APIURL.EditMottoPostURL, params).then((response) => {
        this.queryResult = response.data;
        if (response.data.substring(0, 5) === '【未登录】') this.$emit('eSucceed', formData);  // 如果成功，更新当前页面中的数据
      });
      this.valueShowDialog = false;
      this.valueShowResultDialog = true;
    },
  },
  props: {
    qShow: Boolean,
    dData: Object,
  },
  watch: {
    qShow(val) {
      this.valueShowDialog = val;
    },
    valueShowDialog(val) {
      if (val === false) {
        this.$emit('eHideDialog');
      }
    },
    dData(val) {
      this.formData = val;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
