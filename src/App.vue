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
@import "common.sass"

body
  color: $color-main-darker
  font-family: 'Source Sans Pro', Helvetica, sans-serif

.view a
  color: $color-main-dark
  text-decoration: none

  &:hover
    // color: 

.menu + .container
  margin-left: $menu-width + $menu-right-margin

.view
  margin: 32px 0 64px

</style>
