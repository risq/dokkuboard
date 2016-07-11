<template>
  <div class="config">
    <h4><span class="label label-default">config</span><span class="command"><span class="command__prompt">dokku</span><span class="command__symbol">></span> config {{name}}</span></h4>
    <pulse-loader class="spinner" :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <div v-if="config">
        <table class="table table-sm">
          <tr v-for="(key, value) in config">
            <th>{{key}}</th>
            <td>{{value}}</td>
          </tr>
        </table>
      </div>
      <error :error="error"></error>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import chan from 'channels/config';
import Error from 'components/Error';

export default {
  data() {
    return {
      config: null,
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
          this.config = data;
          this.error = null;
          this.isLoading = false;
        })
        .catch(err => {
          this.config = null;
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

  table
    font-size: 0.9rem

    td
      font-family: 'Source Code Pro', monospace

  .spinner
    margin: 32px 0
    text-align: center
</style>
