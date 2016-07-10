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
      <div v-if="!config">
        <i>no config found for app {{name}}</i>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import chan from 'channels/config';

export default {
  data() {
    return {
      config: '',
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

  table
    font-size: 0.9rem

    td
      font-family: 'Source Code Pro', monospace

  .spinner
    margin: 32px 0
    text-align: center
</style>
