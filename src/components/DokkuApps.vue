<template>
  <div class="dokku-apps">
    <h1>dokku apps</h1>
    <pulse-loader v-if="isLoading"></pulse-loader>
    <div v-if="!isLoading">
      <div class="form-inline">
        <!-- <div class="form-group"> -->
          <input type="text" class="form-control" v-model="inputAppName"></input>
          <button class="btn btn-default" v-on:click="createApp">Create app</button>
        <!-- </div> -->
      </div>
      <div v-if="error">
        <b>error:</b> <i>{{error}}</i>
      </div>
    </div>
    <div class="dokku-apps__container">
        <dokku-app v-for="app in apps" :name="app"></dokku-app>
    </div>
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

<style scoped lang="sass">
.dokku-apps
  margin-top: 128px

  &__container
    margin-top: 48px
</style>
