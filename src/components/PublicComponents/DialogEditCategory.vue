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
              编辑类别
            </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-spacer />
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-text-field
                    v-model="formData.old_category"
                    label="原分类"
                    disabled
                  />
                </v-flex>
                <v-spacer />
                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                >
                  <v-text-field
                    v-model="formData.new_category"
                    label="新分类"
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
                <v-spacer />
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
              :disabled="formData.new_category===''"
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
  name: 'DialogEditCategory',
  components: {
    'x-dialog-result': DialogResult,
  },
  data() {
    return {
      valueShowDialog: false,
      valueShowResultDialog: false,
      queryResult: '',
      formData: {
        visible: true,
        old_category: '',
        new_category: '',
      },
    };
  },
  methods: {
    $_submit(formData) {
      // const url = 'https://lixuan.xyz/blog/x-c/web-edit-category.php';
      const params = new URLSearchParams();
      params.append('catalog', this.$route.name);
      params.append('old_category', this.formData.old_category);
      params.append('new_category', this.formData.new_category);
      params.append('visible', this.formData.visible);
      axios
      .post(APIURL.EditCategoryPostURL, params).then((response) => {
        this.queryResult = response.data;
        if (response.data.substring(0, 5) !== '【未登录】') this.$emit('eSucceed', formData);  // 如果成功，更新当前页面中的数据
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
      this.formData.old_category = val.category;
    },
  },
};
</script>

<style scoped>
</style>
