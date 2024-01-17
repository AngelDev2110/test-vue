
<template class=" bg-gradient-to-br ">
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center w-full max-w-md p-4">
      <o-input v-model="username" placeholder="Usuario" class="mb-4 w-full border p-2" />
      <o-input v-model="password" type="password" placeholder="Contraseña" class="mb-4 w-full border p-2" />
      <o-button @click="login" class="w-full">Iniciar Sesión</o-button>
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
    };
  },
  methods: {
    async login() {
      try {
        const hashedPassword = md5(this.password);
        const response = await axios.get('https://mocki.io/v1/3e408794-39ed-4c75-bb6e-c49c578de293');

        if (response.data.User === this.username && response.data.pass === hashedPassword) {
          document.cookie = 'session=true';
          this.$router.push('/todo-list');
        } else {
          console.error('Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error en la llamada a la API', error);
      }
    },
  },
};
</script>
