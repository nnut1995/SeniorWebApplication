import Vue from 'vue'
import store from '../store'
// import Storage from '@google-cloud/storage'
export default {
  uploadFile (bucketName, filename) {
    // [START storage_upload_file]
    // Imports the Google Cloud client library
    // const Storage = require('@google-cloud/storage')
    // Creates a client
    const storage = new Storage()

    // const bucketName = 'Name of a bucket, e.g. my-bucket';
    // const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';
    // Uploads a local file to the bucket
    storage
      .bucket(bucketName)
      .upload(filename)
      .then(() => {
        console.log(`${filename} uploaded to ${bucketName}.`)
      })
      .catch(err => {
        console.error('ERROR:', err)
      })
    // [END storage_upload_file]
  },
  login (user, pass, callback) {
    var loginParams = {
      Username: user,
      Password: pass
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/login', loginParams)
    .then(function (response) {
      console.log('response.data login', response.data)
      // console.log(store.state)
      // store.dispatch('login')
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'falied')
    })
  },
  logout (callback) {
    Vue.$http.post('https://seniorproject-server.appspot.com/login')
    .then(function (response) {
      console.log('response.data', response.data)
      store.dispatch('logout')
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'falied')
    })
  },
  getUserInfo (username, callback) {
    var loginParams = {
      username: username
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/getUserInfo', loginParams)
    .then(function (response) {
      console.log('response.data', response.data)
      callback(response.data)
    })
    .catch(function (response) {
    })
  },
  register (user, pass, type, phone, name, callback) {
    var loginParams = {
      Username: user,
      Password: pass,
      Type: type,
      PhoneNumber: phone,
      Name: name
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/register', loginParams)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (response) {
      callback(response.data)
    })
  },
  getStaff (callback) {
    Vue.$http.get('https://seniorproject-server.appspot.com/allStaff')
    .then(function (response) {
      console.log('response.data', response.data)
      callback(response.data)
    })
    .catch(function (response) {
    })
  },
  getStudent (callback) {
    Vue.$http.get('https://seniorproject-server.appspot.com/allStudent')
    .then(function (response) {
      console.log('response.data', response.data)
      callback(response.data)
    })
    .catch(function (response) {
    })
  },
  getCurrentOrder (callback) {
    Vue.$http.get('https://seniorproject-server.appspot.com/getCurrentOrderAdmin')
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (response) {
    })
  },
  banUser (user, callback) {
    var ban = {
      Username: user
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/banuser', ban)
    .then(function (response) {
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'failed')
    })
  },
  editUser (user, pass, name, phone, type, callback) {
    var params = {
      username: user,
      password: pass,
      type: type,
      phoneNumber: phone,
      name: name
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/editUser', params)
    .then(function (response) {
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'failed')
    })
  },
  postFood (name, price, type, callback) {
    var params = {
      name: name,
      price: price,
      type: type
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/editUser', params)
    .then(function (response) {
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'failed')
    })
  },
  changeOrderStatus (order, type, callback) {
    var params = {
      orderID: order,
      newStatus: type
    }
    Vue.$http.post('https://seniorproject-server.appspot.com/changeOrderStatus', params)
    .then(function (response) {
      callback(response.data, 'success')
    })
    .catch(function (response) {
      callback(response.data, 'failed')
    })
  },
  getHistoryOrder (callback) {
    // console.log('in')
    Vue.$http.get('https://seniorproject-server.appspot.com/getHistoryOrderAdmin')
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (response) {
      callback(response.data)
    })
  }
}
