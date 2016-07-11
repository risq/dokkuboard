<template>
  <button v-if="!started" class="btn btn-primary-outline" v-on:click="createTerm">
    <i class="fa fa-terminal fa-fw" aria-hidden="true"></i> {{startMessage}}
  </button>
  <button v-if="started" class="btn btn-danger-outline" v-on:click="leaveTerm">
    <i class="fa fa-power-off fa-fw" aria-hidden="true"></i> {{stopMessage}}
  </button>
  <div v-el:term class="term"></div>
</template>

<script>
import Terminal from 'xterm';
import 'xterm/addons/attach/attach';
import 'xterm/addons/fit/fit';

export default {
  data() {
    return {
      started: false,
    };
  },
  props: [
    'command',
    'startMessage',
    'stopMessage',
  ],
  methods: {
    createTerm() {
      if (this.command) {
        const protocol = (location.protocol === 'https:') ? 'wss' : 'ws';
        const port = location.port ? `:${location.port}` : '';
        const socketURL = `${protocol}://${location.hostname}${port}/shell/${this.command}`;
        this.destroyTerm();
        this.started = true;

        this.term = new Terminal({ cursorBlink: true });
        this.term.open(this.$els.term);
        this.term.fit();

        this.socket = new WebSocket(socketURL);

        this.socket.onopen = () => {
          this.term.attach(this.socket);
        };
      }
    },
    destroyTerm() {
      if (this.term && this.socket) {
        this.term.detach(this.socket);
        this.term.destroy();
        this.socket.close();
      }
    },
    leaveTerm() {
      this.started = false;
      this.destroyTerm();
    },
  },
  watch: {
    command() {
      this.destroyTerm();
      this.started = false;
    },
  },
  beforeDestroy() {
    this.destroyTerm();
  },
};
</script>

<style lang="sass">
  @import "../common.sass"

  .terminal
    margin-top: 12px
    font-family: 'Source Code Pro', monospace
    font-size: .9rem
    padding: 12px
    border-radius: 4px
    background-color: $color-black
    overflow: auto
    height: 256px
</style>
