<template>
  <div class="apps-list">
    <h2>all apps</h2>
    <hr>
    <pulse-loader :color="'#3F5765'" v-if="isLoading"></pulse-loader>
    <div v-if="!isLoading">
      <div class="form-inline">
        <!-- <div class="form-group"> -->
          <input type="text" class="form-control" v-model="inputAppName"></input>
          <button class="btn btn-default" v-on:click="create">Create app</button>
        <!-- </div> -->
      </div>
      <div v-if="error">
        <b>error:</b> <i>{{error}}</i>
      </div>
    </div>
    <div class="apps-container">
        <app-card v-for="app in apps" :name="app"></app-card>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import AppCard from './AppCard';
import chan from 'channels/apps';

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
    this.list();
  },
  methods: {
    create() {
      this.isLoading = true;
      chan.request('create', this.inputAppName)
        .then(() => {
          this.list();
          this.error = null;
          this.inputAppName = '';
          this.isLoading = false;
        })
        .catch(res => {
          this.error = res.data.stderr;
          this.isLoading = false;
        });
    },
    list() {
      chan.request('list')
        .then(apps => {
          this.apps = apps;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  events: {
    'app:delete'() {
      this.list();
    },
  },
  components: {
    AppCard,
    PulseLoader,
  },
};
</script>

<style scoped lang="sass">
  @import "../common.sass"

  .apps-list

  .apps-container
    margin-top: 16px
</style>
