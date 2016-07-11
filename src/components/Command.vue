<template>
  <div class="command" v-bind:class="{ 'command--inline': inline }">
    <span class="command__prompt">dokku</span><span class="command__symbol">></span> {{command}}
  </div>
</template>

<script>
export default {
  props: [
    'command',
    'inline',
  ],
};
</script>

<style scoped lang="sass">
  @import "../common.sass"

  .command
    font-family: 'Source Code Pro', monospace
    color: $color-main-light
    font-size: .9rem
    font-weight: 700
    margin: 16px 0 8px
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden

    &--inline
      display: inline-block
      margin-left: 12px

    &__prompt
      font-weight: 500

    &__symbol
      font-size: .7rem
</style>
