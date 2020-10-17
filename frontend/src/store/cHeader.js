// store использует модули только для родительских компонентов
// и представляет реактивный state для родительского компонента и его наследников.
// Модуль имеет название идентичное родительскому компоненту для целей рефакторинга.

const state = {
  // ...
}

const getters = {
  // ...
}

const actions = {
  // ...
}

const mutations = {
  // ...
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
