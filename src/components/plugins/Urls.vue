<template>
  <div class="urls">
    <h4>url:</h4>
    <pulse-loader :color="'#373a3c'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <a href="{{url}}" v-if="url">{{url}}</a>
      <i v-if="!url">no url found for app {{name}}</i>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

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
      this.isLoading = true;
      this.$data = this.$options.data();

      axios.get(`/api/apps/${this.name}/urls`)
        .then(({ data }) => {
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

</style>
