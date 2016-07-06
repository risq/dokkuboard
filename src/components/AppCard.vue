<template>
  <div class="app-card card">
    <div class="card-header">
      <h3 class="card-title dokku-app__title">
        {{name}}
      </h3>
    </div>

    <div class="card-block">
      <pulse-loader :color="'#373a3c'" v-if="isLoading"></pulse-loader>
      <div v-if="!isLoading">
        <urls :name="name"></urls>
        <hr>
        <config :name="name"></config>
        <hr>
        <button class="btn btn-default" v-on:click="deleteApp">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Urls from './plugins/Urls';
import Config from './plugins/Config';

export default {
  data() {
    return {
      url: '',
      config: null,
      isLoading: true,
    };
  },
  props: [
    'name',
  ],
  methods: {
    getApp() {
      axios.get(`/api/apps/${this.name}`)
        .then(({ data }) => {
          this.name = data.name;
          this.url = data.url;
          this.config = data.config;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    deleteApp() {
      this.isLoading = true;
      axios.delete(`/api/apps/${this.name}`)
        .then(() => {
          this.$dispatch('app:delete');
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  ready() {
    this.getApp();
  },
  route: {
    data({ to }) {
      this.$data = this.$options.data();
      this.name = to.params.name;
      this.getApp();
    },
  },
  components: {
    PulseLoader,
    Urls,
    Config,
  },
};
</script>

<style scoped lang="sass">
table
  font-family: monospace

.dokku-app
  &__title
    margin-bottom: 0
</style>
