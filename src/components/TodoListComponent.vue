<template>
    <div>
      <!-- Input para agregar nuevas tareas -->
      <input v-model="newTaskTitle" @keyup.enter="addTask" placeholder="Nueva tarea" class="border p-2 rounded-md mb-4" />
  
      <!-- Lista de tareas -->
      <div v-for="task in sortedTasks" :key="task.id" class="flex items-center justify-between p-2 bg-white rounded-md shadow-md">
        <div class="flex items-center">
          <!-- Identificador gráfico que indica si está completada -->
          <div :class="{ 'bg-green-500': task.done, 'bg-red-500': !task.done }" class="w-4 h-4 rounded-full mr-2"></div>
          <p>{{ task.title }}</p>
        </div>
        <div>
          <!-- Botones para modificar o eliminar tareas -->
          <button @click="toggleTaskStatus(task)" class="mr-2">{{ task.done ? 'Reabrir' : 'Completar' }}</button>
          <button @click="deleteTask(task)">Eliminar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTaskTitle: '',
      };
    },
    computed: {
      // Variable computada para ordenar las tareas
      sortedTasks() {
        return this.tasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
      },
    },
    methods: {
      // Método para agregar una nueva tarea
      addTask() {
        if (this.newTaskTitle.trim() !== '') {
          const newTask = { id: Date.now(), title: this.newTaskTitle, done: false };
          this.tasks.push(newTask);
          this.newTaskTitle = '';
        }
      },
      // Método para cambiar el estado de una tarea (completar/reabrir)
      toggleTaskStatus(task) {
        task.done = !task.done;
      },
      // Método para eliminar una tarea
      deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
      },
    },
  };
  </script>
  