//@ts-check

export default {
  list(state, { data }) {
    state.list = data
  },
  count(state, { data }) {
    state.count = data.count
  }
}
