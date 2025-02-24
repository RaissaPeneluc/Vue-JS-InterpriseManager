<!-- Este componente tem a função de criar uma barra de navegação
para todas as páginas, que receba os títulos dinamicamente -->

<!-- Criação da barra de navegação padrão para as interfaces -->
<template> 
  <v-container>
    <v-app-bar color="#5D2AA4" class="d-flex">
      <v-row no-gutters align="center" justify="space-between" class="mx-4">
        <v-col class="text-h5">{{ title }}</v-col>

        <v-col class="d-flex justify-center">
          <v-btn @click="changeToProducts" color="white" 
            >Produtos</v-btn
          >
          <v-btn @click="changeToUsers" color="white">Usuários</v-btn>
        </v-col>

        <v-col class="d-flex justify-end">
          <v-btn @click="logout" color="white" icon>
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

// Tornando o título dinâmico
defineProps(["title"]);

const authStore = useAuthStore(); // Recupera a store de autenticação para acessar o usuário e a função de logout.

// Função para deslogar o usuário.
const logout = () => {
  authStore.logout(); // Chama o método de logout da store.
  window.location.href = "/"; // Redireciona o usuário para a página inicial.
};

// Redireciorenamento para a interface de produtos 
const changeToProducts = () => {
  window.location.href = "/products";
};

// Redirecionamento para a interface de usuários 
const changeToUsers = () => {
  window.location.href = "/users";
};
</script>
