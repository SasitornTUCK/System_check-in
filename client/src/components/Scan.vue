<template>
  <div class="text-center">
    <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['code_128_reader']"></v-quagga>
    
    <v-btn class="ma-2" tile outlined color="success">
      <v-icon left @click="save">mdi-arrow-left</v-icon> บันทึก
    </v-btn>  
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuagga from 'vue-quaggajs';
import Axios from 'axios';
//import Axios from 'axios'

// register component 'v-quagga'
Vue.use(VueQuagga);

export default {
  name: 'VueBarcodeTest',
  data () {
    return {
      readerSize: {
        width: 640,
        height: 480
      },
      detecteds: []
    }
  },
  
  methods: {
    async logIt (data) {
      console.log('detected', data.codeResult.code)
    var student_code = data.codeResult.code

    await Axios.get(this.$mainUrl + "studentbyid?student_id=" + student_code).then((res) => {
        console.log(res.data);
        this.studentCheckIn(res.data.id)
    })

//           await Axios.put(this.$mainUrl + "studentTest/" + this.dataItems[this.editedIndex].id, this.editedItem)
//           .then(() => {
//             Object.assign(this.dataItems[this.editedIndex], this.editedItem)
//   })

//   .catch(err =>  alert(err));
    },
    async studentCheckIn(student_id) {
        await Axios.put(this.$mainUrl + "studentTestCheckin", {studentId: student_id}).then((res) => {
            console.log("checkin OK");
            alert("Checkin Success");
        }).catch(err => alert(err));
    },
    save(){
        this.$router.push("test")
    }
  },
}

</script>