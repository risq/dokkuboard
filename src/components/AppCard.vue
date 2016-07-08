<template>
  <div class="app-card card">
    <div class="card-header">
      <h3 class="card-title dokku-app__title">
          <a class="nav-link" v-link="{ path: `/apps/${name}` }">{{name}}</a>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Urls from './plugins/Urls';
import Config from './plugins/Config';

import chan from 'channels/apps';

export default {
  data() {
    return {
      url: '',
      config: null,
      isLoading: false,
    };
  },
  props: [
    'name',
  ],
  methods: {
    deleteApp() {
      this.isLoading = true;
      chan.request('destroy', this.name)
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

  route: {
    data({ to }) {
      this.name = to.params.name;
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
