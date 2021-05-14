/* ============
 * Actions for the User module
 * ============
 *
 * The actions that are available on the
 * User module.
 */
//@ts-check

export default {
  login({ commit }, authParams) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/users/login`, authParams)
       .then((response) => {
            commit('login', response.data)
            resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  async signup({ commit }, signupParams) {
    try {
      const user = await this.$axios.post(`/api/users/signup`, signupParams)
      commit('signup', user)
      return user
    } catch (error) {
      return error
    }
  }
}
