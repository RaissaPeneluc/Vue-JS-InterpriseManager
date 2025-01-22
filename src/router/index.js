import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/components/Login.vue';

// Array que define as rotas disponíveis na aplicação.
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Rota protegida.
  }
];

// Criação do roteador.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Modo de histórico baseado em navegador, permitindo URLs amigáveis.
  routes,
});

// Middleware para proteger a rota, executado antes de cada navegação de rota.
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user'); // Verifica se há usuário logado.

  // Redireciona para login se não autenticado (usência de user no localStorage).
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); 
  } else {
    next();  // Permite navegação.
  }
});

export default router;
