<template lang="html">

  <div class="interface">
    <v-toolbar style="background-color:#2E3B60; ">
      <v-toolbar-side-icon style="color:white;" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <img src="~@/assets/logo.png" style="width: 50px; height: 10px padding-top: 0px;" > -->
      <v-toolbar-title class="white--text">Brew & Brev</v-toolbar-title>
      <v-spacer></v-spacer>

    
    </v-toolbar>

    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      absolute
    >
    <v-toolbar flat style="background-color:#2E3B60; ">
      <!-- <img src="~@/assets/logo.png" style=" width: 50px; height: 10px padding-top: 0px;" > -->

      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title" style="color:white;">
            Brew & Brev
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title" @click="goto(item.title)">
        <v-list-tile-action>

          <i class="material-icons">{{item.icon}}</i>

        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

    <div class="" style="" v-if="this.page == 'CurrentOrder'">
      <CurrentOrder></CurrentOrder>
    </div>
    <div class="" v-if="this.page == 'History'">
      <History></History>
    </div>
    <div class="" v-if="this.page == 'Register'">
      <Register></Register>
    </div>
    <div class="" v-if="this.page == 'Account'">
      <Account></Account>
    </div>
    <div class="" v-if="this.page == 'Food'">
      <Food></Food>
    </div>





  </div>


</template>

<script>
import CurrentOrder from './Table.vue'
import Register from './Register.vue'
import History from './History.vue'
import Account from './Account.vue'
import Food from './Food.vue'
import store from '../store'

export default {
  beforeCreate () {
    if (store.state.auth !== true) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      drawer: null,
      page: 'CurrentOrder',
      items: [
          { title: 'CurrentOrder', icon: 'receipt' },
          { title: 'Register', icon: 'create' },
          { title: 'History', icon: 'import_contacts' },
          { title: 'Account', icon: 'supervisor_account' },
          { title: 'Food', icon: 'local_dining' }

      ]
    }
  },
  methods: {
    refresh (page) {
      console.log(page)
      // this.page = ''
      this.page = 'o'
      this.page = page

      // this.$router.push('/Interface')
    },
    goto (page) {
      console.log(page)
      this.page = page
      this.drawer = false
    }
  },
  components: {
    CurrentOrder,
    Register,
    History,
    Account,
    Food
  }
}
</script>

<style lang="css">

.interface {
 background-image: url('~@/assets/bg.jpg');
 background-size:cover;
 width: 100%;
 top: 0px;


 height: 100vh;
}
</style>
