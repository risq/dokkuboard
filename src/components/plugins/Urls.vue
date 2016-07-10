<template>
  <div class="urls">
    <h4><span class="label label-default">urls</span><span class="command"><span class="command__prompt">dokku</span><span class="command__symbol">></span> urls {{name}}</span></h4>
    <pulse-loader class="spinner" :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <a href="{{url}}" v-if="url">{{url}}</a>
      <div class="error" v-if="error">
        <h4 class="error__title">Error</h4>
        <div class="error__content error__content--both" v-if="error.stderr && error.stdout === error.stderr">
          {{error.stderr}}
        </div>
        <div class="error__content error__content--stderr" v-if="error.stderr && error.stdout !== error.stderr">
          {{error.stderr}}
        </div>
        <div class="error__content error__content--stdout" v-if="error.stdout && error.stdout !== error.stderr">
          {{error.stdout}}
        </div>
      </div>
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
      error: null,
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
          this.error = null;
          this.isLoading = false;
        })
        .catch(err => {
          this.url = null;
          this.error = err.data;
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
    if (this.name) {
      this.getData();
    }
  },
  components: {
    PulseLoader,
  },
};
</script>

<style scoped lang="sass">
  @import "../../common.sass"

  .spinner
    margin: 32px 0
    text-align: center
</style>
