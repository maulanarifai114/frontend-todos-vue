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
        <button @click.prevent="register" class="btn btn-primary w-100">Register</button>
      </form>
      <h4 @click="goLogin" class="mt-4">Login Here</h4>
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
    goLogin () {
      this.$router.push('/')
    },
    register () {
      const data = {
        username: this.username.toLowerCase(),
        password: this.password
      }
      axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, data)
        .then(() => {
          this.$router.push('/')
          alert('Wait until your account confirmed')
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
