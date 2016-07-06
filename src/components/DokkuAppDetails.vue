<template>
  <div class="dokku-apps-details">
    <h2>{{name}}</h2>
    <hr>

      <div class="card-block">
        <pulse-loader :color="'#373a3c'" v-if="isLoading"></pulse-loader>
        <div v-if="!isLoading">
          <h4>url:</h4>
          <a href="{{url}}" v-if="url">{{url}}</a>
          <i v-if="!url">no url found for app {{name}}</i>
          <hr>
          <h4>config:</h4>
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
          <hr>
          <button class="btn btn-default" v-on:click="deleteApp">Delete</button>
        </div>
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
          this.$dispatch('onAppDelete');
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
