/* ============
 * Actions for the Property module
 * ============
 *
 * The actions that are available on the
 * Property module.
 */
//@ts-check

export default {
  async login({ commit }, authParams) {
    try {
      const { data } = await this.$axios.post(`/api/users/login`, authParams)
      commit('login', data)
    } catch (error) {
      return error
    }
  },
  async signup({ commit }, signupParams) {
    try {
      const user = await this.$axios.post(`/api/users/login`, signupParams)
      commit('signup', user)
    } catch (error) {
      return error
    }
  }
}
