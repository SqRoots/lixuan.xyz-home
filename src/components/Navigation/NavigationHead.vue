<template>
  <v-container>
    <v-layout
      align-center
      justify-center
      column
    >
      <v-flex>
        <v-avatar size="128">
          <v-img
            :src="logo"
            alt="avatar"
            class="mb-5"
          />
          <!-- <img src="@/assets/images/logo.png" alt="avatar" class="mb-5"/> -->
        </v-avatar>
      </v-flex>
      <v-flex>
        <h1>李宣</h1>
      </v-flex>
      <v-flex>
        <v-btn
          flat
          small
          color="primary"
          class="subheading"
          href="https://lixuan.xyz"
        >
          <!-- <v-icon>home</v-icon> -->
          lixuan.xyz
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import logoPath from '@/assets/images/logo.png';

export default {
  name: 'NavigationHead',
  data() {
    return {
      logo: 'https://lixuan.xyz/home-image/logo.png',
    };
  },
};
</script>

<style scoped>
.container {
  border-bottom: 1px dashed rgba(0,0,0,0.1);
}
.v-avatar .v-image {
  border: 5px solid #eee;
  box-shadow: 1px 1px 15px rgba(0,0,0,0.1);
}
h1 {
  color: #393939;
}
* {
  text-transform: none !important;
}
</style>
