<template>
  <div class=" container-fluid d-flex flex-column">
    <div class="row flex-fill my-5">
      <div class="col-4 d-flex align-items-center flex-column">
        <h1>Users</h1>
        <div class="add-box d-flex justify-content-center align-items-center">+</div>
        <div class="add-box list d-flex justify-content-center align-items-center">Users here</div>
      </div>
      <div class="col-4 d-flex align-items-center flex-column">
        <h1>Todos</h1>
        <div class="add-box d-flex justify-content-center align-items-center">+</div>
        <div class="add-box list d-flex justify-content-center align-items-center">Todos here</div>
      </div>
      <div class="col-4 d-flex align-items-center flex-column">
        <h1>Labels</h1>
        <div class="add-box d-flex justify-content-center align-items-center">+</div>
        <div class="add-box list d-flex justify-content-center align-items-center">Labels here</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style lang="scss" scoped>

.container-fluid {
  height: 100vh;
}

h1 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0
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
}

</style>
