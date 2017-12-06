<template>

  <v-content class="login" >
   <v-container fluid>

     <!-- <router-view></router-view> -->
     <v-layout>
      <v-flex xs12 sm6 offset-sm3>

        <v-card  class="card" style="">

          <v-alert v-if="login == false" color="error" icon="warning" value="true">
            Wrong username or password
          </v-alert>


          <img src="~@/assets/logo.png" style="width: 50%; height: 50%; padding-top: 100px;" >

          <v-card-title >
          </v-card-title>

          <div style="text-align:center; margin-left:20%; margin-right:20%;">
            <span style="font-size:12pt; font-weight: bold;">Login</span><br>
            <span class="grey--text">Staff</span><br>


            <form>
             <v-text-field
               label="username"
               v-model="username"
             ></v-text-field>
             <v-text-field
               label="password"
               v-model="password"
               type="password"
             ></v-text-field>
             <v-btn style="background-color:#2E3B60; color:white; width:100%; " @keyup.enter="submit(username, password)"  @click="submit(username, password)">submit</v-btn>
           </form>


          </div>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
   </v-container>

   <v-dialog v-model="dialog3" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Dialog 3</span>
            <v-spacer></v-spacer>

          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
 </v-content>
</template>

<script>
import Api from '../api/api.js'
import store from '../store'
// import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  beforeCreate () {
    store.state.auth = false
  },
  data () {
    return {
      login: true,
      msg: 'Wrong username or password',
      username: '',
      password: '',
      dialog3: false
    }
  },
  methods: {
    submit (user, pass) {
      console.log(user, pass)
      Api.login(user, pass, callback => {
        console.log('callback', callback)
        console.log('check', callback.Type === 'staff')
        if (callback !== false) {
          if (callback.Type === 'staff') {
            store.state.auth = true
            this.$router.push('/Interface')
          } else {
            this.msg = 'Unauthorized'
          }
        }
        this.login = false
        console.log('this.login', this.login)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-left: auto;
 margin-right: auto;

 padding-top:0px;
 height:600px; width:450px;
 margin-top: 60px;
}
.login {
 background-image: url('~@/assets/bg.jpg');
 background-size:cover;
 width: 100%;
 top: 0px;


 height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
