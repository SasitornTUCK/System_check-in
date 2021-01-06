<template>
  <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Suraphol</v-list-item-title>
      </v-list-item>
      <v-spacer></v-spacer>

         <v-btn icon>
        <v-icon @click="logout">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>


    <v-col cols="12" sm="6" md="2">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="200px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="วันที่"
            prepend-icon="mdi-event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name"
    class="elevation-1"
    @click:row="handleClick"
  >
  </v-data-table>
  </v-card>
</template>

<script>

  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'รหัสวิชา',
            align: 'start',
            sortable: false,
            value: 'sub_id',
          },
          { text: 'ชื่อวิชา', value: 'sub_thai' },
          { text: 'กลุ่ม', value: 'sub_group' },
          { text: 'ห้องสอบ', value: 'room_id' },
          { text: 'เวลา', value: 'time_test' },
        ],
        desserts: [
          {
            sub_id: '523101',
            sub_thai: 'การเขียนโปรแกรมคอมพิวเตอร์ 1',
            sub_group: 1,
            room_id: 'B1212',
            time_test: '9.00 - 11.00',
          },
        ],
      }
    },
    
    methods: {
      handleClick() {
        this.$router.push("/test");
      },
      logout() {
      this.$router.push("login");
      },
      initialize () {
        this.editedItem = this.defaultItem;
        this.fetchDatas();
      },
    }
  }
</script>