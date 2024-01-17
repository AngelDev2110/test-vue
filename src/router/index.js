// import vue-router to create routes.
import { createRouter, createWebHistory } from 'vue-router';

// import the components that will be used as pages.
import LoginPage from '../views/LoginPage.vue';
import TodoListPage from '../views/TodoListPage.vue';
import TimerPage from '../views/TimerPage.vue';
import GitProfilePage from '../views/GitProfilePage.vue';

// create routes.
const routes = [
    { path: '/', redirect: '/login' }, // Redirige la ruta raíz a /login
    { path: '/login', component: LoginPage },
    { path: '/todo-list', component: TodoListPage },
    { path: '/timer', component: TimerPage },
    { path: '/git-profile', component: GitProfilePage },
  ];

// create router.
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// export router.
export default router;
