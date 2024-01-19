<template>
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col">
      <Navigation />
      <div class="flex flex-col justify-center items-center">
          <h1 class="text-white text-center text-6xl">To-do List</h1>
    
          <div  class="text-white rounded-md p-4 mt-10 shadow-md shadow-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border-2 w-fit flex flex-col">
            <h2 class=" text-center text-4xl font-bold text-indigo-500">Tareas</h2>
            <o-button
            v-if="selected"
            label="Cancelar selección"
            @click="selected = null, edit = false"
            class="mt-4 bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-slate-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300"
            />
            <div v-if="tableData[0]">
              <o-table v-model:selected="selected" :data="filteredTasks" focusable>
                    <o-table-column
                        v-for="(column, idx) in columns"
                        :key="idx"
                        v-slot="{ row }"
                        v-bind="column">
                        <div v-if="column.field === 'done'">
                          <div
                            :class="{
                              'text-green-500': row.done,
                              'text-red-500': !row.done
                            }"
                          >
                            {{ row.done ? '✔' : '❌' }}
                          </div>
                        </div>
                        <div v-else>
                          {{ row[column.field] }}
                        </div>
                    </o-table-column>
                </o-table>
            </div>
            <div v-else class="text-center text-white text-xl mt-2"> Sin tareas registradas</div>
              <div v-if="selected" class=" flex justify-evenly mt-4">
                <o-button @click="edit=true" class=" bg-gradient-to-br px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-yellow-300 hover:shadow-lg hover:shadow-slate-700 transition duration-300" :class="{'text-yellow-300': edit}">Editar</o-button>
                <o-button @click="changeState" class=" bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-slate-700 transition duration-300">{{ selected.done ? 'Rehabilitar' : 'Terminar' }}</o-button>
                <o-button @click="deleteTask" class=" bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-red-600 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Eliminar</o-button>
              </div>
          </div>
          <div class="text-white rounded-md p-4 mt-4 shadow-md shadow-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border-2 w-fit flex flex-col">
            <div v-if="!edit">
              <h2 class="text-center text-2xl font-bold text-indigo-500">Agregar Tarea</h2>
              <div class="flex mt-3">
                <o-input v-model="title" placeholder="Nombre Tarea" class="w-full border px-3 py-2 rounded-l-md text-black" />
                <o-button @click="addTask" class="bg-gradient-to-br px-3 rounded-r-md shadow-md shadow-slate-700 border border-slate-400 hover:text-green-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Agregar</o-button>
              </div>
            </div>
            <div v-if="edit">
              <h2 class="text-center text-2xl font-bold text-indigo-500">Editar Tarea</h2>
              <h3 class="text-center text-xl font-bold text-cyan-300">{{ selected?.title }}</h3>
              <div class="flex mt-3">
                <o-input v-model="title" placeholder="Nuevo nombre" class="w-full border px-3 py-2 rounded-l-md text-black" />
                <o-button @click="editTask" class="bg-gradient-to-br px-3 rounded-r-md shadow-md shadow-slate-700 border border-slate-400 hover:text-green-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Guardar</o-button>
              </div>
            </div>
          </div>
          <p v-if="error" class="mt-4 text-white bg-gradient-to-br from-red-800 to-red-600 py-2 px-6 text-center shadow-md shadow-slate-900 rounded-md">{{ error }}</p>
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
        label: "Título",
        width: "300",
    },
    {
        field: "done",
        label: "Terminada",
    }],
    tableData: [],
    selected: null,
    title: "",
    error: null,
    edit: false,
      };
    },
    components: {
      Navigation,
    },
    computed: {
      filteredTasks() {
        return this.tableData.slice().sort((a, b) => {
          if (a.done && !b.done) return 1;
          if (!a.done && b.done) return -1;
          return 0;
        });
      },
    },
    methods:{
      addTask(){
        if(this.title.trim() !== "") {
          this.error = null
          this.tableData.push({
            id: this.tableData.length + 1,
            title: this.title,
            done: false,
          })
        }
        else{
          this.error = "No se puede agregar una tarea vacía"
        }
        this.title = ""
        this.selected = null
      },
      editTask(){
        if(this.title.trim() !== "") {
          this.error = null
          this.tableData.forEach(task => {
            if(task.id === this.selected.id){
              task.title = this.title
            }
          });
          this.selected = null
          this.edit = false
        }
        else{
          this.error = "Por favor ingrese un nombre para la tarea"
        }
        this.title = ""
      },
      deleteTask(){
        let newTableData = this.tableData.filter(task => {
          return task.id !== this.selected.id
        });
        this.tableData = newTableData
        this.selected = null
        this.edit = false
        this.error = null
      },
      changeState(){
        this.tableData.forEach(task => {
            if(task.id === this.selected.id){
              task.done = !task.done
            }
          });
        this.selected = null
        this.edit = false
        this.error = null
      }
    }
  };
  </script>
  