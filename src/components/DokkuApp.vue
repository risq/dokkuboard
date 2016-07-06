<template>
  <div class="dokku-app">
    <h2>
      app: <i>{{name}}</i>
    </h2>
    <pulse-loader v-if="isLoading"></pulse-loader>
    <div v-if="!isLoading">
      <a href="{{url}}">{{url}}</a>
      <div v-if="config">
        <h3>config</h3>
        <table>
          <tr v-for="(key, value) in config">
            <th>{{key}}</th>
            <td>{{value}}</td>
          </tr>
        </table>
      </div>
      <button v-on:click="deleteApp">Delete</button>
    </div>
  </div>
  <hr>
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
  components: {
    PulseLoader,
  },
};
</script>

<style scoped>
th {
  text-align: left;
}

h3 {
  margin-bottom: 6px;
}

table {
  font-family: monospace;
  margin-bottom: 24px;
}

hr {
  border-bottom: 1px solid #ddd;
  border-top: none;
  margin: 32px 16px;
}
</style>
