<template>
  <div class="container d-flex justify-content-center">
    <div class="col-6 my-5">
      <form>
        <!-- Username -->
        <div class="form-group">
          <label class="mb-3" for="username">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" aria-describedby="emailHelp">
        </div>
        <!-- Password -->
        <div class="form-group mb-5">
          <label class="mb-3" for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <!-- Login -->
        <button @click.prevent="login" class="btn btn-primary w-100">Log in</button>
      </form>
      <h4 @click="goRegister" class="mt-4">Register Here</h4>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goRegister () {
      this.$router.push('/register')
    },
    login () {
      const data = {
        username: this.username.toLowerCase(),
        password: this.password
      }
      axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, data)
        .then((res) => {
          if (res.data.result.id.toString() === process.env.VUE_APP_ADMIN) {
            localStorage.setItem('id', res.data.result.id)
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('username', res.data.result.username)
            this.$router.push('/admin')
          } else {
            localStorage.setItem('id', res.data.result.id)
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('username', res.data.result.username)
            this.$router.push('/main')
          }
        })
        .catch((err) => alert(err.response.data.err))
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  height: 100vh;
}

h4 {
  cursor: pointer;
}

</style>
