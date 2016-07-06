<template>
  <pulse-loader v-if="isLoading"></pulse-loader>
  <div v-if="!isLoading">
    <input type="text" v-model="inputAppName"></input>
    <button v-on:click="createApp">Create app</button>
    <div v-if="error">
      <b>error:</b> <i>{{error}}</i>
    </div>
  </div>
  <div class="dokku-apps">
      <dokku-app v-for="app in apps" :name="app"></dokku-app>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import DokkuApp from './DokkuApp';

export default {
  data() {
    return {
      apps: [],
      inputAppName: '',
      isLoading: true,
      error: null,
    };
  },
  ready() {
    this.loadApps();
  },
  methods: {
    createApp() {
      this.isLoading = true;
      axios.post('/api/apps', {
        name: this.inputAppName,
      })
        .then(() => {
          this.loadApps();
          this.error = null;
          this.inputAppName = '';
          this.isLoading = false;
        })
        .catch(({ data }) => {
          this.error = data.stderr;
          this.isLoading = false;
        });
    },
    loadApps() {
      return axios.get('/api/apps')
        .then(({ data }) => {
          this.apps = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  events: {
    onAppDelete() {
      this.loadApps();
    },
  },
  components: {
    DokkuApp,
    PulseLoader,
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
