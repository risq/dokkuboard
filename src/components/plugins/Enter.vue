<template>
  <div class="enter">
    <h4><span class="label label-default">enter</span><span class="command"><span class="command__prompt">dokku</span><span class="command__symbol">></span> enter {{name}}</span></h4>
    <shell
      :command="`enter?appName=${name}`"
      :start-message="'Enter container'"
      :stop-message="'Leave container'"></shell>
  </div>
</template>

<script>
import Shell from 'components/Shell';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  props: [
    'name',
  ],
  methods: {
  },
  watch: {
    name() {
      // this.destroyTerm();
      // this.entered = false;
    },
  },
  components: {
    PulseLoader,
    Shell,
  },
};
</script>

<style scoped lang="sass">
  @import "../../common.sass"

  .spinner
    margin: 32px 0
    text-align: center
</style>
