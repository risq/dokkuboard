<template>
  <div class="dokku-apps-list">
    <h2>All apps</h2>
    <hr>
    <pulse-loader :color="'#373a3c'" v-if="isLoading"></pulse-loader>
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
    <div class="dokku-apps-list__container">
        <app-card v-for="app in apps" :name="app"></app-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import AppCard from './AppCard';

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
    'app:delete'() {
      this.loadApps();
    },
  },
  components: {
    AppCard,
    PulseLoader,
  },
};
</script>

<style scoped lang="sass">
.dokku-apps-list

  &__container
    margin-top: 16px
</style>
