<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    checkLoginPage() {
      this.isLoginPage =
        this.$router.currentRoute.path == "/login" ? true : false;
    },
  }
};
</script>
