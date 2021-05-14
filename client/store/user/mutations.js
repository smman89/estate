//@ts-check

export default {
  login(state, { token, username }) {
    state.token = token,
    state.username = username
  },

}
