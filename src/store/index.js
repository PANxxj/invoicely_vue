import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      id: "",
      username: "",
    },
    isAuthenticated: false,
    token: "",
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.user.username=localStorage.getItem('username')
        state.user.id=localStorage.getItem('userid')
        state.isAuthenticated = true;
      } else {
        state.user.id = "";
        state.user.username = '';
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.user.id = "";
      state.user.username = '';
      state.token = "";
      state.isAuthenticated = false;
    },
    setUser(state,user){
      state.user=user
    }
  },
  actions: {},
  modules: {},
});
