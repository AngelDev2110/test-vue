<template>
  <div class="flex flex-col items-center justify-center h-full  p-12  bg-zinc-900 rounded-lg border-2 shadow-lg shadow-zinc-500 relative">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-vue text-white absolute top-2 right-2" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16.5 4l-4.5 8l-4.5 -8" />
        <path d="M3 4l9 16l9 -16" />
      </svg>
    <div class="timer text-center text-5xl text-blue-500 font-bold mb-6">{{ formattedTime }}</div>
    <div class="buttons flex flex-col sm:flex-row space-y-3 sm:space-x-4 sm:space-y-0 text-white text-lg">
      <o-button @click="startTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-green-500': !isRunning}" :disabled="isRunning">{{ currentTime === 0 ? 'Iniciar' : !isRunning ? 'Reanudar' : 'Iniciar' }}</o-button>
      <o-button @click="pauseTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-yellow-500': isRunning }" :disabled="!isRunning">Pausar</o-button>
      <o-button @click="resetTimer" class="rounded-full px-6 py-3 shadow-md shadow-zinc-700 hover:shadow-lg hover:shadow-zinc-700 transition duration-300" :class="{ 'bg-red-500': !isRunning && currentTime > 0}" :disabled="!isRunning && currentTime === 0">Limpiar</o-button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: 0,
        isRunning: false,
      };
    },
    computed: {
      formattedTime() {
        const hours = Math.floor(this.currentTime / 3600);
        const minutes = Math.floor((this.currentTime % 3600) / 60);
        const seconds = this.currentTime % 60;
  
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      },
    },
    methods: {
      startTimer() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.timerInterval = setInterval(() => {
            this.currentTime += 1;
          }, 1000);
        }
      },
      pauseTimer() {
        if (this.isRunning) {
          this.isRunning = false;
          clearInterval(this.timerInterval);
        }
      },
      resetTimer() {
        this.currentTime = 0;
        this.isRunning = false;
        clearInterval(this.timerInterval);
      },
      pad(value) {
        return value.toString().padStart(2, '0');
      },
    },
    beforeDestroy() {
      clearInterval(this.timerInterval);
    },
  };
  </script>
  