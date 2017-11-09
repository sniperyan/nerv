import { mountVNode, flushMount } from './lifecycle'
import { isString, isNumber } from 'nerv-utils'
import { isWidget, isVNode, VNode, VirtualNode } from 'nerv-shared'

function isVChild (vnode): vnode is string | number | VNode {
  return isVNode(vnode) || isString(vnode) || isNumber(vnode)
}

export function render (vnode: VirtualNode, container: Element, callback?: Function) {
  if (!isVChild(vnode) && !isWidget(vnode)) {
    return null
  }
  /* istanbul ignore if */
  if (!container || container.nodeType !== 1) {
    throw new Error(`${container} should be a DOM Element`)
  }
  const dom = mountVNode(vnode, {})
  if (dom) {
    container.appendChild(dom)
  }
  if (container) {
    (container as any)._component = vnode
  }
  flushMount()

  if (callback) {
    callback()
  }

  return (vnode as any).component || dom
}