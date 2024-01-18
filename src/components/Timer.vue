<template>
    <div>
      <div class="timer text-center">{{ formattedTime }}</div>
      <div class="buttons">
        <button @click="startTimer" :disabled="isRunning">Iniciar</button>
        <button @click="pauseTimer" :disabled="!isRunning">Pausar</button>
        <button @click="resetTimer" :disabled="!isRunning && currentTime === 0">Limpiar</button>
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
  