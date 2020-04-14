import Vuex from '@wepy/x';
import wepy from '@wepy/core';

wepy.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    launched: false
  },
  mutations: {
    increment (state) {
      state.counter++;
    },
    decrement (state) {
      state.counter--;
    },
    set_launched (state, boo) {
      state.launched = Boolean(boo)
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment');
    },
    decrement ({ commit }) {
      commit('decrement');
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    set_launched({ commit }, boo) {
      console.log('set_launched', boo);
      commit('set_launched', boo);
    }
  }
});
