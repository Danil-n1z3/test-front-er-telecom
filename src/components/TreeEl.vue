<script setup lang="ts">
  import { useTreeState } from '@/stores/tree.store'
  import { TreeNode } from '@/domain/Tree'
  import NodeEditor from '@/components/NodeEditor.vue'
  import NodeViewer from '@/components/NodeViewer.vue'
  import { Icon } from '@iconify/vue'
  import { ref } from 'vue'
  
  const props = defineProps<{
    treeData: TreeNode
  }>()

  const currentEditNode = ref<TreeNode | null>(null)
  const editForm = ref(false)
  const viewForm = ref(false)

  const open = (node: TreeNode) => {

  }
  const remove = (node: TreeNode) => {

  }
  const edit = (node: TreeNode) => {
    currentEditNode.value = node
    editForm.value = true
  }

  const view = (node: TreeNode) => {
    currentEditNode.value = node
    viewForm.value = true
  }

  const isOpen = ref(false)
  
</script>

<template>
  <li>
    <code :class="isOpen ? 'bg-slate-200' : 'bg-slate-50'">
      <div class="node-content">
        <button v-if="!isOpen && treeData.children.length" @click="isOpen = !isOpen">
          <Icon icon="material-symbols:expand-circle-down-outline"/>
        </button>
        <button v-else-if="treeData.children.length">
          <Icon icon="material-symbols:expand-circle-up-outline" @click="isOpen = !isOpen"/>
        </button>
        
        <slot name="index"/>
        <slot name="value" />
        {{ treeData.location }}
        <div class="item-actions">
          <button v-if="!treeData.viewOnly && !treeData.children.length" @click.stop="edit(treeData)">
            <Icon icon="material-symbols:edit-outline-rounded" />
          </button>
          <button @click.stop="view(treeData)">
            <Icon icon="ic:baseline-remove-red-eye" />
          </button>
        </div>
      </div>
    </code>
    <ul>
      <TreeEl
        v-if="isOpen"
        v-for="(child, index) in treeData.children"
        :key="index"
        :treeData="child"
      >
        <!-- <template #index> <div class="index">{{ index + 1 }}</div></template> -->
        <template #value> {{ child.value }} </template>
      </TreeEl>
    </ul>

    <NodeEditor
      v-if="currentEditNode && editForm"
      @close="editForm = false"
      :node="currentEditNode"
      :location="currentEditNode.location"
      :value="currentEditNode.value"
    />
    <NodeViewer
      v-if="currentEditNode && viewForm"
      :node="currentEditNode"
      @close="viewForm = false"
    />
  </li>
</template>

<style lang="scss">
/* It's supposed to look like a tree diagram */
.tree, .tree ul, .tree li {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.tree {
  margin: 0 0 1em;
  text-align: center;
}
.tree, .tree ul {
  display: table;
}
.tree ul {
  width: 100%;
}
.tree li {
  display: table-cell;
  padding: .5em 0;
  vertical-align: top;
}
  /* _________ */
  .tree li:before {
    outline: solid 1px #666;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .tree li:first-child:before {left: 50%;}
  .tree li:last-child:before {right: 50%;}

  .tree code {
    border: solid .1em #666;
    border-radius: .2em;
    display: inline-block;
    margin: 0 .2em .5em;
    padding: .2em .5em;
    position: relative;
  }

  /* | */
  .tree ul:before,
  .tree code:before {
    outline: solid 1px #666;
    content: "";
    height: .45em;
    left: 50%;
    position: absolute;
  }
  .tree ul:before {
    top: -.5em;
  }
  .tree code:before {
    top: -.55em;
  }


/* The root node doesn't connect upwards */
.tree > li {margin-top: 0;}
  .tree > li:before,
  .tree > li:after,
  .tree > li > code:before {
    outline: none;
  }

.node-content {
  @apply flex items-center
}
.item-actions {
  @apply flex gap-2 pl-1
}
</style>
