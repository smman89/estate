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
      const properties = await this.$axios.get(`/api/ads?filter={"limit":${params.limit},"skip":${params.skip},"where":${JSON.stringify(params.where)}}`)
      commit('list', properties)
      const count = await this.$axios.get(`/api/ads/count?where=${JSON.stringify(params.where)}`)
      commit('count', count)
    } catch (error) {
      return error
    }
  }
}
