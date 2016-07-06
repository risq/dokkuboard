<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-9">
          <dokku-apps></dokku-apps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DokkuApps from './components/DokkuApps';

export default {
  components: {
    DokkuApps,
  },
};
</script>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap"

#app
  color: #2c3e50
  font-family: Source Sans Pro, Helvetica, sans-serif

#app a
  color: #42b983
  text-decoration: none

</style>
