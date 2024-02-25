<script setup lang="ts">
  import TreeEl from '@/components/TreeEl.vue'
  import { useTreeState } from '@/stores/tree.store'
  
  const treeData = useTreeState()
</script>

<template>
  <main class="self-start pt-4">
   <figure>
      <ul class="tree">
        <TreeEl v-if="treeData" :treeData="treeData" />
      </ul>
    </figure>
  </main>
</template>


<style scoped lang="scss">
  figure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }
</style>