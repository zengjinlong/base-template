import { CHANGE_VALUE } from '../type'
const state = {
  value: 0
}
const mutations = {
  [CHANGE_VALUE] (state, value) {
    state.value = value
  }
}
export default {
  state,
  mutations
}
