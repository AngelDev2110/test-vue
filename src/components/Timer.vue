<template>
    <div>
      <div class="timer text-center">{{ formattedTime }}</div>
      <div class="buttons">
        <button @click="startTimer">Iniciar</button>
        <button @click="pauseTimer">Pausar</button>
        <button @click="resetTimer">Limpiar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: 0,
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
      pad(value) {
        return value.toString().padStart(2, '0');
      },
    },
  };
  </script>
  