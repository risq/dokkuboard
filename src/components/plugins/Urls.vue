<template>
  <div class="urls">
    <h4><span class="label label-default">urls</span></h4>
    <pulse-loader class="spinner" :color="'#373a3c'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <a href="{{url}}" v-if="url">{{url}}</a>
      <i v-if="!url">no url found for app {{name}}</i>
  </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import chan from 'channels/urls';

export default {
  data() {
    return {
      url: '',
      isLoading: true,
    };
  },
  props: [
    'name',
  ],
  methods: {
    getData() {
      chan.request('get', this.name)
        .then(data => {
          this.url = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    name() {
      this.isLoading = true;
      this.$data = this.$options.data();
      this.getData();
    },
  },
  ready() {
    this.getData();
  },
  components: {
    PulseLoader,
  },
};
</script>

<style scoped lang="sass">
  .spinner
    margin: 32px 0
    text-align: center
</style>
