<template>
    <nav class="bg-gray-900 py-4 border-b-2">
       <div class="flex items-center justify-center">
        <div class="flex items-center flex-col space-y-1 sm:flex-row sm:space-x-6"> <!-- navegación -->
          <router-link
            to="/todo-list"
            class="text-2xl hover:text-blue-600 transition duration-300"
            :class="{ 'text-blue-600': isRouteActive('/todo-list'), 'text-white': !isRouteActive('/todo-list') }"
          >
            TodoList
          </router-link>
          <router-link
            to="/timer"
            class="text-2xl hover:text-blue-600 transition duration-300"
            :class="{ 'text-blue-600': isRouteActive('/timer'), 'text-white': !isRouteActive('/timer')}"
          >
            Timer
          </router-link>
          <router-link
            to="/git-profile"
            class="text-2xl hover:text-blue-600 transition duration-300"
            :class="{ 'text-blue-600': isRouteActive('/git-profile'), 'text-white': !isRouteActive('/git-profile') }"
          >
            GitProfile
          </router-link>
          <button @click="logout" class="text-white text-2xl hover:text-red-500">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import Swal from 'sweetalert2';

  export default {
    methods: {
      isRouteActive(route) { // Revisa si la ruta actual es la misma que la ruta que se le pasa por parámetro
        const isActive = this.$route.path === route; 
        return isActive;
      },
      logout() { // Función para cerrar sesión
        Swal.fire({ // Ventana de confirmación
          title: "¿Seguro que quieres cerrar sesión?",
          text: "Tendras que volver a ingresar tus credenciales el próximo inicio de sesión",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          background: "#1f2937",
          color: "#fff",
          
        }).then((result) => { // Si se confirma la acción
          if (result.isConfirmed) {
            // Borrar la cookie de logginSuccess
            document.cookie = 'logginSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Redireccionar a la página de login
            this.$router.push('/login');
          }
        });
      },
    },
  };
  </script>
  