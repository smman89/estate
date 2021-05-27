//@ts-check

export default {
  login(state, user) {
    Object.keys(user).forEach(field => state[field] = user[field])
    state.isLoggedIn = true
  },

  edit(state, user) {
    Object.keys(user).forEach(field => state[field] = user[field])
  },

  logout(state) {
    Object.keys(state).forEach(field => state[field] = null)
    state.isLoggedIn = false
  }
}
