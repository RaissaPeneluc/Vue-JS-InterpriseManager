<!-- Este componente é a página Login onde o usuário irá realizar o login.
Se realizado corretamente, após autenticação ele será direcionado para 
acessar o gerenciamento das funcionalidades da plataforma.  -->

<template>
  <v-container>
    <v-app-bar color="#5D2AA4">
      <v-app-bar-title>Interprise Manager</v-app-bar-title>
    </v-app-bar>
  </v-container>

  <v-container max-height="40vh" class="d-flex justify-center py-16">
    <img src="../assets/group3.svg"/>
  </v-container>

  <!-- Card de Login -->
  <v-container class="d-flex justify-center align-center" style="height: 30vh">
    <v-card rounded="xl" class="pa-5 w-25 border-thin">
      <v-card-title class="mb-2">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="E-mail"
            placeholder="xxxxxxx@xxxxx.xxx"
            type="email"
            variant="solo"
            prepend-inner-icon="mdi-email"
            clearable
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Senha"
            :type="visible ? 'text' : 'password'"
            variant="solo"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            clearable
            required
          ></v-text-field>
          <v-btn type="submit" color="#5D2AA4" class="mt-4" block>Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useAuthStore } from "../stores/auth"; // Importando uma store (gerenciador de estado) para gerenciar a autenticação de forma centralizada.
import { ref } from "vue"; // Função para criar variáveis que podem ser monitoradas para mudanças.

export default {
  data: () => ({
    visible: false,
  }),
  setup() {
    const email = ref("");
    const password = ref("");
    const authStore = useAuthStore(); // Store de autenticação, gerencia ações como login e verifica se o usuário está autenticado.

    // Função responsável por gerenciar o processo de login do usuário na aplicação.
    const handleLogin = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users"); // Busca os usuários na API.
        const users = await response.json();

        // Verifica se o usuário existe baseado no e-mail e a senha fornecidos.
        const user = users.find(
          (u) => u.email === email.value && u.password === password.value
        );

        if (user) {
          authStore.login(user); // Chama o método login da store para salvar o estado do usuário logado.
          alert("Login realizado com sucesso!");
          window.location.href = "/products"; // Redireciona o usuário para a página de dashboard após o login bem-sucedido.
        } else {
          alert("E-mail ou senha inválidos");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao realizar o login");
      }
    };

    return { email, password, handleLogin };
  },
};
</script>
