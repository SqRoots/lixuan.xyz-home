<template>
  <v-container
    grid-list-xl
    text-xs-center
  >
    <v-layout
      align-center
      justify-center
      column
      fill-height
    >
      <v-flex>
        <h1>关于我</h1>
      </v-flex>

      <!-- 基本信息 -->
      <v-container
        grid-list-xl
        text-xs-center
      >
        <v-divider />
        <v-layout
          align-center
          justify-center
          row
          fill-height
        >
          <v-flex
            xs12
            sm12
            md6
            lg6
            xl3
          >
            <v-card>
              <v-card-title class="green justify-center">
                <h3 class="headline white--text font-weight-light">
                  基本信息
                </h3>
              </v-card-title>
              <v-container>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                >
                  <v-flex>
                    <p
                      v-for="(ppp, iii) in basicInfo"
                      :key="iii"
                      v-html="ppp"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>

      <!-- 文本履历 -->
      <v-flex
        xs12
        md6
        lg6
        xl6
      >
        <v-card>
          <v-card-title class="grey justify-center">
            <h3 class="headline white--text font-weight-light">
              履历
            </h3>
          </v-card-title>
          <v-container>
            <v-layout
              align-center
              justify-center
              column
              fill-height
            >
              <v-flex xs10>
                <p
                  v-for="(ppp, iii) in resume"
                  :key="iii"
                  v-html="ppp"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <!-- 时间轴履历 -->
      <v-flex style="min-width:420px;">
        <v-divider />
        <v-timeline dense clipped>
          <v-timeline-item
            v-for="(info,iii) in infomation"
            :key="iii"
            :color="info.color"
            fill-dot
            :icon="info.icon"
            small
          >
            <!-- 信息卡 -->
            <v-card>
              <v-card-title :class="`${info.color}`">
                <v-icon dark class="text-lg-left">{{ info.icon }}</v-icon>
                <h3 class="headline white--text font-weight-light">
                  &nbsp;<a
                    :href="info.url"
                    target="_blank"
                  >
                    {{ info.title }}
                  </a>
                </h3>
                <v-spacer></v-spacer>
                <span class="white--text font-weight-light" v-text="info.date"></span>
              </v-card-title>
              <v-container>
                <v-layout
                  align-center
                  justify-center
                  column
                  fill-height
                >
                  <v-flex xs10>
                    <p
                      v-for="(pppp,iiii) in info.content"
                      :key="iiii"
                      v-html="pppp"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: 'PageAbout',
  components: {
  },
  methods: {
    $_getAge() {  // 计算年龄
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const nowMyAge = Math.floor((((100 * year) + month) - 198703) / 100);
      return `${nowMyAge}岁`;
    },
  },
  data() {
    return {
      basicInfo: [],
      extendedInfo: [],
      resume: [],
      infomation: [],
    };
  },

  // 自成视图后，加载数据
  mounted() {
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'aboutMe.json' } })
    .then((response) => {
      let my_age = this.$_getAge();
      let temp_data = eval('(' + response.data + ')');

      this.basicInfo = temp_data.basicInfo;
      this.extendedInfo = temp_data.extendedInfo;
      this.resume = temp_data.resume;
      this.infomation = temp_data.infomation;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    text-align: center;
  }
  .v-card.theme--light {
    border-radius: 10px;
  }
  .v-card__title {
    padding: 8px 16px;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
</style>
