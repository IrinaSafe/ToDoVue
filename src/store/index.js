import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import { GET_TODOS_FROM_API, SEND_DATA } from '@/store/mutations-types';
import { QUANTITY_TODOS } from '@/constans.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    todos(state) {
        return state.todos;
    },
    filteredTodos(state) {
      return state.todos.filter((item, index) => index < QUANTITY_TODOS);
    },
  },
  mutations: {
    [GET_TODOS_FROM_API](state, todos) {
        state.todos = todos;
    },
    [SEND_DATA](state, data) {
      state.todos.unshift({
        title: data.title,
        completed:false,
        id: state.todos.length + 1,
        userId: 1,
        body: data.body,
      })
    },
  },
  actions: {
    [GET_TODOS_FROM_API]({ commit }) {
      return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((todos) => {
            commit(GET_TODOS_FROM_API, todos.data);
        })
        .catch((error) => {
            console.log(error)
        })
    },
    [SEND_DATA]({ commit }, data) {
      commit(SEND_DATA, data);
    },
  },
});