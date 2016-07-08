<template>
  <div class="apps-details">
    <h2>{{name}}</h2>
    <hr>
    <urls :name="name"></urls>
    <hr>
    <config :name="name"></config>
    <hr>
    <ps :name="name"></ps>
    <hr>
    <logs :name="name"></logs>
    <hr>
    <enter :name="name"></enter>
  </div>
</template>

<script>
import Urls from './plugins/Urls';
import Config from './plugins/Config';
import Ps from './plugins/Ps';
import Logs from './plugins/Logs';
import Enter from './plugins/Enter';

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
  route: {
    data({ to }) {
      this.name = to.params.name;
    },
  },
  components: {
    Urls,
    Config,
    Ps,
    Logs,
    Enter,
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
