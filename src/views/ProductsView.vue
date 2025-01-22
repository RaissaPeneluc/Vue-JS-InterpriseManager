<template>
    <VContainer>
        <VAppBar class="" color="primary">
            <VAppBarTitle>Produtos</VAppBarTitle>
        </VAppBar>
    </VContainer>

    <!-- Container de botões de alterações/ações -->
    <VContainer class="d-flex justify-center align-center">
        
        <!-- Botão para adicionar novo produto -->
        <VContainer>
            <v-btn color="secondary" @click="openCreateDialog">Criar Produto</v-btn>
        </VContainer>

        <!-- Botão para editar um produto -->
        <VContainer>
            <v-btn color="secondary" :disabled="!selectedProduct" @click="openEditDialog">Editar Produto</v-btn>
        </VContainer>

        <!-- Botão para detalhar um produto -->
        <VContainer>
            <v-btn color="secondary">Detalhar Produto</v-btn>
        </VContainer>

        <!-- Botão para deletar um produto -->
        <VContainer>
            <v-btn color="secondary">Deletar Produto</v-btn>
        </VContainer>
        
    </VContainer>
    

    <!-- Tabela de Produtos -->
    <VContainer>
        <v-data-table :headers="headers" :items="products" :item-value="id" class="elevation-1" @click:row="selectedProduct">
            <template v-slot:items="props">
                <tr :key="props.item.id">
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.price }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>
                        <v-img :src="props.item.image" max-width="50"/>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </VContainer>

    <!-- Formulário Modal (Criar/Editar Produto) -->
    <VContainer>
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title>{{ isEditing ? 'Editar Produto' : 'Criar Produto' }}</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field label="Título" v-model="productForm.title" required></v-text-field>
                        <v-text-field label="Categoria" v-model="productForm.category" required></v-text-field>
                        <v-text-field label="Preço" v-model="productForm.price" type="number" required></v-text-field>
                        <v-textarea label="Descrição" v-model="productForm.description" required></v-textarea>
                        <v-text-field label="URL da Imagem" v-model="productForm.image" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="isEditing ? updateProduct() : createProduct()">
                        {{ isEditing ? 'Salvar Alterações' : 'Salvar' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </VContainer>


</template>

<script>
    import { ref, onMounted } from 'vue';

    export default {
        setup() {
            const products = ref ([]);
            const headers = [
                { text: 'Título', align: 'start', key: 'title', value: 'title' },
                { text: 'Categoria', value: 'category'},
                { text: 'Preço', value: 'price' },
                { text: 'Descrição', value: 'description' },
                { text: 'Imagem', value: 'image' },
            ];

            // Função para carregar os produtos da API.
            const loadProducts = async () => {
                try{
                    const response = await fetch('https://fakestoreapi.com/products');
                    const data = await response.json();

                    products.value = data; // Armazenar os produtos na variável reativa.
                } catch (error) {
                    console.error(error);
                    alert('Erro ao buscar os produtos.');
                }
            };

            const dialog = ref(false); // Controle do modal.
            const isEditing = ref(false); // Indica se está editando.
            const productForm = ref({ // Dados do formulário.
                id: null,
                title: '',
                category: '',
                price: '',
                description: '',
                image: '',
            }); 
            const selectedProduct = ref(null); // Produto selecionado.

            // Função para abrir o modal de criação.
            const openCreateDialog = () => {
                isEditing.value = false;
                resetForm();
                dialog.value = true;
            };

            // Função para abrir o modal de edição.
            const openEditDialog = () => {
                if (selectedProduct.value) {
                    isEditing.value = true;
                    productForm.value = { ...selectedProduct.value };
                    dialog.value = true;
                }
            };

            // Função para criar um novo produto.
            const createProduct = async () => {
                try {
                    const response = await fetch('https://fakestoreapi.com/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productForm.value)
                    });

                    const newProduct  = await response.json();
                    products.value.push(newProduct);
                    dialog.value = false;
                    resetForm();

                } catch (error) {
                    console.error(error);
                    alert('Erro ao criar o produto.');
                }
            };

            // Função para editar um produto.
            const updateProduct = async () => {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${productForm.value.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productForm.value),
                    });
                    const updatedProduct = await response.json();
                    const index = products.value.findIndex((p) => p.id === updatedProduct.id);
                    if (index !== -1) products.value[index] = updatedProduct;
                    dialog.value = false;
                    resetForm();
                } catch (error) {
                    console.error(error);
                    alert('Erro ao atualizar o produto.');
                }
            };

            // Selecionar um produto ao clicar na tabela.
            const selectProduct = (product) => {
                selectedProduct.value = product;
            };

            // Resetar o formulário.
            const resetForm = () => {
                productForm.value = {
                    id: null,
                    title: '',
                    category: '',
                    price: '',
                    description: '',
                    image: '',
                };
            };

            // Carregar os produtos quando o componente for montado.
            onMounted(loadProducts);

            return {
                products,
                headers,
                dialog,
                isEditing,
                productForm,
                selectedProduct,
                openCreateDialog,
                openEditDialog,
                createProduct,
                updateProduct,
            };
        },
    }
</script>