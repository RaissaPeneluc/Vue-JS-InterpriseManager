<!-- Este componente é a interface de Produtos onde o usuário acessa após escolher
no Dashboard. É uma página protegida, que só pode ser acessada com autenticação. Ela 
irá exibir uma lista de produtos, obtendo funcionalidades para criar, editar, detalhar
e deletar um produto. -->

<template>
  <NavBarComponent title="Produtos"></NavBarComponent>

  <!-- Container do botão de criar um produto -->
  <v-container class="d-flex pa-5 mt-10">
    <v-container class="d-flex justify-end align-center">
      <v-btn color="secondary" @click="dialogCreate = true">
        <v-icon icon="mdi-plus" start></v-icon>
        Criar Produto
      </v-btn>
    </v-container>
  </v-container>

  <!-- Lista de Produtos -->
  <v-container>
    <v-row class="justify-center">
      <v-col
        v-for="item in products"
        :key="item.id"
        class="d-inline-flex pa-2 ml-3 mb-15 align-center rounded-lg border-thin"
        cols="2"
      >
        <!-- Organizando os cards de cada produto -->
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? '4' : '0'"
              class="cursor-pointer w-100"
            >
              <v-row class="d-flex justify-end mb-1">
                <v-col cols="3">
                  
                  <!-- Criação do Menu de Configurações -->
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-cog"
                        color="#F5F5F5"
                        v-bind="props"
                        size="small"
                        class="mt-2"
                        tonal
                      ></v-btn>
                    </template>

                    <v-card class="mt-1">
                      <v-card-actions class="flex-column align-start">
                        <v-btn
                          icon="mdi-close"
                          color="red"
                          size="small"
                          class=""
                          @click="menuConfig = false"
                        ></v-btn>
                        <v-btn color="black" @click="openEditDialog(item)">
                          <v-icon class="me-2" size="small">
                            mdi-pencil
                          </v-icon>
                          Editar
                        </v-btn>

                        <v-btn color="black" @click="viewProductDetails(item)">
                          <v-icon class="me-2" color="primary" size="small">
                            mdi-information
                          </v-icon>
                          Detalhes</v-btn
                        >
                        <v-btn color="black" @click="deleteProduct(item)">
                          <v-icon class="me-2" size="small">
                            mdi-delete
                          </v-icon>
                          Delete</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
              </v-row>

              <v-img :src="item.image" alt="Imagem do produto" height="200px" />

              <v-row no-gutters align="center" class="py-4">
                <v-col cols="12">
                  <v-card-title class="font-weight-bold text-h6">{{
                    item.title
                  }}</v-card-title>
                </v-col>
                <v-col cols="6">
                  <v-list-item
                    :title="item.category"
                    :subtitle="`Preço: R$ ${item.price}`"
                  />
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>

  <!-- Modal de Criação de um Produto -->
  <v-container>
    <v-dialog v-model="dialogCreate" max-width="600">
      <!-- Controla a exibição do diálogo de criação de produtos -->
      <v-card>
        <v-card-title>Criar Produto</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Título"
              v-model="newProduct.title"
              required
            ></v-text-field>
            <v-text-field
              label="Categoria"
              v-model="newProduct.category"
              required
            ></v-text-field>
            <v-text-field
              label="Preço"
              v-model="newProduct.price"
              type="number"
              required
            ></v-text-field>
            <v-textarea
              label="Descrição"
              v-model="newProduct.description"
              required
            ></v-textarea>
            <v-text-field
              label="URL da Imagem"
              v-model="newProduct.image"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-container class="d-flex justify-end">
          <v-btn color="#d35054" class="mr-4" @click="dialogCreate = false"
            >Cancelar</v-btn
          >
          <v-btn color="secondary" @click="createProduct">Salvar</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Modal de Editar Produto -->
  <v-container>
    <v-dialog v-model="dialogEdit" max-width="600">
      <!-- Controla a exibição do diálogo de edição de produtos -->
      <v-card>
        <v-card-title class="pa-4">Editar Produto</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Título"
              v-model="editProduct.title"
              required
            ></v-text-field>
            <v-text-field
              label="Categoria"
              v-model="editProduct.category"
              required
            ></v-text-field>
            <v-text-field
              label="Preço"
              v-model="editProduct.price"
              type="number"
              required
            ></v-text-field>
            <v-textarea
              label="Descrição"
              v-model="editProduct.description"
              required
            ></v-textarea>
            <v-text-field
              label="URL da Imagem"
              v-model="editProduct.image"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-container class="d-flex justify-end">
          <v-btn color="#d35054" class="mr-4" @click="dialogEdit = false"
            >Cancelar</v-btn
          >
          <v-btn color="secondary" @click="updateProduct">Salvar</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Modal de Detalhes do Produto -->
  <v-container>
    <v-dialog v-model="dialogDetails" max-width="600">
      <!-- Controla a exibição do diálogo de detalhes de produtos -->
      <v-card class="pa-4">
        <v-card-title>Detalhes do Produto</v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="d-flex align-center">
              <v-img :src="productDetails.image" max-width="300px" />
            </v-col>
            <v-col>
              <div><strong>Título:</strong> {{ productDetails.title }}</div>
              <div>
                <strong>Categoria:</strong> {{ productDetails.category }}
              </div>
              <div><strong>Preço:</strong> {{ productDetails.price }}</div>
              <div>
                <strong>Descrição:</strong> {{ productDetails.description }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-container class="d-flex justify-end">
          <v-btn color="#d35054" @click="dialogDetails = false">Fechar</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

export default {
  components: {
    NavBarComponent,
  },
  setup() {
    const products = ref([]); // Array reativo para armazenar os produtos.
    const productDetails = ref(null); // Objeto reativo para armazenar os detalhes do produto selecionado.

    // Variáveis reativas para controlar a exibição dos diálogos.
    const dialogCreate = ref(false);
    const dialogEdit = ref(false);
    const dialogDetails = ref(false);
    const menuConfig = ref(false);

    // Variável reativa para armazenar o produto selecionado.
    const selectedProduct = ref(null);

    // Definindo um objeto reativo para armazenar os dados de um novo produto.
    const newProduct = ref({
      title: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });

    // Definindo um objeto reativo para armazenar os dados do produto que será editado.
    const editProduct = ref({
      id: "",
      title: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });

    // Função para carregar os produtos da API.
    const loadProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // Requisição GET para a API de produtos.
        const data = await response.json(); // Convertendo a resposta para JSON.
        products.value = data; // Atribuindo os dados obtidos ao array reativo products.
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar os produtos.");
      }
    };

    // Função para criar um novo produto.
    const createProduct = async () => {
      try {
        // Requisição POST para a API de produtos.
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct.value),
        });

        const createdProduct = await response.json();
        products.value.push(createdProduct); // Adiciona o novo produto ao array reativo products.

        // Limpa o objeto newProduct.
        newProduct.value = {
          title: "",
          category: "",
          price: "",
          description: "",
          image: "",
        };

        dialogCreate.value = false; // Fecha o modal de criação.
      } catch (error) {
        console.error(error);
        alert("Erro ao criar o produto.");
      }
    };

    // Função de abertura do modal de configurações
    const openConfigModal = async () => {
      try {
        menuConfig.value = false; // Abre o modal de configuração
      } catch (error) {
        console.error(error);
        alert("Erro ao abrir modal.");
      }
    };

    // Função para abrir o modal de edição e carregar os dados do produto selecionado.
    const openEditDialog = async (selectedProduct) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${selectedProduct.id}`
        ); // Busca os dados do produto específico na API.
        const data = await response.json();

        // Atribuindo os dados do produto ao objeto editProduct para serem usados no formulário de edição.
        editProduct.value = {
          id: data.id,
          title: data.title,
          category: data.category,
          price: data.price,
          description: data.description,
          image: data.image,
        };

        dialogEdit.value = true; // Abre o modal de edição
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar os detalhes do produto.");
      }
    };

    // Função para editar um produto.
    const updateProduct = async () => {
      try {
        // Requisição PUT para a API de produtos.
        const response = await fetch(
          `https://fakestoreapi.com/products/${editProduct.value.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editProduct.value),
          }
        );

        const updatedProduct = await response.json();

        // Encontrando o índice do produto que será editado no array reativo products.
        const index = products.value.findIndex(
          (product) => product.id === editProduct.value.id
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

    // Função para exibir detalhes de um produto.
    const viewProductDetails = async (selectedProduct) => {
      try {
        productDetails.value = selectedProduct; // Retirada do método GET e acessando os detalhes do usuário a partir do JSON de cada usuário gerado.
        dialogDetails.value = true; // Abre o modal de detalhes.
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar os detalhes do produto.");
      }
    };

    // Função para deletar um produto.
    const deleteProduct = async (selectedProduct) => {
      try {
        // Requisição DELETE para a API de produtos.
        await fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
          method: "DELETE",
        });

        // Filtra o array reativo products removendo o produto deletado.
        products.value = products.value.filter(
          (product) => product.id !== selectedProduct.id
        );
        selectedProduct.id = null; // Limpa o produto selecionado.
      } catch (error) {
        console.error(error);
        alert("Erro ao deletar o produto.");
      }
    };

    // Chama a função loadProducts quando o componente é montado.
    onMounted(loadProducts);

    return {
      products,
      dialogCreate,
      dialogEdit,
      menuConfig,
      dialogDetails,
      selectedProduct,
      newProduct,
      editProduct,
      productDetails,
      loadProducts,
      openConfigModal,
      openEditDialog,
      createProduct,
      updateProduct,
      deleteProduct,
      viewProductDetails,
    };
  },
};
</script>
