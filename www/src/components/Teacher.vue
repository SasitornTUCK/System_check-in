<template>
  <v-data-table
    :headers="headers"
    :items="dataItems"
    sort-by="room"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Teacher</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
           <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.teach_id" label="รหัสประจำตัว"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.teach_position" label="ตำแหน่ง"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.teach_firstname" label="ชื่อ"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.teach_lastname" label="นามสกุล"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.major" label="สาขา"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tel" label="เบอร์โทร"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="อีเมลล์"></v-text-field>
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
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
          text: 'รหัสประจำตัว',
          align: 'start',
          sortable: false,
          value: 'teach_id',
        },
        { text: 'ตำแหน่ง', value: 'teach_position' },
        { text: 'ชื่อ', value: 'teach_firstname' },
        { text: 'นามสกุล', value: 'teach_lastname' },
        { text: 'สาขา', value: 'major' },
        { text: 'เบอร์โทร', value: 'tel' },
        { text: 'อีเมลล์', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataItems: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
        teach_id: '',
        teach_position: '',
        teach_firstname: '',
        teach_lastname:'',
        major: '',
        tel: '',
        email: ''
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
        await Axios.get(this.$mainUrl + "teacher")
          .then((res) => { this.dataItems = res.data })
          .catch(err => alert(err));
      },

      editItem (item) {
        this.editedIndex = this.dataItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const index = this.dataItems.indexOf(item)
        var sure = confirm('Are you sure you want to delete this item?')
        if (sure) {
          await Axios.delete(this.$mainUrl + "teachers/" + this.dataItems[index].id)
            .then(() => {
              this.dataItems.splice(index, 1)
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
          await Axios.put(this.$mainUrl + "teachers/" + this.dataItems[this.editedIndex].id, this.editedItem)
            .then(() => {
              Object.assign(this.dataItems[this.editedIndex], this.editedItem)
            })
            .catch(err => alert(err));
        } else {
          await Axios.post(this.$mainUrl + "teacher", this.editedItem)
            .then(() => {
              this.dataItems.push(this.editedItem)
            })
            .catch(err => alert(err));
        }
        this.close()
      },
    },
  }
</script>