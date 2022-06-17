import axios from 'axios';
import { GET_TODOS_FROM_API } from '@/store/mutations-types';

export default {
    namespaced: true,

    state: {
        todos: [],
    },
    getters: {
        todos(state) {
            return state.todos;
        },
    },
    mutations: {
        [GET_TODOS_FROM_API](state, todos) {
            state.todos = todos;
        },
    },
    actions: {
        [GET_TODOS_FROM_API]({ commit }) {
            return axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((todos) => {
                console.log('Hey');
                commit(GET_TODOS_FROM_API, todos.data);
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
};