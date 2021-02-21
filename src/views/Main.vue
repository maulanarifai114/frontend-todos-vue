<template>
  <div class=" container-fluid d-flex flex-column">
    <h1 class="mt-5">Hi, {{getUsername}}</h1>
    <div class="row flex-fill d-flex align-items-center flex-column">
      <div class="col-4 d-flex align-items-center flex-column">
        <h2>Todos</h2>
        <div class="add-box d-flex justify-content-center align-items-center">+</div>
        <div v-for="(item, index) in todos" :key="index"  class="add-box list d-flex flex-column">
          <div class=" d-flex mb-3">
            <img @click="deleteTodo(item.id)" src="../assets/trash.svg" alt="icon" width="24" height="24">
            <img v-if="edit === item.id" class="ml-3" @click="closeEditMode" src="../assets/check.svg" alt="icon" width="24" height="24">
            <img v-else-if="edit !== item.id" class="ml-3" @click="editMode(item)" src="../assets/pen.svg" alt="icon" width="24" height="24">
          </div>
          <div v-if="edit !== item.id">
            <h5>{{item.label}}</h5>
            <h6>{{item.description}}</h6>
          </div>
          <select v-else v-model="selected" @change="lookSelected()">
            <option :selected="selected === item.label" v-for="(option, index) in labels" :key="index" :value="option.label_id">{{option.label}}</option>
          </select>
          <input v-if="item.completed === 1" class="task completed" type="text" :value="item.task" disabled>
          <input v-else-if="edit !== item.id" class="task" type="text" :value="item.task" disabled>
          <input v-else class="task" type="text" :value="item.task">
          <label :for="item.id" class="mt-3 d-flex justify-content-between align-items-center">
            <div>Completed</div>
            <input v-if="item.completed === 1" @change="completedTask(item.id)" type="checkbox" name="completed" :id="item.id" checked>
            <input v-else @change="completedTask(item.id)" type="checkbox" name="completed" :id="item.id">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      edit: 0,
      selected: 0,
      dataEdit: {},
      labels: [
        {
          id: 1,
          label: 'Very Important',
          description: 'Must be very first and quickly',
          color: '#FFFFFF',
          created_at: '2021-02-19T17:23:55.000Z',
          updated_at: '2021-02-20T06:26:27.000Z'
        },
        {
          id: 2,
          label: 'Not Important',
          description: 'Not to be first to do',
          color: '#FFFFFF',
          created_at: '2021-02-19T17:26:27.000Z',
          updated_at: '2021-02-20T05:43:51.000Z'
        },
        {
          id: 3,
          label: 'Important',
          description: 'First thing to do',
          color: '#FFFFFF',
          created_at: '2021-02-20T06:32:38.000Z',
          updated_at: '2021-02-20T06:32:38.000Z'
        }
      ],
      todos: [
        {
          id: 1,
          label_id: 1,
          completed: 1,
          task: 'Reading Novel',
          label: 'Very Important',
          description: 'Must be very first and quickly',
          color: '#FFFFFF'
        },
        {
          id: 2,
          label_id: 2,
          completed: 0,
          task: 'Vacation to Europe',
          label: 'Not Important',
          description: 'Must be very first and quickly',
          color: '#FFFFFF'
        }
      ]
    }
  },
  computed: {
    getUsername () {
      return localStorage.getItem('username')
    }
  },
  methods: {
    lookSelected () {
      // console.log(event.target.value)
      console.log(this.selected)
    },
    completedTask (id) {
      this.todos.forEach((item) => {
        if (item.id === id) {
          item.completed === 0 ? item.completed = 1 : item.completed = 0
        }
      })
    },
    deleteTodo (id) {
      console.log(id)
    },
    editMode (item) {
      this.edit = item.id
      this.selected = item.label
      this.dataEdit = item
      console.log(item)
    },
    closeEditMode () {
      this.edit = 0
    }
  }
}
</script>

<style lang="scss" scoped>

.container-fluid {
  height: 100vh;
}

.task {
  padding: 5px 0;
  font-size: 1.5rem;
  color: black;
  border-bottom: 1px solid black;
}

.task:focus {
  border-bottom: 1px solid black;
}

.completed {
  color: #c0c0c0;
}

select {
  color: #000;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  padding: 0;
  border: 0;
  border-bottom: 1px solid black;
}

select {
  outline: 0
}

label {
  padding: 8px;
  background-color: rgb(209, 223, 255);
  border-radius: 5px;
}

input:disabled {
  border-bottom: 1px solid rgb(196, 196, 196);
}

input {
  background-color: #fff;
  border: 0
}

input:focus {
  border: 0;
  outline: 0
}

img {
  cursor: pointer;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0
}

h3, del {
  font-size: 1.5rem;
}

h5 {
  color: #c0c0c0;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

h6 {
  color: #c0c0c0;
  margin: 0 0 1rem 0;
  font-size: 0.8rem;
}

.add-box {
  width: 100%;
  min-height: 45px;
  background: rgb(150, 255, 146);
  cursor: pointer;
  border-radius: 10px;
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.list {
  font-size: 1rem;
  background: white;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: inherit;
}

</style>
