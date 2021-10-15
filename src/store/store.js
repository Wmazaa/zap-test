import { createStore } from 'vuex';

export const store = createStore({
    state () {
        return {
            editRow: null,
        }
    },
    getters: {
        getEditRow: state => {
            return state.editRow;
        },
    },
    mutations: {
        setEditRow(state, row) {
            state.editRow = row;
        },
    },
    actions: {},
})