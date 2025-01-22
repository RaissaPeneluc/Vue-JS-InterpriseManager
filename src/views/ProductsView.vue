<template>
    <VContainer>
      <VAppBar class="" color="primary">
        <VAppBarTitle>Produtos</VAppBarTitle>
      </VAppBar>
    </VContainer>
  
    <!-- Container de botões de alterações -->
    <VContainer class="d-flex pa-5 mt-10">
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="dialogCreate = true">Criar Produto</v-btn>
      </VContainer>
  
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="openEditDialog" :disabled="!selectedProduct">Editar Produto</v-btn>
      </VContainer>
  
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="viewProductDetails" :disabled="!selectedProduct">Detalhar Produto</v-btn>
      </VContainer>
  
      <!-- Botão para deletar um produto -->
      <VContainer class="d-flex justify-center align-center">
        <v-btn color="secondary" @click="deleteProduct" :disabled="!selectedProduct">Deletar Produto</v-btn>
      </VContainer>
    </VContainer>
  
    <!-- Dropdown para selecionar um produto -->
    <VContainer class="d-flex justify-center mt-5">
      <v-select
        v-model="selectedProduct"
        :items="products"
        item-text="title"
        item-value="id"
        item-title="title"
        label="Selecione um produto"
        outlined
        dense
      ></v-select>
    </VContainer>
  
    <!-- Tabela de Produtos -->
    <VContainer>
      <v-data-table :headers="headers" :items="products" item-value="id" class="elevation-1">
        <template v-slot:items="props">
          <tr :key="props.item.id">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.price }}</td>
            <td>{{ props.item.description }}</td>
            <td>
              <v-img :src="props.item.image" max-width="50" />
            </td>
          </tr>
        </template>
      </v-data-table>
    </VContainer>
  
    <!-- Formulário Modal -->
    <VContainer>
      <v-dialog v-model="dialogCreate" max-width="600">
        <v-card>
          <v-card-title>Criar Produto</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Título" v-model="newProduct.title" required></v-text-field>
              <v-text-field label="Categoria" v-model="newProduct.category" required></v-text-field>
              <v-text-field label="Preço" v-model="newProduct.price" type="number" required></v-text-field>
              <v-textarea label="Descrição" v-model="newProduct.description" required></v-textarea>
              <v-text-field label="URL da Imagem" v-model="newProduct.image" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="dialogCreate = false">Cancelar</v-btn>
            <v-btn color="primary" @click="createProduct">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VContainer>
  
    <!-- Modal de Editar Produto -->
    <VContainer>
      <v-dialog v-model="dialogEdit" max-width="600">
        <v-card>
          <v-card-title>Editar Produto</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Título" v-model="editProduct.title" required></v-text-field>
              <v-text-field label="Categoria" v-model="editProduct.category" required></v-text-field>
              <v-text-field label="Preço" v-model="editProduct.price" type="number" required></v-text-field>
              <v-textarea label="Descrição" v-model="editProduct.description" required></v-textarea>
              <v-text-field label="URL da Imagem" v-model="editProduct.image" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="primary" @click="updateProduct">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </VContainer>
  
    <!-- Modal de Detalhes do Produto -->
    <VContainer>
      <v-dialog v-model="dialogDetails" max-width="600">
        <v-card>
          <v-card-title>Detalhes do Produto</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-img :src="productDetails.image" max-width="150" />
              </v-col>
              <v-col>
                <div><strong>Título:</strong> {{ productDetails.title }}</div>
                <div><strong>Categoria:</strong> {{ productDetails.category }}</div>
                <div><strong>Preço:</strong> {{ productDetails.price }}</div>
                <div><strong>Descrição:</strong> {{ productDetails.description }}</div>
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
      const products = ref([]);
      const productDetails = ref(null);
      const headers = [
        { text: 'Título', align: 'start', key: 'title', value: 'title' },
        { text: 'Categoria', value: 'category' },
        { text: 'Preço', value: 'price' },
        { text: 'Descrição', value: 'description' },
        { text: 'Imagem', value: 'image' },
      ];
  
      const dialogCreate = ref(false);
      const dialogEdit = ref(false);
      const dialogDetails = ref(false);
      const selectedProduct = ref(null);
      const newProduct = ref({
        title: '',
        category: '',
        price: '',
        description: '',
        image: '',
      });
  
        const editProduct = ref({
            title: '',
            category: '',
            price: '',
            description: '',
            image: '',
        });
  
      // Função para carregar os produtos da API.
      const loadProducts = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          products.value = data;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar os produtos.');
        }
      };
        // Função para abrir o modal de edição e carregar os dados do produto selecionado.
      const openEditDialog = async () => {
        if (!selectedProduct.value) return;
  
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`);
          const data = await response.json();
  
          editProduct.value = {
            title: data.title,
            category: data.category,
            price: data.price,
            description: data.description,
            image: data.image,
          };
           dialogEdit.value = true;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar os detalhes do produto.');
        }
      };
  
  
      // Função para exibir detalhes de um produto.
      const viewProductDetails = async () => {
        if (!selectedProduct.value) return;
  
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`);
          const data = await response.json();
          productDetails.value = data;
          dialogDetails.value = true;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar os detalhes do produto.');
        }
      };
  
      // Função para criar um novo produto.
      const createProduct = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct.value),
          });
  
          const createdProduct = await response.json();
          products.value.push(createdProduct);
  
          newProduct.value = {
            title: '',
            category: '',
            price: '',
            description: '',
            image: '',
          };
  
          dialogCreate.value = false;
        } catch (error) {
          console.error(error);
          alert('Erro ao criar o produto.');
        }
      };
  
      // Função para editar um produto.
       const updateProduct = async () => {
        if (!selectedProduct.value) return;
  
        try {
            const response = await fetch(
            `https://fakestoreapi.com/products/${selectedProduct.value}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct.value),
            }
            );
            const updatedProduct = await response.json();
            const index = products.value.findIndex(
                (product) => product.id === selectedProduct.value
            );
            if (index !== -1) {
              products.value[index] = updatedProduct;
  
            }
            dialogEdit.value = false;
        } catch (error) {
            console.error(error);
            alert("Erro ao editar o produto.");
        }
       };
  
      // Função para deletar um produto.
      const deleteProduct = async () => {
        if (!selectedProduct.value) return;
  
        try {
          await fetch(
            `https://fakestoreapi.com/products/${selectedProduct.value}`,
            { method: 'DELETE' }
          );
          products.value = products.value.filter(
            (product) => product.id !== selectedProduct.value
          );
          selectedProduct.value = null;
        } catch (error) {
          console.error(error);
          alert('Erro ao deletar o produto.');
        }
      };
  
      onMounted(loadProducts);
  
      return {
        products,
        headers,
        dialogCreate,
        dialogEdit,
        dialogDetails,
        selectedProduct,
        newProduct,
          editProduct,
        productDetails,
        loadProducts,
          openEditDialog,
        createProduct,
        updateProduct,
        deleteProduct,
        viewProductDetails,
      };
    },
  };
  </script>