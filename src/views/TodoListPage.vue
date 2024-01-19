<template>
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col">
      <Navigation /> <!-- Navegación -->
      <div class="flex flex-col justify-center items-center">
          <h1 class="text-white text-center text-6xl">To-do List</h1>
          <div  class="text-white rounded-md p-4 mt-10 shadow-md shadow-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border-2 w-fit flex flex-col">
            <h2 class=" text-center text-4xl font-bold text-indigo-500">Tareas</h2>
            <o-button
            v-if="selected"
            label="Cancelar selección"
            @click="selected = null, edit = false"
            class="mt-4 bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-slate-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300"
            /> <!-- Botón para cancelar la selección -->
            <div v-if="tableData[0]"> <!-- Si hay tareas registradas -->
              <o-table v-model:selected="selected" :data="filteredTasks" focusable> <!-- Componente de la tabla -->
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
            <div v-else class="text-center text-white text-xl mt-2"> Sin tareas registradas</div> <!-- Si no hay tareas registradas -->
              <div v-if="selected" class=" flex justify-evenly mt-4"> <!-- Botones de editar, terminar y eliminar -->
                <o-button @click="edit=true" class=" bg-gradient-to-br px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-yellow-300 hover:shadow-lg hover:shadow-slate-700 transition duration-300" :class="{'text-yellow-300': edit}">Editar</o-button>
                <o-button @click="changeState" class=" bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-slate-700 transition duration-300">{{ selected.done ? 'Rehabilitar' : 'Terminar' }}</o-button>
                <o-button @click="deleteTask" class=" bg-gradient-to-bl px-3 py-1 rounded-2xl shadow-md shadow-slate-700 border border-slate-400 hover:text-red-600 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Eliminar</o-button>
              </div>
          </div>
          <div class="text-white rounded-md p-4 mt-4 shadow-md shadow-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border-2 w-fit flex flex-col"> <!-- Formulario para agregar o editar tareas -->
            <div v-if="!edit"> <!-- Agregar tareas -->
              <h2 class="text-center text-2xl font-bold text-indigo-500">Agregar Tarea</h2>
              <div class="flex mt-3">
                <o-input v-model="title" @keydown.enter="addTask" placeholder="Nombre Tarea" class="w-full border px-3 py-2 rounded-l-md text-black" />
                <o-button @click="addTask" class="bg-gradient-to-br px-3 rounded-r-md shadow-md shadow-slate-700 border border-slate-400 hover:text-green-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Agregar</o-button>
              </div>
            </div>
            <div v-if="edit"> <!-- Editar tarea -->
              <h2 class="text-center text-2xl font-bold text-indigo-500">Editar Tarea</h2>
              <h3 class="text-center text-xl font-bold text-cyan-300">{{ selected?.title }}</h3>
              <div class="flex mt-3">
                <o-input v-model="title" @keydown.enter="editTask" placeholder="Nuevo nombre" class="w-full border px-3 py-2 rounded-l-md text-black" />
                <o-button @click="editTask" class="bg-gradient-to-br px-3 rounded-r-md shadow-md shadow-slate-700 border border-slate-400 hover:text-green-400 hover:shadow-lg hover:shadow-slate-700 transition duration-300">Guardar</o-button>
              </div>
            </div>
          </div>
          <p v-if="error" class="mt-4 text-white bg-gradient-to-br from-red-800 to-red-600 py-2 px-6 text-center shadow-md shadow-slate-900 rounded-md">{{ error }}</p> <!-- Mensaje de error -->
      </div>
    </div>
  </template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
  import Swal from 'sweetalert2';
  
  
  export default {
    data() {
      return {
        columns:[ // Columnas de la tabla
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
    tableData: [], // Datos de la tabla
    selected: null, // Tarea seleccionada
    title: "", // Título de la tarea
    error: null, // Mensaje de error
    edit: false, // Modo edición
      };
    },
    components: {
      Navigation,
    },
    computed: {
      filteredTasks() { // Ordena las tareas, poniendo las terminadas al final
        return this.tableData.slice().sort((a, b) => {
          if (a.done && !b.done) return 1; // Si a está terminada y b no, a va después de b
          if (!a.done && b.done) return -1; // Si b está terminada y a no, b va después de a
          return 0; // Si ambas están terminadas o no, no se cambia el orden
        });
      },
    },
    methods:{
      addTask(){ // Agrega una tarea
        if(this.title.trim() !== "") { // Si el título no está vacío
          this.error = null // Se borra el mensaje de error
          this.tableData.push({ // Se agrega la tarea
            id: this.tableData.length + 1, // El id es el número de tareas + 1
            title: this.title, // El título es el que se ingresó
            done: false, // Por defecto la tarea no está terminada
          })
        }
        else{ // Si el título está vacío
          this.error = "No se puede agregar una tarea vacía" // Se muestra el mensaje de error
        }
        this.title = "" // Se reinciia el título
        this.selected = null // Se cancela la selección
      },
      editTask(){ // Edita una tarea
        if(this.title.trim() !== "") { // Si el título no está vacío
          this.error = null // Se borra el mensaje de error
          this.tableData.forEach(task => {  // Se busca la tarea seleccionada
            if(task.id === this.selected.id){  // Si el id de la tarea es igual al id de la tarea seleccionada
              task.title = this.title // Se cambia el título de la tarea
            }
          });
          this.selected = null // Se cancela la selección
          this.edit = false // Se cancela el modo edición
        }
        else{ // Si el título está vacío
          this.error = "Por favor ingrese un nombre para la tarea" // Se muestra el mensaje de error
        }
        this.title = "" // Se reinciia el título
      },
      deleteTask(){ // Elimina una tarea
        Swal.fire({ // Se muestra un mensaje de confirmación
          title: `¿Seguro que quieres eliminar la tarea "${this.selected.title}" ?`,
          text: "Una vez eliminada no se podrá recuperar",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          background: "#1f2937",
          color: "#fff",
          
        }).then((result) => { // Si se confirma la eliminación
          if (result.isConfirmed) {
            let newTableData = this.tableData.filter(task => { // Se filtra la tabla, eliminando la tarea seleccionada
            return task.id !== this.selected.id // Se retorna la tarea si su id es diferente al id de la tarea seleccionada
          });
          this.tableData = newTableData // Se actualiza la tabla
          this.selected = null // Se cancela la selección
          this.edit = false // Se cancela el modo edición
          this.error = null // Se borra el mensaje de error
          }
        })
      },
      changeState(){ // Cambia el estado de una tarea
        this.tableData.forEach(task => { // Se busca la tarea seleccionada
            if(task.id === this.selected.id){ // Si el id de la tarea es igual al id de la tarea seleccionada
              task.done = !task.done // Se cambia el estado de la tarea
            }
          });
        this.selected = null // Se cancela la selección
        this.edit = false // Se cancela el modo edición
        this.error = null // Se borra el mensaje de error
      }
    }
  };
  </script>
  