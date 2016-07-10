<template>
  <div class="logs">
    <h4><span class="label label-default">logs</span><span class="command"><span class="command__prompt">dokku</span><span class="command__symbol">></span> logs {{name}}</span></h4>
    <pulse-loader class="spinner" :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div v-if="!isLoading">
      <div class="data logs-container" v-if="logs">
        <div>{{{logs}}}</div>
      </div>
      <error :error="error"></error>
    </div>
  </div>
</template>

<script>
import ansiUp from 'ansi_up';
import chan from 'channels/logs';
import Error from 'components/Error';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  data() {
    return {
      logs: '',
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
          this.logs = ansiUp.ansi_to_html(data.replace(/(?:\r\n|\r|\n)/g, '<br />'));
          this.error = null;
          this.isLoading = false;
        })
        .catch(err => {
          this.logs = null;
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
  },
};
</script>

<style scoped lang="sass">
  @import "../../common.sass"

  .spinner
    margin: 32px 0
    text-align: center

  .logs-container
    font-family: 'Source Code Pro', monospace
    font-size: .9rem
    padding: 12px
    max-height: 400px
    border-radius: 4px
    background-color: $color-black
    color: $color-white
</style>
