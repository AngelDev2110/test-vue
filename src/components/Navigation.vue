<template>
    <nav class="bg-gray-900 py-4">
        <div class="flex items-center justify-center">
            <div class="flex items-center flex-col space-y-1 sm:flex-row sm:space-x-6">
                <router-link to="/todo-list" class="text-white text-2xl hover:text-blue-400" :class="{'text-blue-400': $route.path === '/todo-list' }">TodoList</router-link>
                <router-link to="/timer" class="text-white text-2xl hover:text-blue-400" :class="{ 'text-blue-400': $route.path === '/timer' }">Timer</router-link>
                <router-link to="/git-profile" class="text-white text-2xl hover:text-blue-400" :class="{ 'text-blue-400': $route.path === '/git-profile' }">GitProfile</router-link>
                <button @click="logout" class="text-white text-2xl hover:text-red-500">Cerrar sesión</button>
            </div>
        </div>
    </nav>
</template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Borrar la cookie de logginSuccess
        document.cookie = 'logginSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Redirigir a la página de inicio de sesión (puedes ajustar la ruta según tus necesidades)
        this.$router.push('/login');
      }
    }
  };
  </script>
  