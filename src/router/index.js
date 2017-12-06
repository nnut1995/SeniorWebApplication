import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Interface from '@/components/Interface'
import Test from '@/components/test'
import Testt from '@/components/testt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Interface',
      name: 'Interface',
      component: Interface
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/testt',
      name: 'testt',
      component: Testt
    }
  ]
})
