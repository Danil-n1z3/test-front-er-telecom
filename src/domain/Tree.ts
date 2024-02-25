import { v4 as uuidv4 } from 'uuid'

export type Location = 'Город' | 'Район' | 'Улица' | 'Дом' | 'Подъезд'
export type EditableNodeFields = 'value' | 'someDataArray'

export class TreeNode 
{ 
  public isRoot: Boolean = false
  public parent: TreeNode | null
  public children: TreeNode[] = []
  public location: Location = 'Город'
  public viewOnly: Boolean = false
  public value: String = 'empty'
  public someDataArray: any[] = []
  public id: string = uuidv4()
  constructor(parent: TreeNode | null, location?: Location, viewOnly?: Boolean, value?: String) {
    
    this.parent = parent
    if (location) this.location = location
    if (viewOnly) this.viewOnly = viewOnly
    if (value) this.value = value
    
    if (this.parent) this.parent.children.push(this)
  }
}