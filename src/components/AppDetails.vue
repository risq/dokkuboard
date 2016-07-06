<template>
  <div class="apps-details">
    <h2>{{name}}</h2>
    <hr>
    <urls :name="name"></urls>
    <hr>
    <config :name="name"></config>
    <hr>
    <button class="btn btn-default" v-on:click="deleteApp">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';
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

  route: {
    data({ to }) {
      this.$data = this.$options.data();
      this.name = to.params.name;
    },
  },
  components: {
    Urls,
    Config,
  },
};
</script>

<style scoped lang="sass">
table
  font-family: monospace

.app-details
  &__title
    margin-bottom: 0
</style>
