<template>
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col">
      <Navigation />
      <div class="flex flex-col justify-center items-center">
          <h1 class="text-white text-center text-6xl">To-do List</h1>
    
          <div  class="text-white rounded-md p-4 mt-10 shadow-md shadow-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border-2 w-fit flex flex-col">
            <h2 class=" text-center text-4xl font-bold text-indigo-500">Tareas</h2>
            <o-button
            :disabled="!selected"
            v-if="selected"
            label="Cancelar selección"
            @click="selected = null"
            class="mt-4"
            />
    
              <o-table v-model:selected="selected" :data="tableData" focusable>
                    <o-table-column
                        v-for="(column, idx) in columns"
                        :key="idx"
                        v-slot="{ row }"
                        v-bind="column">
                        {{ row[column.field] }}
                    </o-table-column>
                </o-table>
                <p class="mt-4" v-if="selected">Tarea elegida: {{ selected?.title }}</p>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';

  
  
  export default {
    data() {
      return {
        columns:[
    {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
    },
    {
        field: "title",
        label: "Title",
        width: "300",
    },
    {
        field: "done",
        label: "Done",
    }],
    tableData: [
    {
        id: 1,
        title: "Hacer tarea",
        done: false,
    },
    {
        id: 2,
        title: "No hacer tarea",
        done: false,
    }],
    selected: null,
      };
    },
    components: {
      Navigation,
    },
  };
  </script>
  