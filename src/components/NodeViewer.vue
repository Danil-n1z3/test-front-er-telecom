<script setup lang="ts">
  import { Icon } from '@iconify/vue/dist/iconify.js'
  import type { TreeNode } from '@/domain/Tree'
  import { computed } from 'vue'

  const props = defineProps<{
    node: TreeNode
  }>()

  const handleInputChange = (event: Event) => {
    (event.target as HTMLInputElement).value
    return { handleInputChange }
  }

</script>
<template>
  <div class="view-wrap" @click="$emit('close')">
    <div class="view-form" @click.stop>
      <span style="padding: 1rem;">{{ node.location }}</span>
      <span style="padding: 1rem;">{{ node.value }}</span>

      some data
      <ul>
        <li v-for="el in node.someDataArray">
          <div style="padding: 1rem;">
            <span>{{el}}</span>
          </div>
        </li>
      </ul>
      
      <div class="actions">
        <button class="close-btn" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.view-wrap {
  @apply w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur z-10;
  .view-form {
    width: auto;
    height: auto;
    border: solid 1px gray;
    border-radius: 1rem;
    padding: 1rem;
    background: white;
  }
}
</style>

