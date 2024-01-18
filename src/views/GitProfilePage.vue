<template>
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col align-middle justify-center">
      <Navigation />
      <div class="flex flex-grow flex-col items-center p-8">
        <h1 class="text-6xl font-bold text-white mb-4">Git Profile</h1>
        <div class="flex items-center">
          <input v-model="username" placeholder="Ingrese el nombre de usuario" class="border h-[2.5rem] w-[14rem] sm:w-[30rem] rounded-l-md text-center" />
          <o-button @click="searchProfile" class="px-4 h-[2.5rem] bg-blue-500 text-white rounded-r-md">Buscar</o-button>
        </div>
        <div v-if="profile" class="mt-8">
          <div class="text-white">
            <h2>{{ profile.login }}</h2>
            <p v-if="profile.name">Nombre: {{ profile.name }}</p>
            <p v-if="profile.location">Ubicación: {{ profile.location}}</p>
            <p v-if="profile.bio" >Biografía: {{ profile.bio }}</p>
            <div>
                <img :src="profile.avatar_url" alt="Avatar">
                <p>Seguidores: {{ profile.followers }}</p>
                <p>Siguiendo: {{ profile.following }}</p>
            </div>
          </div>
        </div>
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
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
        username: '',
        profile: null,
        error: null,
      };
    },
    methods: {
      async searchProfile() {
        try {
          const response = await axios.get(`https://api.github.com/users/${this.username}`);
          console.log(response.data);
          this.profile = response.data;
          this.error = null;
        } catch (err) {
          this.profile = null;
          this.error = 'Usuario no encontrado. Por favor, verifique el nombre de usuario.';
        }
      },
    },
  };
  </script>
  