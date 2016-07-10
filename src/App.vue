<template>
  <menu></menu>
  <div class="container app">
    <div class="row">
      <div class="col-sm-12">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu';

export default {
  components: {
    Menu,
  },
};
</script>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/xterm/src/xterm.css"
@import "main.sass"
@import "common.sass"

body
  background-color: $color-white
  color: $color-main-dark
  font-family: 'Source Sans Pro', Helvetica, sans-serif

a
  color: $color-accent-dark
  text-decoration: none

  &:hover
    color: $color-main

.menu + .container
  margin-left: $menu-width + $menu-right-margin

.view
  margin: 32px 0 64px

</style>
