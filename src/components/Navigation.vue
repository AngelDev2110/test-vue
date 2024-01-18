<template>
    <nav class="bg-gray-900 py-4">
      <div class="flex items-center justify-center">
        <div class="flex items-center flex-col space-y-1 sm:flex-row sm:space-x-6">
          <router-link to="/todo-list" class="text-white text-2xl hover:text-blue-400">TodoList</router-link>
          <router-link to="/timer" class="text-white text-2xl hover:text-blue-400">Timer</router-link>
          <router-link to="/git-profile" class="text-white text-2xl hover:text-blue-400">GitProfile</router-link>
          <button class="text-white text-2xl hover:text-red-500">Cerrar sesión</button>
        </div>
      </div>
    </nav>
</template>