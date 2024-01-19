<template>
  <div class="flex flex-col items-center justify-center h-full  p-12  bg-zinc-900 rounded-lg border-2 shadow-lg shadow-zinc-500 relative">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-vue text-white absolute top-2 right-2" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16.5 4l-4.5 8l-4.5 -8" />
        <path d="M3 4l9 16l9 -16" />
      </svg>
    <div class="timer text-center text-5xl text-blue-500 font-bold mb-6">{{ formattedTime }}</div> <!-- temporizador -->
    <div class="buttons flex flex-col sm:flex-row space-y-3 sm:space-x-4 sm:space-y-0 text-white text-lg"> <!-- botones -->
      <o-button @click="startTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-green-500': !isRunning}" :disabled="isRunning">{{ currentTime === 0 ? 'Iniciar' : !isRunning ? 'Reanudar' : 'Iniciar' }}</o-button>
      <o-button @click="pauseTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-yellow-500': isRunning }" :disabled="!isRunning">Pausar</o-button>
      <o-button @click="resetTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-red-500': currentTime > 0 }" :disabled="!isRunning && currentTime === 0">Limpiar</o-button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: 0, // Tiempo actual
        isRunning: false, // Estado del temporizador
      };
    },
    computed: {
      formattedTime() { // Función para darle formato al tiempo
        const hours = Math.floor(this.currentTime / 3600); // Obtener las horas
        const minutes = Math.floor((this.currentTime % 3600) / 60); // Obtener los minutos
        const seconds = this.currentTime % 60; // Obtener los segundos
  
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      },
    },
    methods: {
      startTimer() { // Función para iniciar el temporizador
        if (!this.isRunning) {
          this.isRunning = true; // Cambiar el estado del temporizador
          this.timerInterval = setInterval(() => { // Intervalo para actualizar el tiempo
            this.currentTime += 1; // Sumar 1 segundo al tiempo actual
          }, 1000); 
        }
      },
      pauseTimer() { // Función para pausar el temporizador
        if (this.isRunning) { 
          this.isRunning = false; // Cambiar el estado del temporizador
          clearInterval(this.timerInterval); // Limpiar el intervalo
        }
      },
      resetTimer() { // Función para resetear el temporizador
        this.currentTime = 0; // Reiniciar el tiempo actual
        this.isRunning = false; // Cambiar el estado del temporizador
        clearInterval(this.timerInterval); // Limpiar el intervalo
      },
      pad(value) { // Función para darle formato a los números
        return value.toString().padStart(2, '0'); // Agregar un 0 a la izquierda si el número es menor a 10
      },
    },
    beforeDestroy() { // Función para limpiar el intervalo cuando se destruye el componente
      clearInterval(this.timerInterval);
    },
  };
  </script>
  