<template>
  <div class="enter">
    <h4>enter:</h4>
    <button v-if="!entered" class="btn btn-default" v-on:click="createTerm">Enter container</button>
    <div v-el:term class="term"></div>
  </div>
</template>

<script>
import Terminal from 'xterm';
import 'xterm/addons/attach/attach';
import 'xterm/addons/fit/fit';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  data() {
    return {
      entered: false,
    };
  },
  props: [
    'name',
  ],
  methods: {
    destroyTerm() {
      if (this.term && this.socket) {
        this.socket.close();
        this.term.detach(this.socket);
        this.term.destroy();
      }
    },
    createTerm() {
      const protocol = (location.protocol === 'https:') ? 'wss' : 'ws';
      const port = location.port ? `:${location.port}` : '';
      const socketURL = `${protocol}://${location.hostname}${port}/shell?appName=${this.name}`;
      this.destroyTerm();
      this.entered = true;

      this.term = new Terminal({ cursorBlink: true });
      this.term.open(this.$els.term);
      this.term.fit();

      this.socket = new WebSocket(socketURL);

      this.socket.onopen = () => {
        this.term.attach(this.socket);
      };
    },
  },
  watch: {
    name() {
      this.destroyTerm();
      this.entered = false;
    },
  },
  beforeDestroy() {
    this.destroyTerm();
  },
  components: {
    PulseLoader,
  },
};
</script>

<style scoped lang="sass">
  .spinner
    margin: 32px 0
    text-align: center
</style>
