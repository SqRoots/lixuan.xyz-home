<template>
  <div class="">
    <v-dialog
      v-model="valueShowDialog"
      width="400"
    >
      <v-card>
        <v-card-title class="headline blue darken-4 white--text">
          确定删除？
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout
              align-start
              justify-center
              column
            >
              <v-flex xs6>
                <h3>
                  <span class="grey--text">
                    格言ID :
                  </span>{{ dData.id }}
                </h3>
              </v-flex>
              <v-flex xs6>
                <h3>
                  <span class="grey--text">
                    格言作者 :
                  </span>{{ dData.author }}
                </h3>
              </v-flex>
              <v-flex xs6>
                <h3>
                  <span class="grey--text">
                    格言来源:
                  </span>{{ dData.source }}
                </h3>
              </v-flex>
              <v-flex
                xs6
                style="margin-left:20px;"
                v-html="dData.content_html"
              />
            </v-layout>
          </v-container>
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
            @click="$_toDeleteItem(dData.id)"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <x-dialog-result
      @eTurnOff="valueShowResultDialog=false"
      :q-show="valueShowResultDialog"
      :data="['删除结果', queryResult]"
    />
  </div>
</template>

<script>
import DialogResult from '@/components/PublicComponents/DialogResult';
import APIURL from '@/components/API';

const axios = require('axios');

export default {
  name: 'MottoDeleteDialog',
  components: {
    'x-dialog-result': DialogResult,
  },
  data() {
    return {
      valueShowDialog: false,
      valueShowResultDialog: false,
      queryResult: '',
    };
  },
  methods: {
    $_toDeleteItem(itemID) {
      // const url = 'https://lixuan.xyz/blog/x-c/web-delete.php';
      axios
      .get(APIURL.DeleteMottoGetURL, { params: { id: itemID, catalog: this.$route.name } })
      .then((response) => {
        this.queryResult = response.data;
        if (response.data.substring(0, 5) !== '【未登录】') this.$emit('eSucceed', itemID);    // 如果成功，更新当前页面中的数据
      });
      this.valueShowDialog = false;
      this.valueShowResultDialog = true;
      // this.$emit('eSucceed', this.data.id);  // 如果成功，更新当前页面中的数据
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
