<!-- Este componente é a página Dashboard que o usuário acessa após realizar
o login com sucesso. É uma página protegida, onde os dados do usuário autenticado
são exibidos, ela só pode ser acessada com autenticação.  -->

<template>

  <VContainer>

    <VContainer>
      <VAppBar color="primary" dark>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout" color="white">Logout</v-btn>
      </VAppBar>
    </VContainer>

    <VContainer class="pa-5 mt-10">
      <h1>Bem-vindo(a), {{ user?.username }}</h1>
      <p>Essa é sua página de gerenciamento, onde você vai poder realizar a escolha de qual área vai ser gerenciada.</p>
    </VContainer>

    <VContainer class="d-flex justify-center align-center flex-column">
      <v-card-title>Gerenciadores:</v-card-title>
      <v-card class="d-flex flex-column pa-5" max-width="500" color="primary">
        <v-btn @click="changeToProducts" color="secondary" class="mb-3">Estoque</v-btn>
        <v-btn @click="changeToUsers" color="secondary">Usuários</v-btn>
      </v-card>
    </VContainer>

  </VContainer>

</template>
  
<script>
  import { useAuthStore } from '../stores/auth';
  
  export default {
    setup() {
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

      return { user: authStore.user, logout, changeToProducts, changeToUsers};
    },
     
  };
</script>
  