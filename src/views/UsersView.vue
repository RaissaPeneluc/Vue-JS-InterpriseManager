<template>
    <VContainer>
      <VAppBar class="" color="primary">
        <VAppBarTitle>Usuários</VAppBarTitle>
      </VAppBar>
    </VContainer>
  
    <!-- Container de botões de alterações -->
    <VContainer class="d-flex pa-5 mt-10">
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="dialogCreate = true">Criar Usuário</v-btn>
      </VContainer>
  
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="openEditDialog" :disabled="!selectedUser">Editar Usuário</v-btn>
      </VContainer>
  
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="viewUserDetails" :disabled="!selectedUser">Detalhar Usuário</v-btn>
      </VContainer>
  
      <!-- Botão para deletar um produto -->
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="deleteUser" :disabled="!selectedUser">Deletar Usuário</v-btn>
      </VContainer>
    </VContainer>
  
    <!-- Dropdown para selecionar um produto -->
    <VContainer class="d-flex justify-center mt-5">
      <v-select
        v-model="selectedUser"
        :items="users"
        item-text="fullName"
        item-value="id"
        item-title="fullName"
        label="Selecione um usuário"
        outlined
        dense
      ></v-select>
    </VContainer>
  
    <!-- Tabela de Produtos -->
    <VContainer>
      <v-data-table :headers="headers" :items="users" item-value="id" class="elevation-1">
        <template v-slot:items="props">
          <tr :key="props.item.id">
            <td>{{ props.item.fullName }}</td>
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
          </tr>
        </template>
      </v-data-table>
    </VContainer>
  
    <!-- Formulário Modal -->
    <VContainer>
      <v-dialog v-model="dialogCreate" max-width="600">
        <v-card>
          <v-card-title>Criar Usuário</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Nome" v-model="newUser.fullName" required></v-text-field>
              <v-text-field label="Username" v-model="newUser.username" required></v-text-field>
              <v-text-field label="E-mail" v-model="newUser.email" required></v-text-field>
              <v-text-field label="Senha" v-model="newUser.password" required></v-text-field>
              <v-text-field label="Cidade" v-model="newUser.city" required></v-text-field>
              <v-text-field label="Telefone" v-model="newUser.phone" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="dialogCreate = false">Cancelar</v-btn>
            <v-btn color="primary" @click="createUser">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VContainer>
  
    <!-- Modal de Editar Produto -->
    <VContainer>
      <v-dialog v-model="dialogEdit" max-width="600">
        <v-card>
          <v-card-title>Editar Usuário</v-card-title>
          <v-card-text>
            <v-form ref="form">
               <v-text-field label="Nome" v-model="editUser.fullName" required></v-text-field>
              <v-text-field label="Username" v-model="editUser.username" required></v-text-field>
              <v-text-field label="E-mail" v-model="editUser.email" required></v-text-field>
              <v-text-field label="Senha" v-model="editUser.password" required></v-text-field>
              <v-text-field label="Cidade" v-model="editUser.city" required></v-text-field>
              <v-text-field label="Telefone" v-model="editUser.phone" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="primary" @click="updateUser">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VContainer>
  
    <!-- Modal de Detalhes do Produto -->
    <VContainer>
      <v-dialog v-model="dialogDetails" max-width="600">
        <v-card>
          <v-card-title>Detalhes do Usuário</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <div><strong>Nome:</strong> {{ usersDetails.fullName }}</div>
                <div><strong>Username:</strong> {{ usersDetails.username }}</div>
                <div><strong>E-mail:</strong> {{ usersDetails.email }}</div>
                <div><strong>Senha:</strong> {{ usersDetails.password }}</div>
                <div><strong>Cidade:</strong> {{ usersDetails.city }}</div>
                <div><strong>Telefone:</strong> {{ usersDetails.phone }}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="dialogDetails = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VContainer>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const users = ref([]);
      const usersDetails = ref(null);
      const headers = [
        { text: 'Nome', align: 'start', value: 'fullName' },
        { text: 'Username', value: 'username' },
        { text: 'E-mail', value: 'email' },
      ];
  
      const dialogCreate = ref(false);
      const dialogEdit = ref(false);
      const dialogDetails = ref(false);
      const selectedUser = ref(null);
      const newUser = ref({
        fullName: '',
        username: '',
        email: '',
        password: '',
        city: '',
        phone: '',
      });
  
        const editUser = ref({
            fullName: '',
            username: '',
            email: '',
            password: '',
            city: '',
            phone: '',
        });
  
  
  
      // Função para carregar os usuários da API.
      const loadUsers = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/users');
          const data = await response.json();
  
  
          users.value = data.map(user => ({
            fullName: user.name.firstname + ' ' + user.name.lastname,
            ...user
          }));
  
  
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar os produtos.');
        }
      };
      
        // Função para abrir o modal de edição e carregar os dados do usuário selecionado.
      const openEditDialog = async () => {
          if (!selectedUser.value) return;
  
          try {
              const response = await fetch(`https://fakestoreapi.com/users/${selectedUser.value}`);
              const data = await response.json();
            
            editUser.value = {
                fullName: data.name.firstname + ' ' + data.name.lastname,
                username: data.username,
                email: data.email,
                password: data.password,
                city: data.address.city,
                phone: data.phone,
            };
          dialogEdit.value = true;
          } catch (error) {
              console.error(error);
              alert('Erro ao buscar os detalhes do produto.');
          }
      };
  
  
  
      // Função para exibir detalhes de um usuário.
      const viewUserDetails = async () => {
        if (!selectedUser.value) return;
  
        try {
          const response = await fetch(`https://fakestoreapi.com/users/${selectedUser.value}`);
          const data = await response.json();
  
           usersDetails.value = {
               fullName: data.name.firstname + ' ' + data.name.lastname,
               username: data.username,
               email: data.email,
               password: data.password,
               city: data.address.city,
               phone: data.phone,
           };
  
  
          dialogDetails.value = true;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar os detalhes do produto.');
        }
      };
  
      // Função para criar um novo usuário.
      const createUser = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser.value),
          });
  
          const createdUser = await response.json();
          
          users.value.push({
               fullName: createdUser.name.firstname + ' ' + createdUser.name.lastname,
              ...createdUser,
          });
  
          newUser.value = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            city: '',
            phone: '',
          };
  
          dialogCreate.value = false;
        } catch (error) {
          console.error(error);
          alert('Erro ao criar o produto.');
        }
      };
  
     // Função para editar um usuário.
      const updateUser = async () => {
        if (!selectedUser.value) return;
  
        try {
          const response = await fetch(
            `https://fakestoreapi.com/users/${selectedUser.value}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(editUser.value),
            }
          );
          const updatedUser = await response.json();
          const index = users.value.findIndex(
            (user) => user.id === selectedUser.value
          );
          if (index !== -1) {
             if (updatedUser && updatedUser.name && updatedUser.name.firstname && updatedUser.name.lastname) {
                  users.value[index] = {
                    fullName: updatedUser.name.firstname + ' ' + updatedUser.name.lastname,
                    ...updatedUser,
                  };
                }else{
                   users.value[index] = {
                       fullName: updatedUser.firstname + ' ' + updatedUser.lastname,
                       ...updatedUser,
                   };
                }
  
              }
  
          dialogEdit.value = false;
        } catch (error) {
          console.error(error);
          alert('Erro ao editar o produto.');
        }
      };
  
      // Função para deletar um usuário.
      const deleteUser = async () => {
        if (!selectedUser.value) return;
  
        try {
          await fetch(
            `https://fakestoreapi.com/users/${selectedUser.value}`,
            { method: 'DELETE' }
          );
          users.value = users.value.filter(
            (user) => user.id !== selectedUser.value
          );
          selectedUser.value = null;
        } catch (error) {
          console.error(error);
          alert('Erro ao deletar o produto.');
        }
      };
  
      onMounted(loadUsers);
  
      return {
        users,
        headers,
        dialogCreate,
        dialogEdit,
        dialogDetails,
        selectedUser,
        newUser,
          editUser,
        usersDetails,
        loadUsers,
          openEditDialog,
        createUser,
        updateUser,
        deleteUser,
        viewUserDetails,
      };
    },
  };
  </script>