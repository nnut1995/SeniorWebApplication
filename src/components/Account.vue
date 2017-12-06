<template lang="html">
  <div class="">

    <div class="" style="height:600px; width:1000px;  margin-left:20%; margin-right:20%; margin-top:30px;">
      <v-card style="wdith:100%;background-color:#2E3B60;" >

        <div style="">
          <v-tabs v-model="active">
            <v-tabs-bar class="" dark>
              <v-tabs-item
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
                ripple
                @click="toggleTable()"
              >
                {{ tab }}

              </v-tabs-item>
              <v-tabs-slider color="yellow"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content
                v-for="tab in tabs"
                :key="tab"
                :id="tab"
              >

              <v-data-table v-if="table == 'Staff'"
                  v-bind:headers="headers"
                  :items="staff"
                  hide-actions
                  class="elevation-1"

                >
                  <template slot="items" slot-scope="props" >
                    <v-dialog v-model="dialog1" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">Staff</v-card-title>
                        <v-card-text>

                          <p>
                             <B>Name :</B>
                             {{props.item.Name}}
                          </p>
                          <p>
                             <B>Username :</B>
                             {{ props.item.Username}}

                          </p>
                          <p>
                            <B>Phone number : </B>
                            {{props.item.PhoneNumber }}<br>

                          </p>

                          <p>
                            <B>STATUS : </B>
                            <!-- {{ props.item.FoodStatus }} -->
                            <v-menu bottom offset-y>
                            <v-btn slot="activator">{{Manage}}</v-btn>
                            <v-list>
                              <v-list-tile v-for="(item, i) in items" :key="i" @click="updateStatus(item);">
                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                              </v-list-tile>
                            </v-list>
                          </v-menu>
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click.native="dialog1 = false">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click.native="dialog1 = false; submit(Manage, props.item.Username, props.item.Name, props.item.PhoneNumber, 'staff');">Submit</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="edit" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">
                          Edit user :   {{ props.item.Username}}
                        </v-card-title>
                        <v-card-text>
                          <p>
                             <v-text-field
                              label="Username"
                              v-model="username"
                              required
                              disabled="disabled"
                            ></v-text-field>
                          </p>
                          <p>
                            <v-text-field
                              label="Password"
                              v-model="password"
                              required
                            ></v-text-field>
                          </p>
                          <p>
                             <v-text-field
                              label="Name"
                              v-model="name"
                              required
                            ></v-text-field>

                          </p>
                          <p>
                            <v-text-field
                              label="PhoneNumber"
                              v-model="phoneNumber"
                              required
                            ></v-text-field>
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click.stop="cancelEdit()">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click.native="edit = false; editUser(username, password, name, phoneNumber, 'staff');">Submit</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <tr>


                    <td >{{ props.item.Username }} </td>
                    <td class="text-xs-center">{{ props.item.Password }}</td>
                    <td class="text-xs-left">{{ props.item.Name }}</td>
                    <td class="text-xs-center">{{ props.item.PhoneNumber }}</td>
                    <!-- <td class="text-xs-center">{{ props.item.Type }}</td> -->
                    <td class="text-xs-center">
                        <v-btn
                        style="width:5%;"
                        color="secondary"
                        @click.stop="dialog1 = true"
                      >
                      Action
                      </v-btn>
                    </td>
                  </tr>

                  </template>

                <!-- <v-btn color="primary" dark @click.native.stop="dialog = true">Open Dialog</v-btn> -->
              </v-data-table>

              <v-data-table v-if="table == 'Student'"
                  v-bind:headers="headers"
                  :items="student"
                  hide-actions
                  class="elevation-1"

                >

                  <template slot="items" slot-scope="props" >
                    <v-dialog v-model="dialog2" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">Student</v-card-title>
                        <v-card-text>

                          <p>
                             <B>Name :</B>
                             {{props.item.Name}}
                          </p>
                          <p>
                             <B>Username :</B>
                             {{ props.item.Username}}

                          </p>
                          <p>
                            <B>Phone number : </B>
                            {{props.item.PhoneNumber }}<br>

                          </p>

                          <p>
                            <B>STATUS : </B>
                            <!-- {{ props.item.FoodStatus }} -->
                            <v-menu bottom offset-y>
                            <v-btn slot="activator">{{Manage}}</v-btn>
                            <v-list>
                              <v-list-tile v-for="(item, i) in items" :key="i" @click="updateStatus(item);">
                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                              </v-list-tile>
                            </v-list>
                          </v-menu>
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click.native="dialog2 = false;">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click.native="dialog2 = false; submit(Manage, props.item.Username, props.item.Name, props.item.PhoneNumber, 'student');">Submit</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="edit2" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">
                          Edit user :   {{ props.item.Username}}
                        </v-card-title>
                        <v-card-text>
                          <p>
                             <v-text-field
                              label="Username"
                              v-model="username"
                              required
                              disabled="disabled"
                            ></v-text-field>
                          </p>
                          <p>
                            <v-text-field
                              label="Password"
                              v-model="password"
                              required
                            ></v-text-field>
                          </p>
                          <p>
                             <v-text-field
                              label="Name"
                              v-model="name"
                              required
                            ></v-text-field>

                          </p>
                          <p>
                            <v-text-field
                              label="PhoneNumber"
                              v-model="phoneNumber"
                              required
                            ></v-text-field>
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click.stop="edit2 = false">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click.native="edit2 = false; editUser(username, password, name, phoneNumber, 'student');">Submit</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <tr>


                    <td >{{ props.item.Username }} </td>
                    <td class="text-xs-center">{{ props.item.Password }}</td>
                    <td class="text-xs-left">{{ props.item.Name }}</td>
                    <td class="text-xs-center">{{ props.item.PhoneNumber }}</td>
                    <!-- <td class="text-xs-center">{{ props.item.Type }}</td> -->
                    <td class="text-xs-center">
                        <v-btn
                        style="width:5%;"
                        color="secondary"
                        @click.stop="dialog2 = true"
                      >
                      Action
                      </v-btn>
                    </td>
                    </tr>

                  </template>

                <!-- <v-btn color="primary" dark @click.native.stop="dialog = true">Open Dialog</v-btn> -->
              </v-data-table>


              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>

        </div>
      </v-card>

  </div>



</div>
</template>

<script>
import Api from '../api/api.js'
export default {
  beforeCreate () {
    // if (this.store.getters.loggedIn) {
    // }
    console.log('beforecreated')
    Api.getStaff(callback => {
      this.staff = callback
    })
    Api.getStudent(students => {
      this.student = students
    })
  },
  data () {
    return {
      username: '',
      password: '',
      phoneNumber: '',
      name: '',
      edit: false,
      edit2: false,
      Manage: 'Manage',
      items: ['Edit', 'Ban'],
      dialog1: false,
      dialog2: false,
      dialo: false,
      table: 'Staff',
      active: null,
      tabs: ['Staff', 'Student'],
      select: 'staff',
      types: [
        'staff',
        'student'
      ],
      type: 'Staff',
      dialog: false,
      headers: [
        {
          text: 'Username',
          align: 'center',
          value: 'name'
        },
        {
          text: 'Password',
          value: 'fat',
          align: 'center'
        },
        {
          text: 'Name',
          value: 'id',
          align: 'left'
        },
        {
          text: 'PhoneNumber',
          value: 'phone',
          align: 'center'
        },
        {
          text: 'Action',
          value: 'date',
          align: 'center'
        }
      ],
      student: [],
      staff: []
    }
  },
  methods: {
    editUser (username, password, name, phoneNumber, type) {
      Api.editUser(username, password, name, phoneNumber, type, callback => {
        console.log(callback[1])
        this.$router.push('/Interface')
      })
    },
    cancelEdit () {
      console.log('cancel')
      this.edit = false
      this.dialog1 = false
    },
    updateStatus (item) {
      this.Manage = item
    },
    submit (item, username, name, phone, type) {
      console.log(username, name, phone)
      this.username = username
      this.name = name
      this.phoneNumber = phone
      if (item === 'Edit') {
        console.log('edit')
        if (type === 'staff') {
          this.dialog1 = false
          this.edit = true
        } else if (type === 'student') {
          this.dialog2 = false
          this.edit2 = true
        }
      } else if (item === 'Ban') {
        if (type === 'staff') {
          this.dialog1 = false
          Api.banUser(username, callback => {
            Api.getStaff(callback => {
              this.staff = callback
            })
          })
        } else if (type === 'student') {
          this.dialog2 = false
          Api.banUser(username, callback => {
            Api.getStudent(students => {
              this.student = students
            })
          })
        }
        // ban api
      }
    },
    getStaff () {
      Api.getStaff(callback => {
        this.student = callback
        console.log(this.student)
      })
    },
    next () {
      console.log('next')
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    toggleTable () {
      if (this.table === 'Staff') {
        this.table = 'Student'
        console.log('toggle', this.table)
      } else {
        this.table = 'Staff'
        console.log('toggle', this.table)
      }
    }
  },
  mounted: function () {
    console.log('mounted')
  },
  created: function () {
    console.log('created')
  }
}
</script>

<style lang="css">
</style>
