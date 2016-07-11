<template>
  <div class="error" v-if="error && (error.stdout || error.stderr)">
    <h4 class="error__title"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Error</h4>
    <div class="error__content error__content--both" v-if="error.stderr && error.stdout === error.stderr">
      {{error.stderr}}
    </div>
    <div class="error__content error__content--stderr" v-if="error.stderr && error.stdout !== error.stderr">
      {{error.stderr}}
    </div>
    <div class="error__content error__content--stdout" v-if="error.stdout && error.stdout !== error.stderr">
      {{error.stdout}}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'error',
  ],
};
</script>

<style scoped lang="sass">
  @import "../common.sass"

  .error
    font-family: 'Source Code Pro', monospace
    font-size: .9rem
    color: $color-main

    &__title
      font-size: .8rem
      text-transform: uppercase
      color: $color-main
      font-weight: 700
      margin: 0 0 .25rem
      padding-left: 0.25rem
      color: $color-accent-secondary-dark

    &__content
      background-color: $color-main-lighter
      padding: 0.5rem
      position: relative
      margin-top: 1.25rem

      &:first-of-type
        margin-top: 0

      &--stderr:before,
      &--stdout:before,
      &--both:before,
        display: block
        position: absolute
        top: -1.25rem
        right: 0
        font-weight: 700
        color: darken($color-main-lighter, 10%)

      &--stderr:before
        content: "stderr"

      &--stdout:before
        content: "stdout"

      &--both:before
        content: "stderr, stdout"

</style>
