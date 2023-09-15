<template>
  <div class="page-signup">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign Up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label for="">Email</label>
            <div class="control">
              <input type="email" name="username" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label for="">Email</label>
            <div class="control">
              <input type="password" name="username" class="input" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">
              {{ error }}
            </p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LogIn",
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  }
}

</script>
