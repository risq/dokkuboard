<template>
  <menu></menu>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <router-view class="view" keep-alive></router-view>
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
$menuWidth: 300px

#app
  color: #2c3e50
  font-family: Source Sans Pro, Helvetica, sans-serif

#app a
  color: #42b983
  text-decoration: none

.menu
  width: $menuWidth

.menu + .container
  margin-left: $menuWidth

.view
  margin-top: 32px

</style>
