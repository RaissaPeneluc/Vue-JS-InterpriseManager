<template>
  <VContainer>
    <VAppBar color="primary" class="">
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn @click="changeToProducts" color="white" class="">Estoque</v-btn>
        <v-btn @click="changeToUsers" color="white">Usuários</v-btn>
      </v-toolbar-items>

      <v-btn @click="logout" color="white" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </VAppBar>
  </VContainer>
</template>

<script setup>
    import { useAuthStore } from '../stores/auth';

    defineProps(['title'])

    const authStore = useAuthStore(); // Recupera a store de autenticação para acessar o usuário e a função de logout.

    // Função para deslogar o usuário.
    const logout = () => {
        authStore.logout(); // Chama o método de logout da store.
        window.location.href = '/'; // Redireciona o usuário para a página inicial.
      };
      
      const changeToProducts = () => {
        window.location.href = '/products';
      };

      const changeToUsers = () => {
        window.location.href = '/users';
      };
      
</script>
