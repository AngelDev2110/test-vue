<template>
    <div>
      <Navigation />
      <div class="flex flex-col justify-center items-center">
          <h1 class=" text-4xl">Timer</h1>
          <Timer />
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
  