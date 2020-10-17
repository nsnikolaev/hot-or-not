import api from '../api'

const state = {
  photoList: [],

  // переменные для порционной загрузки
  fetchFrom: 0, // начальный индекс следующего загружаемого пакета
  packetLength: 4, // Размер пакета для единоразовой подгрузки изображений
}

const getters = {
  // ...
}

const actions = {
  async fetch({ commit }) {
    const packet = await api.imageList(state.fetchFrom, state.packetLength)
    commit('PHOTO_LAST_INDEX_ADD', packet.length)
    commit('PHOTO_LIST_CONCAT', packet)
  },
  async shift({ commit, dispatch }) {
    await commit('PHOTO_LIST_SHIFT') // дождаться выполнения коммита перед новой догрузкой пакетов
    if (state.photoList.length / state.packetLength <= 0.5) { // запросить новый пакет изображений,
                                                              // если осталось меньше половины
      dispatch('fetch')
    }
  },
  async restart({ commit, dispatch }) {
    await commit('CLEAR')
    dispatch('fetch')
  }
}

const mutations = {
  PHOTO_LIST_CONCAT: (state, packet) => state.photoList = state.photoList.concat(packet),
  PHOTO_LIST_SHIFT: async (state) => state.photoList.shift(),
  PHOTO_LAST_INDEX_ADD: (state, length) => state.fetchFrom += length,
  CLEAR: (state) => {
    state.photoList = []
    state.fetchFrom = 0
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
