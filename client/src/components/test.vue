<template>
  <v-card
    color="white"
    flat
  >
    <v-card-text>{{ text }}</v-card-text>      
    <v-data-table dense :headers="headers" :items="studentTest" item-key="name" class="elevation-1" @click:row="handleClick"></v-data-table>
    <v-btn class="ma-2" tile outlined color="success">
      <v-icon left @click="save">mdi-arrow-left</v-icon> บันทึก
    </v-btn>
    </v-card>
    
</template>

<script>
import Axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
            text: 'ลำดับที่',
            align: 'start',
            sortable: false,
            value: 'id',
          },
        { text: 'รหัสนักศึกษา', value: 'student_idname' },
        { text: 'ชื่อ', value: 'student_firstname' },
        { text: 'นามสกุล', value: 'student_lastname' },
        { text: 'Check', value: 'check' },
        { text: 'หมายเหตุ', value: 'comment' },
      ],
      dataItems: [],
      studentTest: [],
      student: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
        id: 0,
        student_idname: '',
        student_firstname: '',
        student_lastname: '',
        check: '',
        comment: ''
      },
      text: 'รหัสวิชา  523101 รายวิชา การเขียนโปรแกรมคอมพิวเตอร์ 1 กลุ่ม 2 ห้อง B1114 วันที่สอบ 24-กุมภาพันธ์-2563  เวลา 9.00 - 11.00 น.',
    }),

     created () {
      this.initialize()
    },

  methods: {
      initialize () {
        this.fetchDatas();
      },

      async fetchDatas() {
        await Axios.get(this.$mainUrl + "studentTest")
          .then((res) => { this.studentTest = res.data})
          .catch(err => alert(err));

        await Axios.get(this.$mainUrl + "student")
          .then((res) => { this.student = res.data })
          .catch(err => alert(err));
      },

       handleClick() {
        this.$router.push("/scan");
      },
       save(){
        this.$router.push("home")
    }
  },
  }
</script>