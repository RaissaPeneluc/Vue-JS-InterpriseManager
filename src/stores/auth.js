/* Gerenciando o estado de login */

import { defineStore } from 'pinia';
import { stringifyQuery } from 'vue-router';

export const useAuthStore = defineStore ('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        login(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user)); // Salvando no armazenamento local
        },
        logout(){
            this.user = null;
            localStorage.removeItem('user'); // Remove do armazenamento local
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
});