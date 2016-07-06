<template>
  <div class="config">
    <h4>config:</h4>
    <pulse-loader :color="'#373a3c'" v-if="isLoading"></pulse-loader>
    <div class="data" v-if="!isLoading">
      <div v-if="config">
        <table class="table table-bordered table-sm">
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
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

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
      this.isLoading = true;
      this.$data = this.$options.data();

      axios.get(`/api/apps/${this.name}/config`)
        .then(({ data }) => {
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
  table
    font-family: monospace
    font-size: 0.9rem
</style>
