import { mapGetters } from 'vuex'
import store from '@/store'

export function mapGetterMethods (mapping) {
  let ctx = {
    $store: store
  }
  let methods = mapGetters(mapping)

  for (let key of Object.keys(methods)) {
    methods[key] = methods[key].call(ctx)
  }

  return methods
}

/**
 * Create a function that refers to a getter that you can use in `store.watch()`
 *
 * @param getterName namespaced getter name
 * @param args will be passed to the getter if it is a function
 * @returns {function()}
 */
export function watchGetter (getterName, ...args) {
  return () => {
    let getter = store.getters[getterName]
    if (typeof getter === 'function') {
      return getter(...args)
    }
    else {
      return getter
    }
  }
}
