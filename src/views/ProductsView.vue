<template>
    <VContainer>
        <VAppBar class="" color="primary">
            <VAppBarTitle>Produtos</VAppBarTitle>
        </VAppBar>
    </VContainer>

    <!-- Container de botões de alterações -->
    <VContainer class="d-flex justify-center align-center">
        
        <!-- Botão para adicionar novo produto -->
        <VContainer>
            <v-btn color="secondary" @click="dialog = true">Criar Produto</v-btn>
        </VContainer>

        <!-- Botão para editar um produto -->
        <VContainer>
            <v-btn color="secondary">Editar Produto</v-btn>
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
        <v-data-table :headers="headers" :items="products" :item-value="id" class="elevation-1">
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

    <!-- Formulário Modal -->
    <VContainer>
        <v-dialog v-model="dialog" max-width="600">
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
                    <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="createProduct">Salvar</v-btn>
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
            const newProduct = ref({
                title: '',
                category: '',
                price: '',
                description: '',
                image: ''
            });

            // Função para criar um novo produto.
            const createProduct = async () => {
                try {
                    const response = await fetch('https://fakestoreapi.com/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newProduct.value)
                    });

                    const createdProduct = await response.json();
                    products.value.push(createdProduct); // Atualizar a lista com o novo produto.
                    dialog.value = false; // Fechar o modal.
                    newProduct.value = {
                        title: '',
                        category: '',
                        price: '',
                        description: '',
                        image: ''
                    }; // Limpar o formulário.

                } catch (error) {
                    console.error(error);
                    alert('Erro ao criar o produto.');
                }
            };

            // Carregar os produtos quando o componente for montado.
            onMounted(loadProducts);

            return { 
                products,
                headers,
                dialog,
                newProduct,
                createProduct
            };
        },
    }
</script>