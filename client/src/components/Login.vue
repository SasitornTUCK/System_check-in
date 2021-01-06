<template>
  <v-container>
    <br />
    <br />
    <br />
    <v-card max-width="700" class="mx-auto">
      <v-system-bar color="#3b83bd"></v-system-bar>
      <v-system-bar color="#00ced1"></v-system-bar>
      <v-row justify="center">
        <v-toolbar-title>
          <h1>Login</h1>
        </v-toolbar-title>
      </v-row>

      <v-row justify="center">
        <v-col cols="5">
          <v-text-field
            v-model="username"
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
        </v-col>
      </v-row>



      <v-row justify="center">
        <v-col cols="5">
          <v-text-field
            id="password"
            v-model="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
      <v-btn @click="userSignIn" color="orange darken-2">Login</v-btn>
      </v-row>

      <br />
      <br />
      <v-system-bar color="#00ced1"></v-system-bar>
      <v-system-bar color="#3b83bd"></v-system-bar>
      
    </v-card>
  </v-container>
</template>


<script>
  export default {
      data() {
          return {
              username: '',
              password: ''
          }
      },
      mounted: 
        function () {
      },
      methods: {
          userSignIn() {
              this.$http.post(this.$mainUrl + 'login', { username: this.username, password: this.password })
          .then(request => this.loginSuccessful(request))
          .catch(() => this.loginFailed())
        },
        loginSuccessful (req) {
          if (!req.data.id) {
            this.loginFailed()
            return
          }
          localStorage.setItem('user', req.data.id)
          this.$store.dispatch('login')
          this.$router.push('home');
          // alert('login')
          // this.$router.replace(this.$route.query.redirect || '/room')
        },
        loginFailed () {
          this.$store.dispatch('logout')
          localStorage.removeItem('user')
          alert("username or password wrong !")
        }
      }
  }
</script>