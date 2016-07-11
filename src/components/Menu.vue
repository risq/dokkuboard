<template>
  <div class="menu">
    <div class="logo">
      <h1 class="title">
        dokku<span class="title-symbol">></span><span class="title-bold">board</span>
      </h1>
    </div>
    <pulse-loader class="spinner" :color="'#96edd6'" v-if="isLoading"></pulse-loader>
    <ul v-if="!isLoading" class="nav navbar-nav">
      <li class="item">
        <a v-link="{ path: '/home' }">all apps</a>
      </li>
      <li class="item">
        <ul>
          <li class="item" v-for="name in apps">
            <a v-link="{ path: `/apps/${name}` }">> {{name}}</a>
          </li>
        </ul>
      </li>
      <li class="item">
        <a v-link="{ path: '/config' }">config</a>
      </li>
      <li class="item">
        <a v-link="{ path: '/events' }">events</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  data() {
    return {
      apps: [],
      isLoading: true,
    };
  },
  ready() {
    this.loadApps();
  },
  methods: {
    loadApps() {
      return axios.get('/api/apps')
        .then(({ data }) => {
          this.apps = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  events: {
    onAppDelete() {
      this.loadApps();
    },
  },
  components: {
    PulseLoader,
  },
};
</script>

<style lang="sass">
@import "../common.sass"

.menu
  position: fixed
  border-radius: 0
  height: 100%
  border-right: 6px solid $color-accent-light
  width: $menu-width
  background-color: $color-main
  color: $color-white

  a
    color: $color-white
    text-decoration: none

    &:hover
      color: $color-accent

    &.v-link-active
      color: $color-accent

.item
  font-size: 1.2rem
  float: none
  min-height: 32px
  line-height: 32px
  font-weight: bold
  padding: 0 24px
  margin: 6px 0

  ul
    padding-left: 8px
    font-family: 'Source Code Pro', monospace

    .item
      list-style: none
      min-height: 18px
      line-height: 18px
      font-size: .9rem
      padding: 6px 6px
      margin: 0

      &:first-of-type
        margin-top: 6px

.logo
  padding: 8px 24px
  margin: 0 0 16px
  background-color: darken($color-main, 2%)
  text-align: center

  .title
    font-family: 'Source Sans Pro', Helvetica, sans-serif
    font-size: 1.5em
    padding: 16px 0
    // border-bottom: 1px solid $color-main-light
    color: $color-accent-light
    margin: 0

    &-symbol
      font-family: 'Source Code Pro', monospace
      display: inline-block
      color: $color-main-light
      font-size: 1rem
      margin: 0 -1px
      font-weight: 700

    &-bold
      font-family: 'Source Code Pro', monospace
      font-weight: bold
      color: $color-white
      font-size: 1.45rem

.spinner
  text-align: center
  margin: 128px 0

</style>
