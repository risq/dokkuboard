<template>
  <button v-if="!started" class="btn btn-default" v-on:click="createTerm">{{startMessage}}</button>
  <button v-if="started" class="btn btn-danger" v-on:click="leaveTerm">{{stopMessage}}</button>
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
    'url',
    'startMessage',
    'stopMessage',
  ],
  methods: {
    createTerm() {
      if (this.url) {
        const protocol = (location.protocol === 'https:') ? 'wss' : 'ws';
        const port = location.port ? `:${location.port}` : '';
        const socketURL = `${protocol}://${location.hostname}${port}/${this.url}`;
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
    url() {
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
    margin-top: 24px
    font-family: 'Source Code Pro', monospace
    font-size: .9rem
    padding: 12px
    border-radius: 4px
    background-color: $color-black
    overflow: auto
</style>
