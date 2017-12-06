<template lang="html">
  <div class="">

  <v-layout style="margin-top: 30px;">
   <v-flex xs12 sm6 offset-sm3>
     <v-card style="height:600px; width:500px;">

       <v-card-title primary-title>
         <div>
           <img src="~@/assets/logo.png" style="width: 20%; height: 30%; padding-top: 0px;" >

           <h3 class="headline mb-0">Menu Upload</h3>
         </div>
       </v-card-title>

       <v-form v-model="valid" ref="form" lazy-validation style="margin-left:30px; margin-right:30px;">
         <form v-on:submit.prevent="save()" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" @change="onFile($event)">
        </form>
         <md-field>
          <label>Picture</label>
          <md-file v-model="file"/>
        </md-field>
         <v-text-field
           label="Name"
           v-model="name"
           required
         ></v-text-field>
         <v-text-field
           label="Price"
           v-model="price"
           required
         ></v-text-field>
         <v-select
           label="Type"
           v-model="select"
           :items="items"
           required
         ></v-select>



         <v-btn @click.native="submit(file, name, price, type)" :disabled="!valid">
           submit
         </v-btn>
       </v-form>

       <v-card-actions>

       </v-card-actions>

       <!-- <v-progress-linear  v-bind:indeterminate="true"></v-progress-linear> -->

     </v-card>
   </v-flex>
 </v-layout>

  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      file: '',
      valid: true,
      name: '',
      price: '',
      type: '',
      select: null,
      items: [
        'food',
        'drink'
      ],
      image: null
    }
  },
  methods: {
    onFile (event) {
      this.image = event.target.files[0]
      console.log(this.image)
    },
    submit (name, price, type) {
      console.log('in')
      // console.log(file)
      var formData = new FormData()
      // formData.append('name', name)
      formData.append('pic', this.image)
      Vue.$http.post('http://localhost:5000/upload', formData)
      .then(response => {
        console.log('success')
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
