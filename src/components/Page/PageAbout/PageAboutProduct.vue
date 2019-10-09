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
        <h1>拙作</h1>
        <h4>一些原创产出</h4>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout
      flex-child
      align-center
      justify-center
      wrap
    >
      <v-flex
        xs12
        sm12
        md6
        lg4
        xl3
        v-for="(info,i) in infomation"
        :key="i"
        :left="i%2==0"
        :right="i%2==1"
        :icon="info.icon"
      >
        <v-sheet
          class="d-flex"
          :color="info.color"
          height="300"
          style="border-radius:24px 12px 0 0 ;"
        >
          <v-layout
            justify-center
            column
            fill-height
            ma-0
            pa-auto
          >
            <v-flex>
              <v-icon>{{ info.icon }}</v-icon>
            </v-flex>
            <!-- <v-divider/> -->
            <v-flex>
              <p
                v-for="(p,i) in info.content"
                :key="i"
                v-html="p"
              />
            </v-flex>
            <sheet-footer>
              <v-layout>
                <v-flex>
                  <!-- <v-icon dark>{{ info.icon }}</v-icon> -->
                  <h3 class="white--text font-weight-light">
                    &nbsp;<a
                      :href="info.url"
                      target="_blank"
                    >
                      {{ info.title }}
                    </a>&nbsp;
                  </h3>
                </v-flex>
              </v-layout>
            </sheet-footer>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: 'PageAboutProduct',
  components: {
    SheetFooter: {
      functional: true,
      render(h, { children }) {
        return h('v-sheet', {
          staticClass: 'mt-auto align-center justify-center d-flex',
          props: {
            color: 'rgba(0, 0, 0, .36)',
            dark: true,
            height: 50,
          },
        }, children);
      },
    },
  },
  data() {
    return {
      infomation: [],
    };
  },

  // 自成视图后，加载数据
  mounted() {
    axios
    .get("https://lixuan.xyz/home-data/get-json-string.php", { params: { file_path: 'aboutProduct.json' } })
    .then((response) => {
      this.infomation = eval('(' + response.data + ')');
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
