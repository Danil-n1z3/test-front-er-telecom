<script setup lang="ts">
  import { Icon } from '@iconify/vue/dist/iconify.js'
  import type { TreeNode } from '@/domain/Tree'
  import { v4 as uuidv4 } from 'uuid'

  import { useTreeState } from '@/stores/tree.store'
  import { ref } from 'vue'

  const props = defineProps<{
    location: String
    value: String
    node: TreeNode
  }>()

  const emits = defineEmits<{
    (name: 'close'): void
  }>()

  const treeState = useTreeState()

  const text = ref(props.value)
  const someData = ref(props.node.someDataArray)

  const handleInputChange = (event: Event) => {
    (event.target as HTMLInputElement).value
    return { handleInputChange }
  }

  function save() {
    treeState.updateNode(props.node.id, 'value', text)
    // treeState.updateNode(props.node.id, 'someDataArray', someData) // push с кнопки почему то обновляет store ????
    emits('close')
  }

</script>
<template>
  <div class="editor-wrap" @click="$emit('close')">
    <div class="editor-form" @click.stop>
      <span>{{ location }}</span>
      <input type="text" v-model="text">
      <button class="border p-2 m-2" @click="someData.push(uuidv4())">add some value to node data</button>
      <div v-for="el in someData">
        <div style="padding: 1rem;">
          <span>{{el}}</span>
        </div>
      </div>
      
      <div class="actions">
        <button class="close-btn" @click="$emit('close')">
          Close
        </button>
        <button class="close-btn" @click="save">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.editor-wrap {
  @apply w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur z-10;
  .editor-form {
    width: auto;
    height: auto;
    border: solid 1px gray;
    border-radius: 1rem;
    padding: 1rem;
    background: white;
    input {
      font-size: 15px;
      color: #555;
      line-height: 1.2;
      display: block;
      width: 100%;
      height: 45px;
      padding: 0 5px;
      outline: none;
      border-bottom: solid 1px #cdcdcd;
      overflow: visible;
      padding-block: 1px;
      padding-inline: 2px;
    }
    .actions {
      @apply flex justify-between;
      button {
        @apply border p-1 rounded-sm m-4;
      }
    }
  }
}
</style>

