<script setup lang="ts">
  import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="loader-wrap">
    <Icon icon="eos-icons:bubble-loading" height="142" />
  </div>
</template>

<style scoped>
  .loader-wrap {
    position: absolute;
    align-self: center;
    justify-self: center;
  }
</style>