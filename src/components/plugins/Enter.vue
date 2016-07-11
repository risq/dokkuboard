<template>
  <div class="enter">
    <h4><span class="label label-default">enter</span></h4>
    <command :command="`enter ${name}`"></command>
    <shell
      :command="`enter?appName=${name}`"
      :start-message="'Enter container'"
      :stop-message="'Leave container'"></shell>
  </div>
</template>

<script>
import Command from 'components/Command';
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
    Command,
  },
};
</script>

<style scoped lang="sass">
  @import "../../common.sass"

  .spinner
    margin: 32px 0
    text-align: center
</style>
