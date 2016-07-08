<template>
  <div class="menu navbar">
    <pulse-loader class="menu__spinner" :color="'#fff'" v-if="isLoading"></pulse-loader>
    <ul v-if="!isLoading" class="nav navbar-nav">
      <li class="menu__item">
        <a class="nav-link" v-link="{ path: '/' }"=>all apps</a>
      </li>
      <li class="menu__item">
        <ul>
          <li class="menu__item" v-for="name in apps">
            <a class="nav-link" v-link="{ path: `/apps/${name}` }">> {{name}}</a>
          </li>
        </ul>
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

<style scoped lang="sass">
@import "../common.sass"

.menu
  position: fixed
  border-radius: 0
  height: 100%
  border-right: 6px solid $color-main-light
  width: $menu-width
  background-color: $color-main
  color: #888

  a
    color: $color-main-darker

    &:hover
      color: #000

  &__title
    font-size: 2rem
    border-bottom: 1px solid #888

  &__item
    font-size: 1.2rem
    float: none
    min-height: 32px
    line-height: 32px
    font-weight: bold

    ul
      padding-left: 8px
      font-family: 'Source Code Pro', monospace

      li
        list-style: none
        min-height: 18px
        line-height: 18px
        font-size: .9rem

  &__spinner
    text-align: center
    margin: 128px 0

</style>
