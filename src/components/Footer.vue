<template>
  <v-footer
    app
    v-if="$route.name==='Home'"
    dark
    height="auto"
    :inset="true"
  >
    <v-card
      class="flex"
      flat
      color="#dedcd4"
      style="border-top: 1px solid rgba(0,0,0,0.1);"
    >
      <!-- follow me -->
      <v-card-title class="justify-center">
        <v-tooltip
          top
          v-for="me in followme"
          :key="me.icon"
        >
          <v-btn
            slot="activator"
            class="mx-3 brown--text"
            icon
            :href="me.link"
            target="_blank"
          >
            <v-icon size="24px">
              {{ me.icon }}
            </v-icon>
          </v-btn>
          <span>{{ me.desc }}</span>
        </v-tooltip>
      </v-card-title>

      <!-- about me -->
      <v-card-actions
        class="justify-center brown--text"
        style="background-color:#ceccc4;"
      >
        <v-tooltip top>
          <v-btn
            slot="activator"
            class="mx-3 brown--text"
            icon
            target="_blank"
          >
            <v-icon size="16px">
              far fa-envelope
            </v-icon>
          </v-btn>
          <span>lixuan.xyz@gmail.com</span>
        </v-tooltip>

        <span>&nbsp;</span>

        <v-tooltip top>
          <v-btn
            slot="activator"
            class="mx-3 brown--text"
            icon
            target="_blank"
          >
            <v-icon size="16px">
              fas fa-shield-alt
            </v-icon>
          </v-btn>
          <span>冀ICP备11017610号-3</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  components: {
  },
  data() {
    return {
      followme: [
        {
          icon: 'fab fa-facebook',
          desc: 'Go to my Facebook',
          link: 'https://www.facebook.com/lixuan.xyz',
        },
        {
          icon: 'fab fa-linkedin',
          desc: 'Go to my Linkedin',
          link: 'https://www.linkedin.com/in/lixuanxyz/',
        },
        {
          icon: 'fab fa-github',
          desc: 'Go to my GitHub',
          link: 'https://github.com/SqRoots',
        },
        {
          icon: 'fab fa-zhihu',
          desc: '访问我的知乎主页',
          link: 'https://www.zhihu.com/people/lixuan.xyz/',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
