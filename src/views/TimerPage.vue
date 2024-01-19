<template>
  <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col">
    <Navigation />

    <div class="flex-grow flex items-center justify-center mb-40">
      <div class="flex flex-col items-center">
        <h1 class="text-6xl font-bold text-white mb-4">Timer</h1>
        <Timer /> <!-- Componente del timer -->
      </div>
    </div>
  </div>
</template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
  import Timer from '@/components/Timer.vue';
  
  export default {
    components: {
      Navigation,
      Timer,
    },
  };
  </script>
  