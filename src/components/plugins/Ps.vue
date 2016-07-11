<template>
  <div class="ps">
    <h4><span class="label label-default">ps</span><span class="command"><span class="command__prompt">dokku</span><span class="command__symbol">></span> ps {{name}}</span></h4>
    <pulse-loader class="spinner" :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <div v-if="ps">
        <table class="table table-sm">
          <thead>
              <th v-for="(key, value) in ps[0]">{{key}}</th>
          </thead>
          <tbody>
            <tr v-for="row in ps">
              <td v-for="(key, value) in row">{{value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <error :error="error"></error>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import chan from 'channels/ps';
import Error from 'components/Error';

export default {
  data() {
    return {
      ps: null,
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
          this.ps = data;
          this.error = null;
          this.isLoading = false;
        })
        .catch(err => {
          this.ps = null;
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
