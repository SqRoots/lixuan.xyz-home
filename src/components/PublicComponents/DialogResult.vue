<template>
  <v-dialog
    width="500"
    v-model="valueShowDialog"
  >
    <v-card>
      <v-card-title class="headline blue darken-4">
        <span class="headline white--text">
          {{ data[0] }}
        </span>
      </v-card-title>
      <v-card-text v-html="data[1]" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1 white--text"
          @click="valueShowDialog=false"
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogResult',
  data() {
    return {
      valueShowDialog: false,
    };
  },
  props: {
    data: Array,
    qShow: Boolean,
  },
  watch: {
    qShow(val) {
      this.valueShowDialog = val;
    },
    valueShowDialog(val) {
      if (val === false) {
        this.$emit('eTurnOff');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
