<template>
  <div class="urls">
    <h4><span class="label label-default">urls</span></h4>
    <pulse-loader class="spinner" :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <command :command="`urls ${name}`"></command>
      <a href="{{url}}" v-if="url">{{url}}</a>
      <error :error="error"></error>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import chan from 'channels/urls';

import Command from 'components/Command';
import Error from 'components/Error';

export default {
  data() {
    return {
      url: null,
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
    Error,
    Command,
  },
};
</script>

<style scoped lang="sass">
  @import "../../common.sass"

  .spinner
    margin: 32px 0
    text-align: center
</style>
