<template lang="html">
  <div class="">



  <div class="" style="height:600px; margin-left:20%; margin-right:20%; margin-top:30px;">
    <v-card style=" width:100%;background-color:#2E3B60; color:white; text-align:left;">
      <span style="font-size:25pt; padding-left:20px;"> Current Order</span>

    </v-card>
  <v-data-table
      v-bind:headers="headers"
      :items="current"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" slot-scope="props" >


      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Current Order</v-card-title>
          <v-card-text>

            <p>
               <B>USER ID :</B>  {{props.item.UserID}}
            </p>
            <p>
               <B>MENU :</B> {{ props.item.Order[0].name}}

            </p>
            <p>
              <B>ORDER DATE : </B>{{props.item.OrderID.substring(8, 18) }}<br>

            </p>
            <p>
              <B>ORDER TIME : </B>{{props.item.OrderID.substring(19) }}<br>

            </p>
            <p>
              <B>STATUS : </B>{{ omg }}
              <v-menu bottom offset-y>
              <v-btn slot="activator">{{omg}}</v-btn>
              <v-list>
                <v-list-tile v-for="(item, i) in items" :key="i" @click="updateStatus(item); ">
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click.native="dialog = false; submit(props.item.OrderID, omg);">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" max-width="500px">
       <v-card>
         <v-card-title>
           <h3>Detials</h3>
           <v-spacer></v-spacer>

         </v-card-title>
         <div class="" v-for="(x,i) in menuList.length">
           <b>name : </b>{{menuList[i]}}   <b>Amount :</b> {{amountList[i]}}  <b>price :</b>{{priceList[i]}}

         </div>
         <b> Total :</b> {{total}}
         <v-card-actions>
           <v-btn color="primary" style="margin-left:40%;" flat @click.stop="dialog3=false">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
      <tr @click="display(props)">
        <td >{{ props.item.UserID }} </td>

        <td class="text-xs-center"  > <u>View order</u></td>
        <td class="text-xs-center">{{ props.item.OrderID.substring(8) }}</td>
        <td class="text-xs-center">{{ props.item.UserID }}</td>

        <td class="text-xs-center">
            <v-btn
            style="width:5%;"
            color="secondary"
            @click.stop="dialog = true; edo(props.item.FoodStatus)"

          >
          {{ props.item.FoodStatus }}
          </v-btn>
        </td>
      </tr>

    </template>



  </v-data-table>


  </div>
</div>





</template>

<script>
import Api from '../api/api.js'
export default {
  data () {
    return {
      items: ['Complete', 'Reject', 'Accept'],
      userInfo: null,
      lol: '',
      displayName: '',
      displayAmount: '',
      price: '',
      total: 0,
      test: '',
      menuList: [],
      priceList: [],
      amountList: [],
      dialog3: false,
      // ex11: ['success'],
      dialog: false,
      current: [],
      toggle: false,
      omg: 'change',
      headers: [
        {
          text: 'UserID',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: 'OrderDetail',
          value: 'fat',
          align: 'center'
        },
        {
          text: 'Date',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Phone',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Status',
          value: 'phone',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    edo (gg) {
      this.omg = gg
    },
    submit (order, type) {
      // console.log(order, type)
      Api.changeOrderStatus(order, type, callback => {
        console.log(callback)
        Api.getCurrentOrder(lol => {
          console.log('lol', lol)
          this.current = lol
        })
      })
    },
    rowInfo () {
      console.log('hi')
    },
    display (display) {
      this.menuList = []
      this.priceList = []
      this.amountList = []
      this.total = 0
      // var ll = 0
      // console.log(display.item.Order)
      var temp = display.item.Order
      for (var x = 0; x < temp.length; x++) {
        this.menuList.push(temp[x].name)
        this.priceList.push(temp[x].price)
        this.amountList.push(temp[x].amountTaken)
      }
      for (var y = 0; y < this.amountList.length; y++) {
        // console.log(this.amountList[y] this.priceList[y])
        this.total += (parseInt(this.priceList[y]) * parseInt(this.amountList[y]))
      }
      this.dialog3 = true
    },
    updateStatus (status) {
      console.log('update')
      console.log(status)
      this.omg = status
    },
    refresh () {
      Api.getCurrentOrder(callback => {
        this.current = callback
      })
    }
  },
  beforeCreate () {
    console.log('beforecreated')
    Api.getCurrentOrder(callback => {
      this.current = callback
    })
    // Api.getUserInfo(display.item.UserID, callback => {
    //   this.userInfo = callback
    //   console.log(this.userInfo)
    // })
  }
}
</script>

<style lang="css">
</style>
