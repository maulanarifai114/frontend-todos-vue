<template>
  <div class=" container-fluid d-flex flex-column">
    <div class="my-5 container d-flex justify-content-between align-items-center">
      <h1>Hi, {{getUsername}}</h1>
      <div @click="logout" class="logout d-flex align-items-center">
        <h2>Log out</h2>
        <img class="ml-3" src="../assets/logout.svg" alt="icon" width="24">
      </div>
    </div>
    <div class="row">
      <!-- Users -->
      <div class="col">
        <!-- Title -->
        <div class="d-flex mb-4 justify-content-center">
          <h1 class="title">Users</h1>
        </div>
        <!-- All Users -->
        <div v-for="(item, index) in users" :key="index" class="w-100 box d-flex mb-3 justify-content-between align-items-center">
          <input v-if="editUser === item.id" type="text" class="form-control" v-model="updateUser.username" >
          <h3 v-else>{{item.username}}</h3>
          <div v-if="editUser !== item.id" class="d-flex align-items-center">
            <button @click.prevent="confirmUser(item.id)" v-if="item.confirmed === 0" class="btn btn-dark">Confirm</button>
            <button v-else class="btn btn-secondary" disabled>Confirmed</button>
            <img @click="deleteUser(item.id)" class="ml-3" src="../assets/trash.svg" alt="icon" width="24">
            <img @click="editModeUser(item)" class="ml-3" src="../assets/pen.svg" alt="icon" width="24">
          </div>
          <div v-else class=" d-flex align-items-center">
            <img @click="closeEditUser" class="ml-3" src="../assets/close.svg" alt="icon" width="18">
            <img @click="updateUserNow" class="ml-3" src="../assets/check.svg" alt="icon" width="24">
          </div>
        </div>
      </div>
      <!-- Todos -->
      <div class="col-5">
        <div class="d-flex mb-4 justify-content-center">
          <h1 class="title">Todo List</h1>
        </div>
        <button class="btn btn-dark mb-3 w-100" @click="showBoxTodo">+</button>
        <!-- Box Add Task -->
        <div v-if="show === 1" class="w-100 box d-flex align-items-center mb-3">
          <!-- Add Task -->
          <div class="w-50 mr-3">
            <h3>Add Task</h3>
            <br>
            <input @keypress.enter="createTodo" type="text" class="form-control" v-model="add.task">
          </div>
          <!-- Choose Label -->
          <div class="w-25">
            <h3>Choose Label</h3>
            <br>
            <select class="custom-select" v-model="add.labelId">
              <option disabled selected class="opt-disabled">Select Label</option>
              <option v-for="(option, index) in labels" :key="index" :value="option.id">{{option.label}}</option>
            </select>
          </div>
          <!-- Save -->
          <div class="flex-fill h-100 d-flex justify-content-end">
            <img @click="createTodo" src="../assets/check.svg" alt="icon" width="24">
          </div>
        </div>
        <!-- All Todos -->
        <div v-if="todos.length === 0" class="w-100 box d-flex justify-content-center mb-3">Todos is Empty</div>
        <div v-else v-for="(item, index) in todos" :key="index" class="w-100 box d-flex align-items-center justify-content-between mb-3">
          <!-- Checkbox and Task Name -->
          <input @keypress.enter="updateTodo" type="text" v-if="edit === item.id" class="form-control" v-model="update.task">
          <label v-else :for="item.id" class="d-flex justify-content-center align-items-center">
            <input @change="changeCompleted(item)" :value="item.completed" :checked="item.completed === 1" class="mr-3" type="checkbox" name="check" :id="item.id">
            <h4 v-if="item.completed === 0">{{item.task}}</h4>
            <del v-else>{{item.task}}</del>
          </label>
          <!-- Edit, Trash, Label -->
          <select v-if="edit === item.id" class="custom-select ml-3" v-model="update.label_id">
            <option v-for="(option, index) in labels" :key="index" :value="option.id">{{option.label}}</option>
          </select>
          <div v-else class="d-flex align-items-center">
            <div :style="`background:${item.color}`" class="todos-label d-flex align-items-center justify-content-center">{{item.label}}</div>
            <img class="ml-5" @click="deleteTodo(item.id)" src="../assets/trash.svg" alt="icon" width="24">
            <img class="ml-3" @click="editMode(item)" src="../assets/pen.svg" alt="icon" width="24">
          </div>
          <img v-if="edit === item.id" class="ml-3" @click="updateTodo" src="../assets/check.svg" alt="icon" width="24">
        </div>
      </div>
      <!-- Labels -->
      <div class="col">
        <!-- Title -->
        <div class="d-flex mb-4 justify-content-center">
          <h1 class="title">Labels</h1>
        </div>
        <!-- Button to add labels -->
        <button class="btn btn-dark mb-3 w-100" @click="showBoxLabels">+</button>
        <!-- Add Label -->
        <div v-if="showLabel === 1" class="w-100 box d-flex mb-3 flex-column">
          <h3>Add Label</h3>
          <br>
          <div class="d-flex align-items-center">
            <input @keypress.enter="createLabel" type="text" class="form-control" v-model="addLabel.label">
            <img @click="createLabel" class="ml-3" src="../assets/check.svg" alt="icon" width="24">
          </div>
        </div>
        <!-- All Label -->
        <div v-if="labels.length === 0" class="w-100 box d-flex justify-content-center mb-3">Labels is Empty</div>
        <div v-else v-for="(item, index) in labels" :key="index" class="w-100 box d-flex align-items-center justify-content-between mb-3">
          <input v-if="editLabel === item.id" @keypress.enter="updateLabelNow" type="text" class="form-control" v-model="updateLabel.label">
          <div v-else>{{item.label}}</div>
          <div v-if="editLabel !== item.id">
            <img src="../assets/trash.svg" alt="icon" @click="deleteLabel(item.id)" width="24">
            <img class="ml-3" src="../assets/pen.svg" alt="icon" @click="editModeLabel(item)" width="24">
          </div>
          <img v-else class="ml-3" src="../assets/check.svg" alt="icon" @click="updateLabelNow" width="24">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Admin',
  data () {
    return {
      show: 0,
      showLabel: 0,
      edit: 0,
      editLabel: 0,
      editUser: 0,
      labels: [],
      todos: [],
      users: [],
      add: {
        task: '',
        labelId: 'Select Label'
      },
      addLabel: {
        label: '',
        description: '',
        color: '#FFFFFF'
      },
      updateUser: {
        id: 0,
        username: '',
        password: ''
      },
      updateLabel: {
        id: 0,
        label: '',
        description: '',
        color: '#FFFFFF'
      },
      update: {
        id: 0,
        label_id: 0,
        task: '',
        completed: 0
      }
    }
  },
  computed: {
    getUsername () {
      return localStorage.getItem('username')
    }
  },
  methods: {
    confirmUser (id) {
      axios.patch(`${process.env.VUE_APP_API_URL}/admin/confirm`, [id])
        .then(() => {
          this.getAllUsers()
        })
        .catch((err) => console.log(err.response.data.err))
    },
    updateUserNow () {
      const data = this.updateUser
      axios.patch(`${process.env.VUE_APP_API_URL}/admin/user`, data)
        .then(() => {
          this.getAllUsers()
          this.editUser = 0
        })
        .catch((err) => console.log(err.response.data.err))
    },
    updateLabelNow () {
      const data = this.updateLabel
      axios.patch(`${process.env.VUE_APP_API_URL}/labels`, data)
        .then(() => {
          this.getAllLabels()
          this.editLabel = 0
        })
        .catch((err) => console.log(err.response.data.err))
    },
    deleteUser (id) {
      axios.delete(`${process.env.VUE_APP_API_URL}/admin`, { data: [id] })
        .then(() => this.getAllUsers())
        .catch((err) => console.log(err.response.data.err))
    },
    deleteLabel (id) {
      axios.delete(`${process.env.VUE_APP_API_URL}/labels`, { data: [id] })
        .then(() => this.getAllLabels())
        .catch((err) => console.log(err.response.data.err))
    },
    createLabel () {
      const data = this.addLabel
      console.log(this.addLabel)
      console.log(data)
      if (this.addLabel.label === '') {
        Swal.fire('Failed', 'You must add a name label', 'error')
      } else {
        axios.post(`${process.env.VUE_APP_API_URL}/labels`, data)
          .then(() => this.getAllLabels(), this.showLabel = 0)
          .catch((err) => console.log(err.response.data.err))
      }
    },
    editModeUser (item) {
      this.editUser = item.id
      this.updateUser.id = item.id
      this.updateUser.username = item.username
    },
    closeEditUser () {
      this.editUser = 0
      this.updateUser.id = 0
      this.updateUser.username = ''
    },
    editModeLabel (item) {
      this.editLabel = item.id
      this.updateLabel.id = item.id
      this.updateLabel.label = item.label
      this.updateLabel.description = item.description
      this.updateLabel.color = item.color
    },
    editMode (item) {
      this.edit = item.id
      this.update.id = item.id
      this.update.label_id = item.label_id
      this.update.task = item.task
      this.update.completed = item.completed
    },
    updateTodo () {
      const data = this.update
      axios.patch(`${process.env.VUE_APP_API_URL}/todos`, [data])
        .then(() => {
          this.getAllTodos()
          this.edit = 0
        })
        .catch((err) => console.log(err.response.data.err))
    },
    deleteTodo (id) {
      axios.delete(`${process.env.VUE_APP_API_URL}/todos`, { data: [id] })
        .then(() => this.getAllTodos())
        .catch((err) => console.log(err.response.data.err))
    },
    createTodo () {
      if (this.add.task === '') {
        Swal.fire('Failed', 'You must create a task', 'error')
      } else if (this.add.labelId === 'Select Label') {
        Swal.fire('Failed', 'You must select a label', 'error')
      } else {
        const data = {
          task: this.add.task,
          labelId: this.add.labelId
        }
        axios.post(`${process.env.VUE_APP_API_URL}/todos`, data)
          .then(() => {
            this.getAllTodos()
            this.show = 0
            this.add.task = ''
            this.add.labelId = 'Select Label'
          })
          .catch((err) => console.log(err.response.data.err))
      }
    },
    changeCompleted (item) {
      const data = {
        id: 0,
        label_id: 0,
        task: '',
        completed: 0
      }
      data.id = item.id
      data.label_id = item.label_id
      data.task = item.task
      data.completed = item.completed === 1 ? 0 : 1
      this.todos.forEach((item, index) => { if (item.id === data.id) { this.todos[index].completed = data.completed } })
      axios.patch(`${process.env.VUE_APP_API_URL}/todos`, [data])
        .then((res) => console.log(res.data.result))
        .catch((err) => console.log(err.response.data.err))
    },
    getAllLabels () {
      axios.get(`${process.env.VUE_APP_API_URL}/labels`)
        .then((res) => {
          if (res.data.result !== 'Labels is empty') {
            this.labels = res.data.result
          } else {
            this.labels = []
          }
        })
        .catch((err) => console.log(err.response.data))
    },
    getAllTodos () {
      axios.get(`${process.env.VUE_APP_API_URL}/todos`)
        .then((res) => {
          if (res.data.result !== 'Todos is empty') {
            this.todos = res.data.result
          } else {
            this.todos = []
          }
        })
        .catch((err) => console.log(err.response.data))
    },
    getAllUsers () {
      axios.get(`${process.env.VUE_APP_API_URL}/admin`)
        .then((res) => {
          if (res.data.result !== 'Users is empty') {
            this.users = res.data.result
          } else {
            this.users = []
          }
        })
        .catch((err) => console.log(err.response.data))
    },
    showBoxTodo () {
      this.add.task = ''
      this.add.labelId = 'Select Label'
      this.show === 1 ? this.show = 0 : this.show = 1
    },
    showBoxLabels () {
      this.addLabel.label = ''
      this.addLabel.description = ''
      this.addLabel.color = '#FFFFFF'
      this.showLabel === 1 ? this.showLabel = 0 : this.showLabel = 1
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      Swal.fire('Success', 'Thank your for using this application', 'success')
      this.$router.push('/')
    }
  },
  mounted () {
    this.getAllLabels()
    this.getAllTodos()
    this.getAllUsers()
  }
}
</script>

<style lang="scss" scoped>

.box {
  padding: 20px;
  border-radius: 10px;
  background-color: rgb(220, 255, 220);
}

.title {
  font-size: 1.5rem;
}

h2, h4, img, del, .logout {
  cursor: pointer
}

.opt-disabled {
  color: #dadada
}

.todos {
  padding-left: 10px;
}

.todos-label {
  border-radius: 5px;
  padding: 0 10px;
  height: 38px;
}

</style>
