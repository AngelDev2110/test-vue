
<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
    <div class="flex flex-col items-center justify-center w-full max-w-[24rem] p-8 shadow-xl bg-gradient-to-br from-sky-950 to-sky-600 rounded h-[30rem]">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-vue text-white" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16.5 4l-4.5 8l-4.5 -8" />
        <path d="M3 4l9 16l9 -16" />
      </svg>
      <h1 class="mt-4 mb-8 text-white text-4xl font-semibold">Bienvenido</h1>
      <o-input v-model="username" placeholder="Usuario" class="mb-4 w-full border p-3 rounded-sm shadow-md shadow-slate-800" />
      <o-input v-model="password" type="password" placeholder="Contraseña" class="mb-4 w-full border p-3 rounded-sm shadow-md shadow-slate-800" />
      <o-button @click="login" class="text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:shadow-slate-900 shadow-slate-900 transition duration-300">Iniciar Sesión</o-button>
      
      <div v-if="loading" class="sk-chase mt-4">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>

      <p v-if="error" class="mt-4 text-white bg-gradient-to-br from-red-800 to-red-600 py-2 px-6 text-center shadow-md shadow-slate-900 rounded-md">{{ error }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import md5 from 'md5';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    async login() {
      try {

        this.loading = true;
        this.error = null;

        const hashedPassword = md5(this.password);
        const response = await axios.get('https://mocki.io/v1/3e408794-39ed-4c75-bb6e-c49c578de293');
        const {userName, password} = response.data;

        if (userName === this.username && password === hashedPassword) {
          document.cookie = 'logginSuccess=true';
          this.$router.push('/todo-list');
        } else {
          this.error = 'Credenciales incorrectas';
        }
      } catch (error) {
        this.error = 'Error en la llamada a la API';
      }
      finally {
        this.loading = false;
      }
    },
  },
};
</script>
