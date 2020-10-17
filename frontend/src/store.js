import Vue from 'vue'
import Vuex from 'vuex'

import App from './store/App'
import cHeader from './store/cHeader'
import cPhotoSelector from './store/cPhotoSelector'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    App,
    cHeader,
    cPhotoSelector,
  },
  strict: debug,
})

store.subscribe((mutation, state) => {
  if (mutation.type === 'app/SYMBOL') localStorage.setItem('symbol', mutation.payload)
})

export default store
