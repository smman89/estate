/* ============
 * Actions for the Property module
 * ============
 *
 * The actions that are available on the
 * Property module.
 */
//@ts-check

export default {
  async list({ commit }, params) {
    try {
      const properties = await this.$axios.get(`/api/ads?filter[limit]=${params.limit}&filter[skip]=${params.skip}`)
      commit('list', properties)
      const count = await this.$axios.get(`/api/ads/count`)
      commit('count', count)
    } catch (error) {
      return error
    }
  }
}
