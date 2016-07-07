<template>
  <div class="logs">
    <h4>logs:</h4>
    <pulse-loader class="spinner" :color="'#373a3c'" v-if="isLoading"></pulse-loader>
    <div class="data logs-container" v-if="!isLoading && logs">
      <div v-if="logs">{{{logs}}}</div>
    </div>
    <i v-if="!isLoading && !logs">no logs found for app {{name}}</i>
  </div>
</template>

<script>
import axios from 'axios';
import ansiUp from 'ansi_up';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  data() {
    return {
      logs: '',
      isLoading: true,
    };
  },
  props: [
    'name',
  ],
  methods: {
    getData() {
      axios.get(`/api/apps/${this.name}/logs`)
        .then(({ data }) => {
          this.logs = ansiUp.ansi_to_html(data.replace(/(?:\r\n|\r|\n)/g, '<br />'));
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

  .logs-container
    font-family: monospace
    font-size: .8rem
    padding: 12px
    max-height: 400px
    border-radius: 4px
    background-color: #1b1b1b
    color: #fff
</style>
