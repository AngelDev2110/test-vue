import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import TodoListPage from '../views/TodoListPage.vue';
import TimerPage from '../views/TimerPage.vue';
import GitProfilePage from '../views/GitProfilePage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/todo-list', component: TodoListPage, meta: { requiresAuth: true } }, // Agrega meta.requiresAuth
  { path: '/timer', component: TimerPage, meta: { requiresAuth: true } }, // Agrega meta.requiresAuth
  { path: '/git-profile', component: GitProfilePage, meta: { requiresAuth: true } }, // Agrega meta.requiresAuth
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Agrega un guard de navegación
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verifica la existencia de la cookie
    const isLoggedIn = document.cookie.includes('logginSuccess=true');
    if (!isLoggedIn) {
      // Redirige a la página de inicio de sesión si no está autenticado
      next('/login');
    }
  }
  // Continúa con la navegación si no se requiere autenticación o si está autenticado
  next();
});

export default router;
