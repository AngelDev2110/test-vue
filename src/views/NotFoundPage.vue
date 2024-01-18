<template>
     <div class="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-700">
    <div class="text-center text-white flex flex-col">
      <h1 class="text-7xl font-bold mb-2">Oops!</h1>
      <p class="text-xl text-gray-300">La página que buscas no existe.</p>
      <router-link to="/todo-list" class="text-2xl mt-8 px-4 py-2 bg-white text-slate-900 rounded-full transition duration-300 hover:scale-105">
        Presiona aquí para regresar
      </router-link>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
  };
  </script>
