<template lang="html">
  <div class="register">

  <v-layout style="margin-top: 30px;">
   <v-flex xs12 sm6 offset-sm3>

     <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Fill information</v-stepper-step>
        <v-divider></v-divider>

      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="" class="mb-5" height="520px">
            <v-alert v-if="err != null" color="error" icon="warning" value="true">
              {{err}}
            </v-alert>

            <v-card-title primary-title>
              <div>

                <h3 class="headline mb-0">Registration</h3>
              </div>
            </v-card-title>

            <v-form v-model="valid" ref="form" lazy-validation style="margin-left:30px; margin-right:30px;">

              <v-text-field
                label="Student Id"
                v-model="username"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                required
              ></v-text-field>
              <v-text-field
                label="Comfirm Password"
                v-model="comfirm"
                required
              ></v-text-field>
              <v-text-field
                label="Name"
                v-model="name"
                required
              ></v-text-field>
              <v-text-field
                label="Phone"
                v-model="phone"
                required
              ></v-text-field>
              <v-select
                label="Type"
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                required
              ></v-select>


            </v-form>

          </v-card>
          <v-btn color="primary" :disabled="!valid" @click.native="register(username, password,comfirm, name, phone, select)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>


      </v-stepper-items>
    </v-stepper>



   </v-flex>
 </v-layout>



  </div>


</template>

<script>
import Api from '../api/api.js'
export default {
  data () {
    return {
      err: null,
      e1: 0,
      single: '',
      name: '',
      username: '',
      password: '',
      comfirm: '',
      phone: '',
      type: '',
      select: null,
      valid: '',
      items: [
        'student',
        'staff'
      ]
    }
  },
  methods: {
    register (user, pass, conPass, name, phone, type) {
      if (pass === conPass) {
        console.log('user', user)
        console.log('pass', pass, 'conpass', conPass)
        console.log('name', name)
        console.log('phone', phone, 'type', type)
        Api.register(user, pass, type, phone, name, callback => {
          console.log(callback)
          if (callback === 'true') {
            this.$router.push('/')
          } else if (callback === 'false') {
            this.err = 'This username already existed'
          }
        })
      } else {
        this.err = 'password are not the same'
        // do something
      }
    }
  }
}
</script>

<style lang="css">
.register {
 background-image: url('~@/assets/bg.jpg');
 background-size:cover;
 width: 100%;
 top: 0px;


 height: 100%;
}

</style>
