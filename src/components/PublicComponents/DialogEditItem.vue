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
                    v-model="formData.name"
                    label="原名"
                    required
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="formData.name_cn"
                    label="译名"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="formData.url"
                    label="网站地址"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="formData.slogan"
                    label="Slogan"
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
                    v-model="formData.establisher"
                    label="创办人"
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
                    v-model="formData.category"
                    label="分类"
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
                    v-model="formData.order"
                    label="排序"
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
                    required
                  />
                </v-flex>
                <v-spacer />
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
                    v-model="formData.description_html"
                    label="描述"
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
        id: 0,
        visible: true,
        name: '',
        name_cn: '',
        url: '',
        slogan: '',
        establisher: '',
        category: '',
        type: '',
        order: 0,
        description_html: '',
      },
    };
  },
  methods: {
    $_submit(formData) {
      // const url = 'https://lixuan.xyz/blog/x-c/web-edit.php';
      const params = new URLSearchParams();
      params.append('catalog', this.$route.name);
      params.append('id', this.formData.id);
      params.append('name', this.formData.name);
      params.append('name_cn', this.formData.name_cn);
      params.append('url', this.formData.url);
      params.append('slogan', this.formData.slogan);
      params.append('establisher', this.formData.establisher);
      params.append('category', this.formData.category);
      params.append('type', this.formData.type);
      params.append('order', this.formData.order);
      params.append('visible', this.formData.visible);
      params.append('description_html', this.formData.description_html);
      axios
      .post(APIURL.EditItemPostURL, params).then((response) => {
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
