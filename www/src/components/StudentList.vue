<template>
  <v-data-table
    :headers="headers"
    :items="dataItems"
    sort-by="room"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Student</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
           <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="statusItem"
                        v-model="editedItem.status"
                        item-value="id"
                        item-text="name"
                        label="ห้องสอบ"
                      ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card> 
        </v-dialog>
        
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      {{ statusValue(item.status) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
// import room from "./../mockup/room.json"
import Axios from 'axios'

export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'student_idname',
        },
        { text: 'ชื่อ', value: 'student_firstname' },
        { text: 'นามสกุล', value: 'student_lastname' },
        { text: 'ห้องสอบ', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      statusItem: [{id: 0, name: 'B1212'}, {id: 1, name:'B1213'}],
      dataItems: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
        student_idname: '',
        student_firstname: '',
        student_lastname: '',
        status: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

     methods: {
      initialize () {
        this.editedItem = this.defaultItem;
        this.fetchDatas();
      },

      async fetchDatas() {
        await Axios.get(this.$mainUrl + "studentTestByTestid/" + this.$route.query.test_id)
          .then((res) => { this.dataItems = res.data; console.log(res.data) })
          .catch(err => alert(err));
      },

      statusValue (status) {
        return (status === 1 ? 'B1212' : 'B1212')
      },

      editItem (item) {
        this.editedIndex = this.dataItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const index = this.studentTest.indexOf(item)
        var sure = confirm('Are you sure you want to delete this item?')
        if (sure) {
          await Axios.delete(this.$mainUrl + "studentTest/" + this.dataItems[index].id)
            .then(() => {
              this.studentTest.splice(index, 1)
            })
            .catch(err => alert(err));
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          await Axios.put(this.$mainUrl + "studentTest/" + this.studentTest[this.editedIndex].id, this.editedItem)
            .then(() => {
              Object.assign(this.studentTest[this.editedIndex], this.editedItem)
            })
            .catch(err => alert(err));
        } else {
          await Axios.post(this.$mainUrl + "studentTest", this.editedItem)
            .then(() => {
              this.studentTest.push(this.editedItem)
            })
            .catch(err => alert(err));
        }
        this.close()
      },
    },
  }
</script>