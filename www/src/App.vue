<template>
  <v-app id="inspire">
    <v-row justify="center" align="center">
      <v-progress-linear
        :active="isLoading"
        :fixed="true"
        :height="5"
        :indeterminate="true"
        color="yellow darken-2"
        style="z-index:9999"
      ></v-progress-linear>
    </v-row>
    <v-app v-if="!isLoginPage">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <router-link
            v-for="(item, index) in menus"
            :key="index"
            :to="item.path"
            tag="span"
            style="cursor: pointer"
          >
            <v-list-item link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>จัดการข้อมูลการสอบ</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </v-container>
      </v-content>

      <v-footer app color="primary" class="white--text">
        <span>Spacer</span>
        <v-spacer></v-spacer>
        <span>&copy; 2020</span>
      </v-footer>
    </v-app>
    <router-view v-if="isLoginPage" />
  </v-app>
</template>

<script>
// import Header from './components/layouts/Header'
// import Sidebar from './components/layouts/SideBar'

export default {
  name: "App",

  components: {
    // Header,
    // Sidebar
  },

  created() {
    this.checkLoginPage();
  },

  watch: {
    $route: "checkLoginPage",
  },

  data: () => ({
    isLoginPage: false,
    isLoading: false,
    drawer: null,
    menus: [
      {
        path: "/home",
        icon: "mdi-home",
        name: "Home"
      },
      {
        path: "/room",
        icon: "mdi-aspect-ratio",
        name: "Room"
      },
      {
        path: "/student",
        icon: "mdi-account-multiple",
        name: "Student"
      },
      {
        path: "/teacher",
        icon: "mdi-account-multiple",
        name: "Teacher"
      },
      {
        path: "/subject",
        icon: "mdi-alpha-d-box-outline",
        name: "Subject"
      },
      {
        path: "/test",
        icon: "mdi-clipboard-alert-outline",
        name: "Test"
      }
    ]
  }),

  methods: {
    checkLoginPage() {
      this.isLoginPage =
        this.$router.currentRoute.path == "/login" ? true : false;
    },
    logout() {
      this.$router.push("login");
      localStorage.removeItem("token");
    },
  }
  
};
</script>
