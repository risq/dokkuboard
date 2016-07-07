<template>
  <div class="ps">
    <h4>ps:</h4>
    <pulse-loader class="spinner" :color="'#373a3c'" v-if="isLoading"></pulse-loader>
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
      <div v-if="!ps">
        <i>no ps found for app {{name}}</i>
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
      ps: '',
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

      axios.get(`/api/apps/${this.name}/ps`)
        .then(({ data }) => {
          this.ps = data;
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
    margin-top: 18px
    font-family: monospace
    font-size: 0.9rem

  .spinner
    margin: 32px 0
    text-align: center
</style>
