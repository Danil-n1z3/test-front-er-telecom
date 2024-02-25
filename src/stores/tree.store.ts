import { TreeNode, type EditableNodeFields } from '@/domain/Tree'
import { defineStore } from 'pinia'
import _ from 'lodash'

function initTreeData() {
  const root = new TreeNode(null)
  const child_A_district = new TreeNode(root, 'Район', false, 'Первый')
  const child_B = new TreeNode(root, 'Район', false, 'Второй')
  const child_C = new TreeNode(root, 'Район', false, 'Третий')
  const child_A_street = new TreeNode(child_A_district, 'Улица', false, 'Пушкина')
  new TreeNode(child_A_street, 'Дом', false, 'Колотушкина')
  new TreeNode(child_A_street, 'Дом', false, 'Колотушкина 2')
  new TreeNode(child_A_street, 'Дом', false, 'Колотушкина 3')
  return root
}

const defaultTreeState = initTreeData()
const treeState: TreeNode = _.cloneDeep(defaultTreeState)

export const useTreeState = defineStore('TreeState', {
  state: () => treeState,
  actions: {
    resetTree() {
      this.$patch(defaultTreeState)
    },
    set(tree: TreeNode) {
      this.$patch(tree)
    },
    updateNode(id: string, propertyName: EditableNodeFields, value: any) {
      function updateNodeById(id: string, node: TreeNode, propertyName: EditableNodeFields, value: any) {
        if (node.id === id) node[propertyName] = value
        else if (node.children.length) {
          for (let i = 0; i < node.children.length; i++) {
            node.children[i] = updateNodeById(id, node.children[i], propertyName, value)
          }
        }
        return node
      }
      this.$patch(updateNodeById(id, treeState, propertyName, value))
    }
  }
})