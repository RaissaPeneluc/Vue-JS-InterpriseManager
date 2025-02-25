<!-- Este componente é a interface de Produtos onde o usuário acessa após escolher
no Dashboard. É uma página protegida, que só pode ser acessada com autenticação. Ela 
irá exibir uma lista de produtos, obtendo funcionalidades para criar, editar, detalhar
e deletar um produto. -->

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

  <!-- Lista de Produtos -->
  <VContainer>
        <v-list class="text-lg">
            <v-list-item v-for="item in products" :key="item.id" class="pa-5" >
                <v-row>
                    <v-col cols="2" class="d-flex align-center justify-center pa-6" >
                         <img :src="item.image" alt="Imagem do produto" style="max-width: 100px;"/>
                    </v-col>
                    <v-col cols="10">
                      <v-list-item-title class="font-weight-bold text-h5">{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle class="text-subtitle-1 mt-1 mb-2">Categoria: {{ item.category }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text-subtitle-1 mb-2">Descrição: {{ item.description }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text-subtitle-1">Preço: {{ item.price }}</v-list-item-subtitle>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
    </VContainer>

  <!-- Formulário de Criação Modal -->
  <VContainer>
    <v-dialog v-model="dialogCreate" max-width="600"> <!-- Controla a exibição do diálogo de criação de produtos -->
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

  <!-- Formulário de Editar Produto Modal -->
  <VContainer>
    <v-dialog v-model="dialogEdit" max-width="600"> <!-- Controla a exibição do diálogo de edição de produtos -->
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

  <!-- Formulário de Detalhes do Produto Modal -->
  <VContainer>
    <v-dialog v-model="dialogDetails" max-width="600"> <!-- Controla a exibição do diálogo de detalhes de produtos -->
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
    const products = ref([]);  // Array reativo para armazenar os produtos.
    const productDetails = ref(null); // Objeto reativo para armazenar os detalhes do produto selecionado.

    // Definindo os cabeçalhos da tabela de produtos.
    const headers = [
        { text: 'Título', align: 'start', value: 'title' },
        { text: 'Categoria', value: 'category' },
        { text: 'Preço', value: 'price' },
        { text: 'Descrição', value: 'description' },
        { text: 'Imagem', value: 'image' },
    ];

    // Variáveis reativas para controlar a exibição dos diálogos.
    const dialogCreate = ref(false);
    const dialogEdit = ref(false);
    const dialogDetails = ref(false);

    // Variável reativa para armazenar o produto selecionado no dropdown.
    const selectedProduct = ref(null);

    // Definindo um objeto reativo para armazenar os dados de um novo produto.
    const newProduct = ref({
      title: '',
      category: '',
      price: '',
      description: '',
      image: '',
    });

    // Definindo um objeto reativo para armazenar os dados do produto que será editado.
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
        const response = await fetch('https://fakestoreapi.com/products'); // Requisição GET para a API de produtos.
        const data = await response.json(); // Convertendo a resposta para JSON.
        products.value = data; // Atribuindo os dados obtidos ao array reativo products.
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar os produtos.');
      }
    };

    // Função para abrir o modal de edição e carregar os dados do produto selecionado.
    const openEditDialog = async () => {

      if (!selectedProduct.value) return; // Verifica se algum produto foi selecionado

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`); // Busca os dados do produto específico na API.
        const data = await response.json(); 

        // Atribuindo os dados do produto ao objeto editProduct para serem usados no formulário de edição.
        editProduct.value = {
          title: data.title,
          category: data.category,
          price: data.price,
          description: data.description,
          image: data.image,
        };

         dialogEdit.value = true; // Abre o modal de edição
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar os detalhes do produto.');
      }
    };

    // Função para exibir detalhes de um produto.
    const viewProductDetails = async () => {

      if (!selectedProduct.value) return; // Verifica se algum produto foi selecionado.

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`); // Busca os dados do produto específico na API.
        const data = await response.json();
        productDetails.value = data; // Atribui os dados do produto ao objeto productDetails para serem exibidos no modal de detalhes.
        dialogDetails.value = true;  // Abre o modal de detalhes.
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar os detalhes do produto.');
      }
    };

    // Função para criar um novo produto.
    const createProduct = async () => {
      try {
        // Requisição POST para a API de produtos.
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct.value),
        });

        const createdProduct = await response.json();
        products.value.push(createdProduct); // Adiciona o novo produto ao array reativo products.

        // Limpa o objeto newProduct.
        newProduct.value = {
          title: '',
          category: '',
          price: '',
          description: '',
          image: '',
        };

        dialogCreate.value = false; // Fecha o modal de criação.
      } catch (error) {
        console.error(error);
        alert('Erro ao criar o produto.');
      }
    };

    // Função para editar um produto.
    const updateProduct = async () => {
    
        if (!selectedProduct.value) return; // Verifica se algum produto foi selecionado.

        try {
            // Requisição PUT para a API de produtos.
            const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct.value),
            });
        
            const updatedProduct = await response.json();

            // Encontrando o índice do produto que será editado no array reativo products.
            const index = products.value.findIndex(
                (product) => product.id === selectedProduct.value
            );

            // Atualiza o produto no array reativo products com os dados editados.
            if (index !== -1) {
                products.value[index] = updatedProduct;

            }
            dialogEdit.value = false; // Fecha o modal de edição.
        } catch (error) {
          console.error(error);
          alert("Erro ao editar o produto.");
        }
    };

    // Função para deletar um produto.
    const deleteProduct = async () => {
        if (!selectedProduct.value) return;

        try {
            // Requisição DELETE para a API de produtos.
            await fetch(`https://fakestoreapi.com/products/${selectedProduct.value}`, { method: 'DELETE' });

            // Filtra o array reativo products removendo o produto deletado.
            products.value = products.value.filter(
            (product) => product.id !== selectedProduct.value
            );
            selectedProduct.value = null; // Limpa o produto selecionado.
        } catch (error) {
            console.error(error);
            alert('Erro ao deletar o produto.');
        }
    };
    
    // Chama a função loadProducts quando o componente é montado.
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