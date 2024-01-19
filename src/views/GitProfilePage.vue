<template>
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-[115vh] sm:h-screen flex flex-col align-middle justify-center">
      <Navigation /> <!-- Navegación -->
      <div class="flex flex-grow flex-col items-center p-8">
        <h1 class="text-6xl font-bold text-white mb-4">Git Profile</h1>
        <div class="flex items-center mb-14"> <!-- Input de búsqueda -->
          <o-input v-model="username" @keydown.enter="searchProfile" placeholder="Ingrese el nombre de usuario" class="border h-[2.5rem] w-[14rem] sm:w-[30rem] rounded-l-md text-center" />
          <o-button @click="searchProfile" class="px-4 h-[2.5rem] bg-blue-500 text-white rounded-r-md shadow-md shadow-slate-900">Buscar</o-button>
        </div>
        <div v-if="loading" class="sk-chase mt-4"> <!-- Spinner -->
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
        <div v-if="profile" class="mt-8 bg-gradient-to-br from-white from-25% to-slate-400 p-6 rounded-xl shadow-lg shadow-zinc-900 min-w-[18rem] "> <!-- Perfil -->
          <div class=" text-center flex flex-col relative">
            <h2 class="text-4xl pt-9">{{ profile.login }}</h2>
            <p v-if="profile.name" class=" text-lg">{{ profile.name }}</p>
            <div class="absolute bottom-0 left-0 h-[2rem] w-[2rem] border-b-8 border-l-8 border-slate-800"></div>
            <div class="absolute bottom-0 right-0 h-[2rem] w-[2rem] border-b-8 border-r-8 border-slate-800"></div>
            <div class="absolute top-0 right-0 h-[2rem] w-[2rem] border-t-8 border-r-8 border-slate-800"></div>
            <div class="absolute top-0 left-0 h-[2rem] w-[2rem] border-t-8 border-l-8 border-slate-800"></div>
            <div class="absolute -top-[4.85rem] left-0 right-0 rounded-full w-[6.5rem] h-[6.5rem] mx-auto bg-white"></div>
            <img :src="profile.avatar_url" alt="Avatar" class="absolute -top-[4.6rem] left-0 right-0 rounded-full w-[6rem] mx-auto mb-4">
            <div class="flex justify-evenly mt-2 mb-6">
              <p><strong>Seguidores</strong> <br/> {{ profile.followers }}</p>
              <p><strong>Siguiendo</strong><br/> {{ profile.following }}</p>
            </div>
            <p><strong>Repositorios Públicos</strong><br/>{{ profile.public_repos }}</p>
            <p v-if="profile.location" class="max-w-[20rem] sm:max-w-[22rem]"><strong>Ubicación</strong> <br/> {{ profile.location }}</p>
            <p v-if="profile.bio" class="max-w-[20rem] sm:max-w-[22rem]"><strong>Biografía</strong> <br/> {{ profile.bio }}</p>
            <a :href="profile.html_url" class="text-white mt-3 bg-slate-900 mx-auto py-1 px-3 rounded-3xl shadow-md shadow-slate-600 hover:shadow-lg hover:shadow-slate-600 transition duration-300" target="_blank">Ir al perfil</a>
          </div>
        </div>
        <p v-if="error" class=" text-white bg-gradient-to-br from-red-800 to-red-600 py-2 px-6 text-center shadow-md shadow-slate-900 rounded-md">{{ error }}</p> <!-- Mensaje de error -->
      </div>
    </div>
  </template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
  import axios from 'axios';
  
  export default {
    components: {
      Navigation,
    },
    data() {
      return {
        username: '', // Nombre de usuario
        profile: null, // Perfil
        error: null, // Error
        loading: false, // Spinner
      };
    },
    methods: {
      async searchProfile() { // Método para buscar el perfil
        if(!this.username){ // Si no hay nombre de usuario, mostramos el error
          this.profile = null; // Reiniciamos el perfil
          this.error = 'Por favor, ingrese un nombre de usuario.'; // Mostramos el error
        }
        else{ // Si hay nombre de usuario
          try {
            this.profile = null; // Reiniciamos el perfil
            this.loading = true; // Mostramos el spinner
            this.error = null; // Reiniciamos el error
            const response = await axios.get(`https://api.github.com/users/${this.username}`); // Hacemos la petición
            this.profile = response.data; // Guardamos el perfil
          } catch (err) { // Si hay un error
            this.profile = null; // Reiniciamos el perfil
            this.error = 'Usuario no encontrado. Por favor, verifique el nombre de usuario.'; // Mostramos el error
          }
          finally { 
            this.loading = false; // Ocultamos el spinner
          }
        }
      },
    },
  };
  </script>
  