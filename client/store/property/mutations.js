//@ts-check

export default {
  list(state, { data }) {
    state.list = data
  },
  count(state, { data }) {
    state.count = data.count
  },
  create(state, { data }) {
    state.list.push(data)
  }
}
